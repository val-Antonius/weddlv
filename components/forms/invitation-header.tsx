'use client'

import { useState, useEffect } from 'react'
import { Heart, Sparkles, Calendar } from 'lucide-react'

export function InvitationHeader() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > 100) {
        setIsVisible(currentScrollY < lastScrollY)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div className={`bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-10 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Heart className="h-8 w-8 text-rose-500 fill-rose-200" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Create Your Dream Invitation
            </h1>
            <Sparkles className="h-8 w-8 text-amber-500 fill-amber-200" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Design a beautiful, personalized wedding invitation that captures your love story and shares your joy with family and friends.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Easy Setup</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>Beautiful Templates</span>
            </div>
            <div className="flex items-center space-x-1">
              <Sparkles className="h-4 w-4" />
              <span>Mobile Friendly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}