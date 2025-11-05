'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Shield, User, Users, Thermometer } from 'lucide-react'

export function HealthProtocolPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)

  useEffect(() => {
    // Check if popup has been shown in this session
    const sessionKey = 'health-protocol-shown'
    const hasShown = sessionStorage.getItem(sessionKey)
    
    if (!hasShown) {
      // Show popup after a short delay to allow page to load
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasBeenShown(true)
        sessionStorage.setItem(sessionKey, 'true')
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleDontShowAgain = () => {
    sessionStorage.setItem('health-protocol-shown', 'true')
    setIsOpen(false)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <CardTitle className="text-center text-lg font-semibold">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Health & Safety Guidelines
            </div>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute right-4 top-4 h-8 w-8 rounded-full p-0"
            aria-label="Close popup"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-600 mb-4">
            Your health and safety are important to us. Please follow these guidelines:
          </div>

          {/* Protocol Items */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <User className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm text-green-900">Face Masks</h4>
                <p className="text-xs text-green-700 mt-1">
                  Please wear a mask when indoors and maintain physical distancing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm text-blue-900">Physical Distancing</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Maintain at least 1 meter distance from other guests.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <Thermometer className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm text-yellow-900">Health Check</h4>
                <p className="text-xs text-yellow-700 mt-1">
                  Please ensure you're in good health before attending.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Guidelines */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm text-gray-900 mb-2">Additional Reminders:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Wash hands frequently with soap and water</li>
              <li>• Use hand sanitizer provided at the venue</li>
              <li>• Avoid physical contact like handshakes and hugs</li>
              <li>• Stay home if you feel unwell or have symptoms</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="text-center text-sm text-gray-600 mt-4">
            <p className="font-medium">
              Thank you for your understanding and cooperation!
            </p>
            <p className="text-xs mt-1">
              We can't wait to celebrate with you safely. 🎉
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-6">
            <Button
              variant="outline"
              onClick={handleDontShowAgain}
              className="flex-1 text-xs"
              size="sm"
            >
              Don't show again
            </Button>
            <Button
              onClick={handleClose}
              className="flex-1 text-xs"
              size="sm"
            >
              I understand
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
