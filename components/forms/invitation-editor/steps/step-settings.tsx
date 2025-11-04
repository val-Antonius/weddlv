'use client'

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Settings, MessageSquare, Globe, Shield } from 'lucide-react'
import type { InvitationConfigFormValues } from '@/lib/validations'

interface StepSettingsProps {
  form: ReturnType<typeof useFormContext<InvitationConfigFormValues>>
}

const LANGUAGES = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
]

export function StepSettings({ form }: StepSettingsProps) {
  const {
    watch,
    setValue,
    formState: { errors }
  } = form

  const showProtocolPopup = watch('settings.showProtocolPopup')
  const enableGuestbook = watch('settings.enableGuestbook')
  const language = watch('settings.language')

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setValue(`settings.${field}` as any, checked)
  }

  const handleLanguageChange = (value: string) => {
    setValue('settings.language', value as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Final Settings</h3>
        <p className="text-muted-foreground">
          Configure additional options for your invitation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Protocol Popup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Health Protocol
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="showProtocolPopup"
                checked={showProtocolPopup}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('showProtocolPopup', checked as boolean)
                }
              />
              <div className="space-y-1">
                <label htmlFor="showProtocolPopup" className="text-sm font-medium cursor-pointer">
                  Show Health Protocol Popup
                </label>
                <p className="text-sm text-muted-foreground">
                  Display a popup with COVID-19 health and safety guidelines for guests
                </p>
              </div>
            </div>
            
            {showProtocolPopup && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-2">Protocol Information</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Temperature checks at venue entrance</li>
                  <li>• Hand sanitizer stations available</li>
                  <li>• Masks recommended for elderly guests</li>
                  <li>• Social distancing guidelines in place</li>
                  <li>• Contact tracing information available</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Guestbook */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Guestbook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="enableGuestbook"
                checked={enableGuestbook}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('enableGuestbook', checked as boolean)
                }
              />
              <div className="space-y-1">
                <label htmlFor="enableGuestbook" className="text-sm font-medium cursor-pointer">
                  Enable Guestbook
                </label>
                <p className="text-sm text-muted-foreground">
                  Allow guests to leave messages and well wishes for the couple
                </p>
              </div>
            </div>
            
            {enableGuestbook && (
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Guestbook Features</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Guests can write messages up to 500 characters</li>
                    <li>• Messages are displayed publicly on invitation</li>
                    <li>• Option to moderate messages before publishing</li>
                    <li>• Export messages as memento</li>
                    <li>• Timestamp for each message</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Language</label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Choose the primary language for your invitation interface
            </p>
          </div>

          {/* Language Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {LANGUAGES.map((lang) => (
              <div 
                key={lang.value}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  language === lang.value 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleLanguageChange(lang.value)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium text-sm">{lang.label}</span>
                  {language === lang.value && (
                    <Badge variant="default" className="text-xs">Selected</Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {lang.value === 'en' 
                    ? 'All interface elements will be in English' 
                    : 'Semua elemen antarmuka akan dalam Bahasa Indonesia'
                  }
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-3 rounded-lg border ${
              showProtocolPopup ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4" />
                <span className="font-medium text-sm">Health Protocol</span>
              </div>
              <p className="text-xs">
                {showProtocolPopup ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            
            <div className={`p-3 rounded-lg border ${
              enableGuestbook ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="h-4 w-4" />
                <span className="font-medium text-sm">Guestbook</span>
              </div>
              <p className="text-xs">
                {enableGuestbook ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            
            <div className={`p-3 rounded-lg border ${
              language ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <Globe className="h-4 w-4" />
                <span className="font-medium text-sm">Language</span>
              </div>
              <p className="text-xs">
                {LANGUAGES.find(l => l.value === language)?.label || 'Not set'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Settings Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <h4 className="font-medium">Health Protocol</h4>
              <p>Show health guidelines if your venue has specific requirements or if you want to ensure guest safety during your event.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Guestbook Benefits</h4>
              <p>Guestbooks create wonderful memories and allow guests who can't attend to participate virtually.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Language Choice</h4>
              <p>Choose the language that most of your guests will be comfortable with for the best experience.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Future Updates</h4>
              <p>You can always change these settings later, even after publishing your invitation.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
