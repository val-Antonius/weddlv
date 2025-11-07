'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PixelArcadeConfig } from '../pixel-arcade-template'

interface PixelRSVPProps {
  config: PixelArcadeConfig
}

export function PixelRSVP({ config }: PixelRSVPProps) {
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    guests: '1',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <section id="rsvp" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <div className="text-6xl font-bold text-green-400 mb-4" style={{
            textShadow: '4px 4px 0px #000000'
          }}>
            SUCCESS!
          </div>
          <div className="text-2xl text-cyan-400 font-mono">RSVP REGISTERED</div>
          <div className="text-yellow-300 font-mono mt-4">+1000 POINTS</div>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 py-20 relative">
      {/* Pixel Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(90deg, #00ffff 1px, transparent 1px), linear-gradient(#00ffff 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="container mx-auto px-8 max-w-2xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="bg-yellow-300 text-gray-900 px-6 py-2 inline-block font-bold text-lg mb-4 border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.orange.500)]">
            🎮 PLAYER REGISTRATION
          </div>
          <div className="text-3xl font-bold text-cyan-400 mb-2" style={{
            textShadow: '3px 3px 0px #ff00ff'
          }}>
            JOIN THE PARTY
          </div>
          <div className="text-lime-400 font-mono">
            DEADLINE: {new Date(config.content.rsvpDeadline).toLocaleDateString().toUpperCase()}
          </div>
        </motion.div>

        {/* RSVP Form */}
        <motion.form
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-gray-800 border-4 border-cyan-400 p-8 shadow-[8px_8px_0px_0px_theme(colors.purple.500)]"
        >
          {/* Player Name */}
          <div className="mb-6">
            <label className="block text-yellow-300 font-mono font-bold mb-2">
              PLAYER NAME:
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-black border-2 border-magenta-500 p-3 text-cyan-400 font-mono focus:border-lime-400 focus:outline-none"
              placeholder="ENTER YOUR NAME"
            />
          </div>

          {/* Attendance Selection */}
          <div className="mb-6">
            <label className="block text-yellow-300 font-mono font-bold mb-2">
              WILL YOU JOIN THE QUEST?
            </label>
            <div className="space-y-2">
              {[
                { value: 'yes', label: '✓ YES - READY TO PARTY!', color: 'border-green-400 text-green-400' },
                { value: 'no', label: '✗ NO - CANNOT ATTEND', color: 'border-red-400 text-red-400' }
              ].map((option) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  className={`block bg-gray-700 border-2 ${option.color} p-3 cursor-pointer font-mono ${
                    formData.attendance === option.value ? 'bg-gray-600' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value={option.value}
                    checked={formData.attendance === option.value}
                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                    className="mr-3"
                    required
                  />
                  {option.label}
                </motion.label>
              ))}
            </div>
          </div>

          {/* Guest Count */}
          {formData.attendance === 'yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6"
            >
              <label className="block text-yellow-300 font-mono font-bold mb-2">
                PARTY SIZE:
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
                className="w-full bg-black border-2 border-magenta-500 p-3 text-cyan-400 font-mono focus:border-lime-400 focus:outline-none"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>
                    {num} PLAYER{num > 1 ? 'S' : ''}
                  </option>
                ))}
              </select>
            </motion.div>
          )}

          {/* Message */}
          <div className="mb-6">
            <label className="block text-yellow-300 font-mono font-bold mb-2">
              SPECIAL MESSAGE (OPTIONAL):
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-black border-2 border-magenta-500 p-3 text-cyan-400 font-mono focus:border-lime-400 focus:outline-none h-24 resize-none"
              placeholder="LEAVE A MESSAGE FOR THE COUPLE..."
              maxLength={200}
            />
            <div className="text-right text-gray-400 text-sm font-mono mt-1">
              {formData.message.length}/200
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            className={`w-full py-4 text-xl font-bold border-4 border-white font-mono transition-all duration-100 ${
              isSubmitting 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-lime-400 text-gray-900 shadow-[4px_4px_0px_0px_theme(colors.green.600)] hover:shadow-[6px_6px_0px_0px_theme(colors.green.600)]'
            }`}
          >
            {isSubmitting ? 'PROCESSING...' : 'SUBMIT RSVP'}
          </motion.button>
        </motion.form>

        {/* Game Tips */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-indigo-900 border-4 border-yellow-300 p-4 font-mono text-center"
        >
          <div className="text-yellow-300 font-bold mb-2">💡 PRO TIP:</div>
          <div className="text-cyan-400 text-sm">
            RSVP EARLY FOR BONUS POINTS AND BETTER SEATING!
          </div>
        </motion.div>
      </div>
    </section>
  )
}