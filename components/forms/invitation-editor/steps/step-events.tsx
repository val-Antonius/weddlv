'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, MapPin, Calendar, Clock, ExternalLink } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'
import type { InvitationConfigFormValues, EventType } from '@/lib/validations'

interface StepEventsProps {
  form: ReturnType<typeof useFormContext<InvitationConfigFormValues>>
}

const EVENT_TYPES: { value: EventType; label: string; icon: string }[] = [
  { value: 'akad', label: 'Akad Nikah', icon: '🕌' },
  { value: 'reception', label: 'Resepsi', icon: '🎉' },
  { value: 'other', label: 'Other Event', icon: '📅' },
]

export function StepEvents({ form }: StepEventsProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'events'
  })

  const addEvent = () => {
    const newEvent = {
      id: Date.now().toString(),
      type: 'other' as EventType,
      title: '',
      date: '',
      time: '',
      venue: '',
      address: '',
      mapsLink: '',
    }
    append(newEvent)
  }

  const updateEventField = (index: number, field: string, value: string) => {
    setValue(`events.${index}.${field}` as any, value)
  }

  const removeEvent = (index: number) => {
    remove(index)
  }

  const EventCard = ({ field, index }: { field: any; index: number }) => {
    const eventType = watch(`events.${index}.type`)
    const eventTypeInfo = EVENT_TYPES.find(t => t.value === eventType)

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {eventTypeInfo?.icon}
              <span>Event {index + 1}</span>
              <Badge variant="outline">{eventTypeInfo?.label || eventType}</Badge>
            </CardTitle>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeEvent(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Type */}
            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select
                value={eventType}
                onValueChange={(value) => updateEventField(index, 'type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Event Title */}
            <div className="space-y-2">
              <Label>Event Title</Label>
              <Input
                placeholder="Enter event title"
                value={field.title || ''}
                onChange={(e) => updateEventField(index, 'title', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-2">
              <Label>Date *</Label>
              <Input
                type="date"
                value={field.date || ''}
                onChange={(e) => updateEventField(index, 'date', e.target.value)}
              />
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label>Time *</Label>
              <Input
                type="time"
                value={field.time || ''}
                onChange={(e) => updateEventField(index, 'time', e.target.value)}
              />
            </div>
          </div>

          {/* Venue */}
          <div className="space-y-2">
            <Label>Venue *</Label>
            <Input
              placeholder="Enter venue name"
              value={field.venue || ''}
              onChange={(e) => updateEventField(index, 'venue', e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label>Address *</Label>
            <Textarea
              placeholder="Enter full address"
              rows={2}
              value={field.address || ''}
              onChange={(e) => updateEventField(index, 'address', e.target.value)}
            />
          </div>

          {/* Maps Link */}
          <div className="space-y-2">
            <Label>Google Maps Link</Label>
            <div className="flex gap-2">
              <Input
                placeholder="https://maps.google.com/..."
                value={field.mapsLink || ''}
                onChange={(e) => updateEventField(index, 'mapsLink', e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const venue = field.venue
                  const address = field.address
                  if (venue || address) {
                    const query = encodeURIComponent(`${venue}, ${address}`)
                    const mapsUrl = `https://maps.google.com/?q=${query}`
                    updateEventField(index, 'mapsLink', mapsUrl)
                  }
                }}
              >
                Auto-generate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Wedding Events</h3>
          <p className="text-muted-foreground">
            Add all your wedding events and venues
          </p>
        </div>
        <Button onClick={addEvent} type="button">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <EventCard key={field.id} field={field} index={index} />
        ))}
      </div>

      {fields.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Events Yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first wedding event to get started
            </p>
            <Button onClick={addEvent} type="button">
              <Plus className="h-4 w-4 mr-2" />
              Add First Event
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Event Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Include all important wedding events (akad, reception, etc.)</p>
            <p>• Provide accurate dates and times</p>
            <p>• Add detailed venue information for guests</p>
            <p>• Include Google Maps links for easy navigation</p>
            <p>• Double-check all information before publishing</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
