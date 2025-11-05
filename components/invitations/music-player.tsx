'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'

interface Music {
  url: string
  autoplay: boolean
}

interface MusicPlayerProps {
  music: Music
}

export function MusicPlayer({ music }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set initial volume
    audio.volume = isMuted ? 0 : volume

    // Handle audio events
    const handleLoadStart = () => {
      setIsLoaded(false)
      setError(null)
    }

    const handleCanPlay = () => {
      setIsLoaded(true)
      // Autoplay only if enabled and user has interacted
      if (music.autoplay && hasInteracted) {
        audio.play().catch(err => {
          console.log('Autoplay failed:', err)
          // Autoplay was blocked, wait for user interaction
        })
      }
    }

    const handleError = () => {
      setError('Failed to load music')
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      // Loop the music
      if (audio) {
        audio.currentTime = 0
        audio.play().catch(err => {
          console.log('Loop failed:', err)
        })
      }
    }

    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [music.autoplay, volume, isMuted, hasInteracted])

  useEffect(() => {
    const handleUserInteraction = () => {
      setHasInteracted(true)
      // Try to autoplay after first interaction
      if (music.autoplay && audioRef.current && !isPlaying && isLoaded) {
        audioRef.current.play().catch(err => {
          console.log('Autoplay after interaction failed:', err)
        })
      }
    }

    // Listen for first user interaction
    document.addEventListener('click', handleUserInteraction, { once: true })
    document.addEventListener('touchstart', handleUserInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [music.autoplay, isPlaying, isLoaded])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || !isLoaded) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch(err => {
        console.error('Play failed:', err)
        setError('Failed to play music')
      })
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current
    if (!audio) return

    setVolume(newVolume)
    if (!isMuted) {
      audio.volume = newVolume
    }
  }

  // Don't render if there's an error
  if (error) {
    return null
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={music.url}
        loop
        preload="auto"
        className="hidden"
      />
      
      {/* Floating Music Controls */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-full shadow-lg p-3 border border-gray-200">
          <div className="flex items-center space-x-3">
            {/* Play/Pause Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              disabled={!isLoaded}
              className="h-10 w-10 rounded-full"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>

            {/* Volume Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="h-8 w-8 rounded-full"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              
              {/* Volume Slider */}
              <div className="w-20">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  aria-label="Volume control"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Visual indicator when playing */}
        {isPlaying && (
          <div className="absolute -top-2 -right-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {!isLoaded && !error && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-full shadow-lg p-3 border border-gray-200">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
          </div>
        </div>
      )}
    </>
  )
}
