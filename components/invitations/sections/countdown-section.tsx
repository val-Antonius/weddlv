'use client'

import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

interface CountdownSectionProps {
  targetDate?: string
  template: 'simple-modern' | 'classic-elegant' | 'romantic-feminine'
  className?: string
}

function calculateTimeLeft(targetDate?: string): TimeLeft {
  if (!targetDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
  }

  const difference = +new Date(targetDate) - +new Date()
  
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference
    }
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
}

export function CountdownSection({ targetDate, template, className }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (!targetDate) return

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  // Don't render if no target date
  if (!targetDate) {
    return null
  }

  const getTemplateStyles = () => {
    switch (template) {
      case 'classic-elegant':
        return {
          container: 'bg-gradient-to-br from-amber-50 to-amber-100',
          title: 'text-amber-900',
          card: 'bg-amber-50 border-amber-200',
          number: 'text-amber-900',
          label: 'text-amber-700',
          expired: 'text-amber-800 bg-amber-100'
        }
      case 'romantic-feminine':
        return {
          container: 'bg-gradient-to-br from-pink-50 to-rose-100',
          title: 'text-pink-900',
          card: 'bg-pink-50 border-pink-200',
          number: 'text-pink-900',
          label: 'text-pink-700',
          expired: 'text-pink-800 bg-pink-100'
        }
      default: // simple-modern
        return {
          container: 'bg-gradient-to-br from-gray-50 to-gray-100',
          title: 'text-gray-900',
          card: 'bg-white border-gray-200',
          number: 'text-gray-900',
          label: 'text-gray-600',
          expired: 'text-gray-800 bg-gray-100'
        }
    }
  }

  const styles = getTemplateStyles()

  // Handle case when date has passed
  if (timeLeft.total <= 0) {
    return (
      <section className={`py-16 ${styles.container} ${className}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${styles.title}`}>
            The Big Day Has Arrived! 🎉
          </h2>
          <div className={`inline-block px-8 py-4 rounded-full ${styles.expired}`}>
            <p className="text-lg font-medium">
              We're getting married right now!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-16 ${styles.container} ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${styles.title}`}>
            Counting Down to Our Big Day
          </h2>
          <p className="text-lg opacity-80">
            Every moment brings us closer to forever
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className={`text-center p-6 rounded-lg border-2 ${styles.card} shadow-lg`}>
            <div className={`text-3xl md:text-5xl font-bold mb-2 ${styles.number}`}>
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className={`text-sm md:text-base font-medium uppercase tracking-wider ${styles.label}`}>
              Days
            </div>
          </div>

          <div className={`text-center p-6 rounded-lg border-2 ${styles.card} shadow-lg`}>
            <div className={`text-3xl md:text-5xl font-bold mb-2 ${styles.number}`}>
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className={`text-sm md:text-base font-medium uppercase tracking-wider ${styles.label}`}>
              Hours
            </div>
          </div>

          <div className={`text-center p-6 rounded-lg border-2 ${styles.card} shadow-lg`}>
            <div className={`text-3xl md:text-5xl font-bold mb-2 ${styles.number}`}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className={`text-sm md:text-base font-medium uppercase tracking-wider ${styles.label}`}>
              Minutes
            </div>
          </div>

          <div className={`text-center p-6 rounded-lg border-2 ${styles.card} shadow-lg`}>
            <div className={`text-3xl md:text-5xl font-bold mb-2 ${styles.number}`}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className={`text-sm md:text-base font-medium uppercase tracking-wider ${styles.label}`}>
              Seconds
            </div>
          </div>
        </div>

        {/* Heart animation */}
        <div className="text-center mt-8">
          <span className="text-2xl animate-pulse">💕</span>
        </div>
      </div>
    </section>
  )
}
