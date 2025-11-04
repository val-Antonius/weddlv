'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Eye } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import type { InvitationConfigFormValues } from '@/lib/validations'

interface GallerySectionProps {
  config: InvitationConfigFormValues
  className?: string
}

export function GallerySection({ config, className }: GallerySectionProps) {
  const { template, gallery } = config
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const getTemplateStyles = () => {
    switch (template) {
      case 'classic-elegant':
        return {
          container: 'bg-gradient-to-br from-amber-50 to-amber-100',
          title: 'text-amber-900 font-serif text-3xl md:text-4xl',
          photoContainer: 'border-amber-200 hover:border-amber-400',
          badge: 'bg-amber-200 text-amber-800'
        }
      case 'romantic-feminine':
        return {
          container: 'bg-gradient-to-br from-pink-50 to-rose-100',
          title: 'text-pink-900 font-cursive text-3xl md:text-4xl',
          photoContainer: 'border-pink-200 hover:border-pink-400',
          badge: 'bg-pink-200 text-pink-800'
        }
      default: // simple-modern
        return {
          container: 'bg-gradient-to-br from-gray-50 to-gray-100',
          title: 'text-gray-900 font-sans text-3xl md:text-4xl font-bold',
          photoContainer: 'border-gray-200 hover:border-gray-400',
          badge: 'bg-gray-200 text-gray-800'
        }
    }
  }

  const styles = getTemplateStyles()
  const { photos, videos } = gallery || { photos: [], videos: [] }

  if (photos.length === 0 && videos.length === 0) {
    return null
  }

  const openPhotoModal = (photo: string) => {
    setSelectedPhoto(photo)
  }

  const closePhotoModal = () => {
    setSelectedPhoto(null)
  }

  return (
    <section className={`py-16 px-8 ${className}`}>
      <div className={`${styles.container} max-w-6xl mx-auto`}>
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className={styles.title}>
            Photo Gallery
          </h2>
          <p className="text-gray-600 mt-2">
            Our beautiful moments together
          </p>
        </div>

        {/* Photos Grid */}
        {photos.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.slice(0, 12).map((photo, index) => (
                <div
                  key={index}
                  className={`relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-all hover:scale-105 ${styles.photoContainer}`}
                  onClick={() => openPhotoModal(photo)}
                >
                  <Image
                    src={photo}
                    alt={`Wedding photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Eye className="h-6 w-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
            
            {photos.length > 12 && (
              <div className="text-center mt-8">
                <Badge className={styles.badge}>
                  +{photos.length - 12} more photos
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Videos Section */}
        {videos.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              Wedding Videos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <div key={index} className="bg-white/90 rounded-lg border-2 border-gray-200 overflow-hidden">
                  <div className="relative aspect-video bg-gray-100">
                    {/* Video thumbnail placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Play className="h-12 w-12 text-gray-500" />
                    </div>
                    
                    {/* Play button overlay */}
                    <Button
                      size="lg"
                      asChild
                      className="absolute inset-0 w-full h-full bg-black/50 hover:bg-black/70"
                    >
                      <a
                        href={video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full h-full"
                      >
                        <Play className="h-8 w-8 text-white" />
                      </a>
                    </Button>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 font-medium">
                      Video {index + 1}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Click to watch on external site
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={closePhotoModal}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <Image
                src={selectedPhoto}
                alt="Enlarged wedding photo"
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                priority
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                onClick={closePhotoModal}
              >
                ×
              </Button>
            </div>
          </div>
        )}

        {/* Gallery Footer */}
        <div className="text-center mt-16">
          <p className="text-sm text-gray-600">
            Thank you for being part of our special day
          </p>
        </div>
      </div>
    </section>
  )
}
