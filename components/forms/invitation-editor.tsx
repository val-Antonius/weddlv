'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, Save, Eye, Sparkles, X, ChevronLeft, ChevronRight, Home, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { invitationConfigSchema, type InvitationConfigFormValues } from '@/lib/validations'
import { createInvitation, updateInvitation } from '@/lib/actions/invitation-actions'

import { StepBasicInfo } from './invitation-editor/steps/step-basic-info'
import { StepCoupleInfo } from './invitation-editor/steps/step-couple-info'
import { StepEvents } from './invitation-editor/steps/step-events'
import { StepGallery } from './invitation-editor/steps/step-gallery'
import { StepDesign } from './invitation-editor/steps/step-design'
import { StepSettings } from './invitation-editor/steps/step-settings'
import { TemplatePreview } from './invitation-editor/template-preview'
import type { Invitation } from '@/types/invitation'

interface InvitationEditorProps {
  mode: 'create' | 'edit'
  initialData?: Invitation
}

const STEPS = [
  { id: 'basic', title: 'Basic Info', description: 'Slug and basic settings' },
  { id: 'couple', title: 'Couple Info', description: 'Bride and groom details' },
  { id: 'events', title: 'Events', description: 'Wedding events schedule' },
  { id: 'gallery', title: 'Gallery', description: 'Photos and videos' },
  { id: 'design', title: 'Design', description: 'Choose template' },
  { id: 'settings', title: 'Settings', description: 'Final settings' },
]

export function InvitationEditor({ mode, initialData }: InvitationEditorProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showPreviewPanel, setShowPreviewPanel] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const defaultValues: InvitationConfigFormValues = {
    template: 'simple-modern',
    couple: {
      bride: {
        fullName: '',
        nickname: '',
        parents: '',
        photo: '',
      },
      groom: {
        fullName: '',
        nickname: '',
        parents: '',
        photo: '',
      },
    },
    events: [
      {
        id: '1',
        type: 'akad',
        title: 'Akad Nikah',
        date: '',
        time: '',
        venue: '',
        address: '',
        mapsLink: '',
      },
    ],
    gallery: {
      photos: [],
      videos: [],
    },
    loveStory: {
      title: '',
      content: '',
    },
    music: {
      url: '',
      autoplay: false,
    },
    gift: {
      enabled: false,
      accounts: [],
    },
    settings: {
      showProtocolPopup: false,
      enableGuestbook: true,
      language: 'en',
    },
  }

  const form = useForm<InvitationConfigFormValues>({
    resolver: zodResolver(invitationConfigSchema) as any,
    defaultValues: (initialData?.config_json as InvitationConfigFormValues) || defaultValues,
  })

  const [slug, setSlug] = useState(
    initialData?.slug || ''
  )

  const currentStepData = STEPS[currentStep]

  const handleNext = useCallback(async () => {
    let isStepValid = false

    switch (currentStep) {
      case 0:
        isStepValid = slug.length >= 3
        break
      case 1:
        isStepValid = await form.trigger(['couple.bride', 'couple.groom'], { shouldFocus: true })
        break
      case 2:
        isStepValid = await form.trigger(['events'], { shouldFocus: true })
        break
      case 3:
        isStepValid = await form.trigger(['gallery'], { shouldFocus: true })
        break
      case 4:
        isStepValid = await form.trigger(['template'], { shouldFocus: true })
        break
      case 5:
        isStepValid = await form.trigger(['settings'], { shouldFocus: true })
        break
      default:
        isStepValid = false
    }

    if (isStepValid) {
      if (currentStep === STEPS.length - 1) {
        await handleSave()
      } else {
        setCurrentStep(prev => prev + 1)
      }
    }
  }, [currentStep, form, slug])

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }, [])

  const handleCancel = useCallback(() => {
    router.push('/admin/dashboard')
  }, [router])

  const handleSave = useCallback(async () => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      const config = form.getValues()
      const finalSlug = slug || `${config.couple.bride.nickname}-${config.couple.groom.nickname}`.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'wedding'
      
      const invitationData = {
        slug: finalSlug,
        config_json: config,
        is_published: false,
      }

      if (mode === 'create') {
        const result = await createInvitation(invitationData)
        if (result.success) {
          router.push('/admin/dashboard')
        } else {
          setError(result.error || 'Failed to create invitation')
          console.error('Failed to create invitation:', result.error)
        }
      } else if (initialData) {
        const result = await updateInvitation(initialData.id, invitationData)
        if (result.success) {
          router.push('/admin/dashboard')
        } else {
          setError(result.error || 'Failed to update invitation')
          console.error('Failed to update invitation:', result.error)
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setError(errorMessage)
      console.error('Error saving invitation:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [form, slug, mode, initialData, router])

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StepBasicInfo slug={slug} onSlugChange={setSlug} />
      case 1:
        return <StepCoupleInfo form={form as any} />
      case 2:
        return <StepEvents form={form as any} />
      case 3:
        return <StepGallery form={form as any} />
      case 4:
        return <StepDesign form={form as any} />
      case 5:
        return <StepSettings form={form as any} />
      default:
        return null
    }
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <div className="space-y-6">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Create New Invitation' : 'Edit Invitation'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreviewPanel(!showPreviewPanel)}
            className="hidden lg:flex items-center gap-2"
          >
            {showPreviewPanel ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {showPreviewPanel ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 border shadow-sm">
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-700">Step {currentStep + 1} of {STEPS.length}</span>
            <span className="text-blue-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="bg-white rounded-lg p-4 border shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {STEPS.map((step, index) => (
            <Button
              key={step.id}
              variant={index === currentStep ? 'default' : index < currentStep ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setCurrentStep(index)}
              className={`h-auto p-3 transition-all duration-200 ${
                index === currentStep
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                  : index < currentStep
                  ? 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className="font-medium text-xs sm:text-sm">{step.title}</div>
                <div className="text-xs opacity-70 hidden sm:block">{step.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className={`grid gap-6 ${showPreviewPanel ? 'grid-cols-1 xl:grid-cols-3' : 'grid-cols-1'}`}>
        {/* Form Content */}
        <div className={showPreviewPanel ? 'xl:col-span-2' : 'col-span-1'}>
          <Card className="bg-white border shadow-lg">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    {currentStepData.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {currentStepData.description}
                  </p>
                </div>
                <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50 w-fit">
                  {currentStep + 1}/{STEPS.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800 mb-1">Error saving invitation</h4>
                    <p className="text-sm text-red-700">{error}</p>
                    {error.includes('too large') && (
                      <p className="text-xs text-red-600 mt-2">
                        Tip: Try reducing image file sizes or removing some photos from the gallery.
                      </p>
                    )}
                  </div>
                </div>
              )}
              <form onSubmit={(e) => e.preventDefault()}>
                {renderStepContent()}
              </form>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 p-4 bg-white rounded-lg border shadow-sm">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="disabled:opacity-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPreview(true)}
                className="border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-blue-700"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>

              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  'Saving...'
                ) : currentStep === STEPS.length - 1 ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Invitation
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreviewPanel && (
          <div className="xl:col-span-1">
            <Card className="sticky top-6 bg-white border shadow-lg">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Eye className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreviewPanel(false)}
                    className="lg:hidden"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="bg-gray-50 rounded-lg p-2 border">
                  <TemplatePreview
                    config={form.getValues()}
                    slug={slug || 'preview'}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Full Preview Modal */}
      {showPreview && (
        <TemplatePreview
          config={form.getValues()}
          slug={slug || 'preview'}
          isModal
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  )
}
