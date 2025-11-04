'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { rsvpSchema, type RSVPFormValues } from '@/lib/validations'

interface RSVPFormProps {
  invitationId: string
  invitationTitle?: string
  onSuccess?: () => void
}

export function RSVPForm({ invitationId, invitationTitle, onSuccess }: RSVPFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<any>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      invitation_id: invitationId,
      attendance: true,
      guest_count: 1,
    },
  })

  const attendance = watch('attendance')

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit RSVP')
      }

      setSuccess('RSVP submitted successfully! Thank you for responding.')
      
      // Reset form after successful submission
      setTimeout(() => {
        onSuccess?.()
      }, 2000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>RSVP Form</CardTitle>
        <CardDescription>
          {invitationTitle ? `RSVP for ${invitationTitle}` : 'Please let us know if you can attend'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">{success}</div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                {...register('name')}
                disabled={isLoading}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                disabled={isLoading}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message as string}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number (optional)"
              {...register('phone')}
              disabled={isLoading}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message as string}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Will you attend? *</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="attendance"
                checked={attendance}
                onCheckedChange={(checked) => setValue('attendance', checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="attendance" className="text-sm font-normal">
                Yes, I will attend the wedding
              </Label>
            </div>
            {errors.attendance && (
              <p className="text-sm text-red-600">{errors.attendance.message as string}</p>
            )}
          </div>

          {attendance && (
            <div className="space-y-2">
              <Label htmlFor="guest_count">Number of Guests *</Label>
              <Input
                id="guest_count"
                type="number"
                min="1"
                max="10"
                placeholder="Number of guests including yourself"
                {...register('guest_count', { valueAsNumber: true })}
                disabled={isLoading}
                className={errors.guest_count ? 'border-red-500' : ''}
              />
              {errors.guest_count && (
                <p className="text-sm text-red-600">{errors.guest_count.message as string}</p>
              )}
              <p className="text-sm text-gray-600">
                Please include yourself in the count (maximum 10 guests)
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Leave a message for the couple (max 500 characters)"
              rows={4}
              {...register('message')}
              disabled={isLoading}
              className={errors.message ? 'border-red-500' : ''}
            />
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message.message as string}</p>
            )}
            <p className="text-sm text-gray-600">
              {watch('message')?.length || 0}/500 characters
            </p>
          </div>

          <input type="hidden" {...register('invitation_id')} />

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit RSVP'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
