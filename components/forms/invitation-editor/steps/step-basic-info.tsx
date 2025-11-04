'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
// Simple client-side slug validation
function validateSlug(slug: string): { isValid: boolean; error?: string } {
  if (slug.length < 3) {
    return { isValid: false, error: 'Slug must be at least 3 characters' }
  }
  
  if (slug.length > 50) {
    return { isValid: false, error: 'Slug must be 50 characters or less' }
  }
  
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { isValid: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' }
  }
  
  return { isValid: true }
}
import { cn } from '@/lib/utils'

interface StepBasicInfoProps {
  slug: string
  onSlugChange: (slug: string) => void
}

export function StepBasicInfo({ slug, onSlugChange }: StepBasicInfoProps) {
  const [customSlug, setCustomSlug] = useState(slug)
  const [slugValidation, setSlugValidation] = useState<{
    isValid: boolean
    error?: string
    isChecking: boolean
  }>({
    isValid: false,
    isChecking: false,
  })

  useEffect(() => {
    setCustomSlug(slug)
  }, [slug])

  const handleSlugChange = (value: string) => {
    setCustomSlug(value)
    onSlugChange(value)
    
    // Debounce validation
    const timeoutId = setTimeout(() => {
      validateSlugField(value)
    }, 500)

    return () => clearTimeout(timeoutId)
  }

  const validateSlugField = async (value: string) => {
    if (!value) {
      setSlugValidation({ isValid: false, error: 'Slug is required', isChecking: false })
      return
    }

    setSlugValidation(prev => ({ ...prev, isChecking: true }))

    // Client-side validation
    const clientValidation = validateSlug(value)
    if (!clientValidation.isValid) {
      setSlugValidation({
        isValid: false,
        error: clientValidation.error,
        isChecking: false,
      })
      return
    }

    // Server-side validation (check availability)
    try {
      const response = await fetch(`/api/invitations/check-slug?slug=${encodeURIComponent(value)}`)
      const data = await response.json()
      
      setSlugValidation({
        isValid: data.available,
        error: data.available ? undefined : 'This slug is already taken',
        isChecking: false,
      })
    } catch (error) {
      setSlugValidation({
        isValid: false,
        error: 'Failed to check slug availability',
        isChecking: false,
      })
    }
  }

  const generateRandomSlug = () => {
    const random = Math.random().toString(36).substring(2, 8)
    const newSlug = `wedding-${random}`
    handleSlugChange(newSlug)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="slug">Invitation URL Slug</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-sm text-muted-foreground">weddlv.com/</span>
              </div>
              <Input
                id="slug"
                placeholder="your-wedding-slug"
                value={customSlug}
                onChange={(e) => handleSlugChange(e.target.value)}
                className={cn(
                  "pl-24",
                  slugValidation.isValid && "border-green-500",
                  !slugValidation.isValid && customSlug && "border-red-500"
                )}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={generateRandomSlug}
              disabled={slugValidation.isChecking}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Validation Status */}
          {customSlug && (
            <div className="flex items-center gap-2 text-sm">
              {slugValidation.isChecking ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  <span className="text-muted-foreground">Checking availability...</span>
                </>
              ) : slugValidation.isValid ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">Slug is available!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-600">{slugValidation.error}</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label>Slug Requirements</Label>
          <Card>
            <CardContent className="pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">3-50</Badge>
                  <span>Characters long</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">a-z 0-9 -</Badge>
                  <span>Only lowercase letters, numbers, and hyphens</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Unique</Badge>
                  <span>Must be unique across all invitations</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <Label>Tips for Choosing a Slug</Label>
          <Card>
            <CardContent className="pt-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Use couple names: <code className="bg-muted px-1 rounded">john-jane</code></p>
                <p>• Add wedding year: <code className="bg-muted px-1 rounded">john-jane-2024</code></p>
                <p>• Keep it memorable and easy to share</p>
                <p>• Avoid special characters or spaces</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview URL */}
        {customSlug && slugValidation.isValid && (
          <div className="space-y-2">
            <Label>Your Invitation URL</Label>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono bg-muted px-3 py-1 rounded">
                    weddlv.com/{customSlug}
                  </span>
                  <Badge variant="secondary">Ready</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
