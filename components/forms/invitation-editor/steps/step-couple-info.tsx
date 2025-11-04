'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, X, User } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'
import type { InvitationConfigFormValues } from '@/lib/validations'

interface StepCoupleInfoProps {
  form: ReturnType<typeof useFormContext<InvitationConfigFormValues>>
}

export function StepCoupleInfo({ form }: StepCoupleInfoProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = form

  const bridePhoto = watch('couple.bride.photo')
  const groomPhoto = watch('couple.groom.photo')

  const handlePhotoUpload = async (person: 'bride' | 'groom', file: File) => {
    // For now, just create a preview URL
    // In a real implementation, this would upload to Supabase Storage
    const reader = new FileReader()
    reader.onloadend = () => {
      setValue(`couple.${person}.photo`, reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = (person: 'bride' | 'groom') => {
    setValue(`couple.${person}.photo`, '')
  }

  const CoupleInfoCard = ({ 
    title, 
    person, 
    icon 
  }: { 
    title: string
    person: 'bride' | 'groom'
    icon: React.ReactNode 
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Photo Upload */}
        <div className="space-y-2">
          <Label>Photo</Label>
          <div className="flex items-center gap-4">
            {watch(`couple.${person}.photo`) ? (
              <div className="relative">
                <img
                  src={watch(`couple.${person}.photo`)}
                  alt={`${title} photo`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0"
                  onClick={() => removePhoto(person)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="w-24 h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                <User className="h-8 w-8 text-muted-foreground/50" />
              </div>
            )}
            
            <div className="flex-1">
              <input
                type="file"
                id={`${person}-photo`}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handlePhotoUpload(person, file)
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById(`${person}-photo`)?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor={`${person}-fullName`}>Full Name *</Label>
          <Input
            id={`${person}-fullName`}
            placeholder={`Enter ${title.toLowerCase()}'s full name`}
            {...register(`couple.${person}.fullName`, { required: true })}
          />
          {errors.couple?.[person]?.fullName && (
            <p className="text-sm text-destructive">
              Full name is required
            </p>
          )}
        </div>

        {/* Nickname */}
        <div className="space-y-2">
          <Label htmlFor={`${person}-nickname`}>Nickname</Label>
          <Input
            id={`${person}-nickname`}
            placeholder={`Enter ${title.toLowerCase()}'s nickname`}
            {...register(`couple.${person}.nickname`)}
          />
        </div>

        {/* Parents */}
        <div className="space-y-2">
          <Label htmlFor={`${person}-parents`}>Parents *</Label>
          <Textarea
            id={`${person}-parents`}
            placeholder={`Enter ${title.toLowerCase()}'s parents' names`}
            rows={2}
            {...register(`couple.${person}.parents`, { required: true })}
          />
          {errors.couple?.[person]?.parents && (
            <p className="text-sm text-destructive">
              Parents' names are required
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Couple Information</h3>
        <p className="text-muted-foreground">
          Tell us about the happy couple
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CoupleInfoCard
          title="Bride"
          person="bride"
          icon={<Badge variant="secondary">👰</Badge>}
        />
        
        <CoupleInfoCard
          title="Groom"
          person="groom"
          icon={<Badge variant="secondary">🤵</Badge>}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Photo Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Use high-quality photos (at least 800x800 pixels)</p>
            <p>• JPG, PNG, or WebP formats accepted</p>
            <p>• Maximum file size: 5MB</p>
            <p>• Clear, well-lit photos work best</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
