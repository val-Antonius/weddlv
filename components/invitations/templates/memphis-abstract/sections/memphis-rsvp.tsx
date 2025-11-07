'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MemphisAbstractConfig } from '../memphis-abstract-template'

interface MemphisRSVPProps {
  config: MemphisAbstractConfig
}

export function MemphisRSVP({ config }: MemphisRSVPProps) {
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
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <section id="rsvp" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-200 to-pink-200 py-20">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="text-center"
        >
          <div className="text-7xl font-black bg-green-400 text-black px-8 py-4 border-8 border-black shadow-[16px_16px_0_theme(colors.purple.600)] transform rotate-3 mb-8">
            AWESOME!
          </div>
          <div className="text-3xl font-bold bg-white border-4 border-black px-6 py-3 transform -rotate-2 shadow-[8px_8px_0_theme(colors.cyan.400)]">
            YOUR RSVP IS LOCKED IN!
          </div>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-yellow-100 via-cyan-100 to-purple-100 py-20 relative overflow-hidden">
      {/* Scattered Shapes Background */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              ['w-6 h-6', 'w-8 h-8', 'w-4 h-12', 'w-12 h-4'][Math.floor(Math.random() * 4)]
            } ${
              ['bg-pink-400', 'bg-yellow-300', 'bg-cyan-400', 'bg-purple-600', 'bg-orange-500'][Math.floor(Math.random() * 5)]
            } ${
              ['rounded-full', '', 'rotate-45', 'skew-x-12'][Math.floor(Math.random() * 4)]
            } opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-8 max-w-3xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="text-6xl md:text-7xl font-black mb-6">
            <span className="inline-block transform rotate-6 bg-red-500 text-white px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.cyan.400)] mr-4">
              RSVP
            </span>
            <span className="inline-block transform -rotate-3 bg-yellow-300 text-black px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.purple.600)]">
              NOW!
            </span>
          </div>
          <div className="text-xl font-bold bg-white border-4 border-black px-6 py-3 transform rotate-1 shadow-[6px_6px_0_theme(colors.pink.400)] inline-block">
            DEADLINE: {new Date(config.content.rsvpDeadline).toLocaleDateString().toUpperCase()}
          </div>
        </motion.div>

        {/* RSVP Form */}
        <motion.form
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-white border-8 border-black transform rotate-1 shadow-[16px_16px_0_theme(colors.lime.500)] p-8 relative"
        >
          {/* Corner Decorations */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-400 rotate-45 border-4 border-black" />
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-cyan-400 rounded-full border-4 border-black" />
          <div className="absolute -bottom-4 -left-4 w-6 h-12 bg-yellow-300 skew-x-12 border-4 border-black" />
          <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-purple-600 border-4 border-black" />

          {/* Name Field */}
          <div className="mb-8">
            <label className="block text-2xl font-black mb-4 transform -rotate-1 bg-pink-400 text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0_theme(colors.yellow.300)] inline-block">
              YOUR NAME:
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full text-2xl font-bold p-4 border-6 border-black bg-yellow-100 focus:bg-cyan-100 focus:outline-none transform rotate-1 shadow-[6px_6px_0_theme(colors.purple.600)]"
              placeholder="TYPE YOUR AWESOME NAME HERE"
            />
          </div>

          {/* Attendance */}
          <div className="mb-8">
            <label className="block text-2xl font-black mb-4 transform rotate-1 bg-cyan-400 text-black px-4 py-2 border-4 border-black shadow-[4px_4px_0_theme(colors.red.500)] inline-block">
              WILL YOU JOIN THE PARTY?
            </label>
            <div className="space-y-4">
              {[
                { value: 'yes', label: 'YES! COUNT ME IN!', color: 'bg-lime-500', shadow: 'shadow-[6px_6px_0_theme(colors.purple.600)]' },
                { value: 'no', label: 'NO, I CAN\'T MAKE IT', color: 'bg-orange-500', shadow: 'shadow-[6px_6px_0_theme(colors.cyan.400)]' }
              ].map((option) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  className={`block ${option.color} border-4 border-black p-4 cursor-pointer font-black text-xl transform ${formData.attendance === option.value ? 'rotate-2' : '-rotate-1'} ${option.shadow} ${
                    formData.attendance === option.value ? 'scale-105' : ''
                  } transition-all duration-200`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value={option.value}
                    checked={formData.attendance === option.value}
                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                    className="mr-4 scale-150"
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
              className="mb-8"
            >
              <label className="block text-2xl font-black mb-4 transform -rotate-2 bg-purple-600 text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0_theme(colors.lime.500)] inline-block">
                HOW MANY PEOPLE?
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
                className="w-full text-2xl font-bold p-4 border-6 border-black bg-pink-100 focus:bg-yellow-100 focus:outline-none transform rotate-1 shadow-[6px_6px_0_theme(colors.orange.500)]"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>
                    {num} PERSON{num > 1 ? 'S' : ''}
                  </option>
                ))}
              </select>
            </motion.div>
          )}

          {/* Message */}
          <div className="mb-8">
            <label className="block text-2xl font-black mb-4 transform rotate-2 bg-orange-500 text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0_theme(colors.cyan.400)] inline-block">
              LEAVE A MESSAGE:
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full text-lg font-bold p-4 border-6 border-black bg-lime-100 focus:bg-pink-100 focus:outline-none h-32 resize-none transform -rotate-1 shadow-[6px_6px_0_theme(colors.yellow.300)]"
              placeholder="TELL US SOMETHING WILD AND WONDERFUL!"
              maxLength={200}
            />
            <div className="text-right text-gray-600 font-bold mt-2">
              {formData.message.length}/200 CHARACTERS
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.05, rotate: isSubmitting ? 0 : 5 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            className={`w-full py-6 text-3xl font-black border-8 border-black transition-all duration-200 ${
              isSubmitting 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed transform rotate-0' 
                : 'bg-red-500 text-white transform rotate-2 shadow-[12px_12px_0_theme(colors.cyan.400)] hover:shadow-[16px_16px_0_theme(colors.yellow.300)]'
            }`}
          >
            {isSubmitting ? 'SENDING YOUR AWESOME RSVP...' : 'SEND MY RSVP!'}
          </motion.button>
        </motion.form>

        {/* Fun Tip */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-pink-400 to-cyan-400 text-black text-xl font-black px-8 py-4 transform -rotate-2 border-6 border-black shadow-[8px_8px_0_theme(colors.purple.600)] inline-block">
            💡 RSVP EARLY FOR THE BEST GEOMETRIC SEATING!
          </div>
        </motion.div>
      </div>
    </section>
  )
}