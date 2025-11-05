'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, Save, Eye, Sparkles } from 'lucide-react'
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

  const handleSave = useCallback(async () => {
    setIsSubmitting(true)
    
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
          router.push('/admin/invitations')
        } else {
          console.error('Failed to create invitation:', result.error)
        }
      } else if (initialData) {
        const result = await updateInvitation(initialData.id, invitationData)
        if (result.success) {
          router.push('/admin/invitations')
        } else {
          console.error('Failed to update invitation:', result.error)
        }
      }
    } catch (error) {
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
      {/* Progress Bar */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-rose-100">
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-rose-700">Step {currentStep + 1} of {STEPS.length}</span>
            <span className="text-pink-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3 bg-rose-100" />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {STEPS.map((step, index) => (
          <Button
            key={step.id}
            variant={index <= currentStep ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentStep(index)}
            className={`h-auto p-3 transition-all duration-200 ${
              index <= currentStep 
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg' 
                : 'border-rose-200 hover:border-rose-300 hover:bg-rose-50'
            }`}
          >
            <div className="text-center">
              <div className="font-medium text-xs sm:text-sm">{step.title}</div>
              <div className="text-xs opacity-70 hidden sm:block">{step.description}</div>
            </div>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Form Content */}
        <div className="xl:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-rose-100 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-rose-800">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    {currentStepData.title}
                  </CardTitle>
                  <p className="text-sm text-rose-600 mt-1">
                    {currentStepData.description}
                  </p>
                </div>
                <Badge variant="outline" className="border-rose-300 text-rose-700 bg-rose-50 w-fit">
                  {currentStep + 1}/{STEPS.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={(e) => e.preventDefault()}>
                {renderStepContent()}
              </form>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-rose-100">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-rose-200 hover:border-rose-300 hover:bg-rose-50 disabled:opacity-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPreview(true)}
                className="border-amber-200 hover:border-amber-300 hover:bg-amber-50 text-amber-700"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>

              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg disabled:opacity-50"
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
        <div className="xl:col-span-1">
          <Card className="sticky top-6 bg-white/80 backdrop-blur-sm border-rose-100 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-2 border border-rose-100">
                <TemplatePreview
                  config={form.getValues()}
                  slug={slug || 'preview'}
                />
              </div>
            </CardContent>
          </Card>
        </div>
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
