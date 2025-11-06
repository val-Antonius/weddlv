'use client'

import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, X, Image as ImageIcon, Video, Plus, Trash2 } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'
import type { InvitationConfigFormValues } from '@/lib/validations'

interface StepGalleryProps {
  form: any
}

export function StepGallery({ form }: StepGalleryProps) {
  const {
    control,
    watch,
    setValue,
    formState: { errors }
  } = form

  const { fields: photoFields, append: appendPhoto, remove: removePhoto } = useFieldArray({
    control,
    name: 'gallery.photos'
  })

  const { fields: videoFields, append: appendVideo, remove: removeVideo } = useFieldArray({
    control,
    name: 'gallery.videos'
  })

  const handlePhotoUpload = async (files: FileList) => {
    // Create object URLs for preview (much smaller than base64)
    const newPhotos = Array.from(files).map(file => {
      // Create a temporary object URL for preview
      const objectUrl = URL.createObjectURL(file)
      
      // In a real implementation, you would upload to Supabase Storage here
      // and return the storage URL instead of the object URL
      
      // For now, we'll use a placeholder URL to prevent large base64 data
      return `https://placeholder.example.com/photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`
    })

    newPhotos.forEach(url => appendPhoto(url))
  }

  const handleVideoAdd = () => {
    appendVideo('')
  }

  const removePhotoItem = (index: number) => {
    removePhoto(index)
  }

  const removeVideoItem = (index: number) => {
    removeVideo(index)
  }

  const updateVideoUrl = (index: number, url: string) => {
    setValue(`gallery.videos.${index}`, url)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Photo Gallery</h3>
          <p className="text-muted-foreground mb-2">
            Add your beautiful wedding photos for guests to enjoy
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Demo Mode:</strong> Photo uploads are currently simulated with placeholders. 
              In production, photos would be uploaded to secure cloud storage.
            </p>
          </div>
        </div>

        {/* Photo Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Photos ({photoFields.length}/20)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Upload Button */}
            <div className="mb-4">
              <input
                type="file"
                id="photo-upload"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handlePhotoUpload(e.target.files)
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('photo-upload')?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </div>

            {/* Photo Grid */}
            {photoFields.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photoFields.map((field, index) => {
                  const photoSrc = typeof field === 'string' ? field : ''
                  
                  // Only render if we have a valid photo source
                  if (!photoSrc) return null
                  
                  return (
                    <div key={field.id} className="relative group">
                      <div className="w-full h-32 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="w-8 h-8 text-rose-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Photo {index + 1}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removePhotoItem(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {photoFields.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No photos uploaded yet. Click above to add photos.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Video Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Videos ({videoFields.length}/5)
              </CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleVideoAdd}
                disabled={videoFields.length >= 5}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Video
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {videoFields.length > 0 ? (
              <div className="space-y-3">
                {videoFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Video className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                    <input
                      type="url"
                      placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                      value={typeof field === 'string' ? field : ''}
                      onChange={(e) => updateVideoUrl(index, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeVideoItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  No videos added yet. Add wedding videos to enhance your invitation.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleVideoAdd}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Video
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Media Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Photos</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maximum 20 photos</li>
                <li>• JPG, PNG, or WebP formats</li>
                <li>• Maximum 2MB per photo</li>
                <li>• Recommended 16:9 aspect ratio</li>
                <li>• Photos are stored as placeholders in demo mode</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Videos</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maximum 5 videos</li>
                <li>• YouTube, Vimeo, or direct video links</li>
                <li>• Make sure videos are publicly accessible</li>
                <li>• Recommended length: 1-5 minutes</li>
                <li>• Test links before publishing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
