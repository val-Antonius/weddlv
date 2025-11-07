'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, Phone, MapPin, Check, Zap, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  attendance: 'yes' | 'no' | ''
  message: string
}

const comicTextStyle = {
  textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
}

export function RSVPSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    attendance: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.attendance) newErrors.attendance = 'Please select your attendance'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-green-500 to-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            className="bg-white border-4 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative"
          >
            {/* Success burst */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white w-16 h-16 rounded-full border-4 border-black flex items-center justify-center"
            >
              <Check className="w-8 h-8" />
            </motion.div>
            
            <motion.h3 
              className="text-4xl font-bold text-black uppercase tracking-wider mb-4 pt-4"
              style={comicTextStyle}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              MISSION COMPLETE!
            </motion.h3>
            <div className="bg-yellow-400 text-black px-4 py-2 border-2 border-black inline-block font-bold" style={comicTextStyle}>
              RSVP RECEIVED!
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-orange-500 via-red-600 to-purple-600">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-white border-4 border-black p-8 inline-block shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black uppercase tracking-wider mb-4" style={comicTextStyle}>
              RSVP NOW!
            </h2>
            <div className="bg-red-600 text-white px-4 py-2 border-2 border-black inline-block font-bold" style={comicTextStyle}>
              JOIN THE ADVENTURE!
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative"
        >
          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 border-2 border-black"></div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 border-2 border-black"></div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-600 border-2 border-black"></div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 border-2 border-black"></div>

          {/* Action burst */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black w-12 h-12 rounded-full border-4 border-black flex items-center justify-center"
          >
            <Zap size={20} />
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-black font-bold mb-2 uppercase" style={comicTextStyle}>
                  <User size={18} />
                  HERO NAME *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`border-4 ${errors.name ? 'border-red-600' : 'border-black'} focus:border-blue-600 bg-yellow-100 font-bold`}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1 font-bold">{errors.name}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-black font-bold mb-2 uppercase" style={comicTextStyle}>
                  <Mail size={18} />
                  EMAIL ADDRESS *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`border-4 ${errors.email ? 'border-red-600' : 'border-black'} focus:border-blue-600 bg-yellow-100 font-bold`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1 font-bold">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-black font-bold mb-2 uppercase" style={comicTextStyle}>
                  <Phone size={18} />
                  PHONE NUMBER *
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`border-4 ${errors.phone ? 'border-red-600' : 'border-black'} focus:border-blue-600 bg-yellow-100 font-bold`}
                  placeholder="Enter your phone"
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1 font-bold">{errors.phone}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-black font-bold mb-2 uppercase" style={comicTextStyle}>
                  <MapPin size={18} />
                  ADDRESS *
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`border-4 ${errors.address ? 'border-red-600' : 'border-black'} focus:border-blue-600 bg-yellow-100 font-bold`}
                  placeholder="Enter your address"
                />
                {errors.address && <p className="text-red-600 text-sm mt-1 font-bold">{errors.address}</p>}
              </div>
            </div>

            <div>
              <label className="text-black font-bold mb-4 block uppercase" style={comicTextStyle}>
                WILL YOU JOIN THE MISSION? *
              </label>
              <div className="flex gap-4">
                {[
                  { value: 'yes', label: 'YES! COUNT ME IN!', bg: 'bg-green-500' },
                  { value: 'no', label: 'NO, MISSION IMPOSSIBLE', bg: 'bg-red-600' }
                ].map((option) => (
                  <motion.label
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex-1 p-4 border-4 border-black cursor-pointer transition-all duration-300 text-center font-bold
                      ${formData.attendance === option.value 
                        ? `${option.bg} text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` 
                        : 'bg-white text-black hover:bg-yellow-100'
                      }
                    `}
                    style={comicTextStyle}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={option.value}
                      checked={formData.attendance === option.value}
                      onChange={(e) => handleInputChange('attendance', e.target.value)}
                      className="sr-only"
                    />
                    <span>{option.label}</span>
                  </motion.label>
                ))}
              </div>
              {errors.attendance && <p className="text-red-600 text-sm mt-2 font-bold">{errors.attendance}</p>}
            </div>

            <div>
              <label className="text-black font-bold mb-2 block uppercase" style={comicTextStyle}>
                SECRET MESSAGE
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="border-4 border-black focus:border-blue-600 min-h-[100px] bg-yellow-100 font-bold"
                placeholder="Share your super powers or special requests..."
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider"
                style={comicTextStyle}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin"></div>
                    SENDING RSVP...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send size={20} />
                    SEND RSVP NOW!
                  </div>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Action words */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-3 py-1 border-4 border-black font-bold text-sm transform rotate-12"
            style={comicTextStyle}
          >
            BOOM!
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}