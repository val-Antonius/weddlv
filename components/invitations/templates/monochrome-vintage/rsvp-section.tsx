'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, Phone, MapPin, Check, Award } from 'lucide-react'
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
      <section className="py-20 px-4 bg-gradient-to-b from-white to-zinc-50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="border-2 border-zinc-900 p-12 bg-white drop-shadow-2xl relative"
          >
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-white border border-zinc-900"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-zinc-900"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white border border-zinc-900"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white border border-zinc-900"></div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 border-2 border-zinc-900 flex items-center justify-center mx-auto mb-6 bg-white"
            >
              <Check className="w-10 h-10 text-zinc-900" />
            </motion.div>
            
            <h3 className="font-cinzel text-3xl text-zinc-900 mb-4 tracking-wide">
              RSVP RECEIVED
            </h3>
            <p className="font-crimson text-zinc-700 italic">
              Your response has been recorded with gratitude
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-zinc-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-zinc-900 mb-6 tracking-wider">
            RSVP
          </h2>
          <p className="font-crimson text-lg text-zinc-700 max-w-2xl mx-auto italic">
            Kindly respond by the date specified
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-32 h-px bg-zinc-900"></div>
            <Award className="w-6 h-6 text-zinc-900" />
            <div className="w-32 h-px bg-zinc-900"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-2 border-zinc-900 p-8 md:p-12 bg-white drop-shadow-2xl relative"
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-r border-b border-zinc-900"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-zinc-900"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-r border-t border-zinc-900"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-l border-t border-zinc-900"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-zinc-900 font-crimson mb-2 tracking-wide">
                  <User size={18} />
                  FULL NAME *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`border-2 ${errors.name ? 'border-red-500' : 'border-zinc-900'} focus:border-zinc-700 bg-white`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 font-crimson">{errors.name}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-zinc-900 font-crimson mb-2 tracking-wide">
                  <Mail size={18} />
                  EMAIL ADDRESS *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`border-2 ${errors.email ? 'border-red-500' : 'border-zinc-900'} focus:border-zinc-700 bg-white`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 font-crimson">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-zinc-900 font-crimson mb-2 tracking-wide">
                  <Phone size={18} />
                  PHONE NUMBER *
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`border-2 ${errors.phone ? 'border-red-500' : 'border-zinc-900'} focus:border-zinc-700 bg-white`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1 font-crimson">{errors.phone}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-zinc-900 font-crimson mb-2 tracking-wide">
                  <MapPin size={18} />
                  ADDRESS *
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`border-2 ${errors.address ? 'border-red-500' : 'border-zinc-900'} focus:border-zinc-700 bg-white`}
                  placeholder="Enter your address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1 font-crimson">{errors.address}</p>}
              </div>
            </div>

            <div>
              <label className="text-zinc-900 font-crimson mb-4 block tracking-wide">
                WILL YOU BE ATTENDING? *
              </label>
              <div className="flex gap-4">
                {[
                  { value: 'yes', label: 'YES, WITH PLEASURE' },
                  { value: 'no', label: 'REGRETFULLY DECLINE' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`
                      flex-1 p-4 border-2 cursor-pointer transition-all duration-300 text-center
                      ${formData.attendance === option.value 
                        ? 'border-zinc-900 bg-zinc-900 text-white' 
                        : 'border-zinc-900 hover:bg-zinc-50'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={option.value}
                      checked={formData.attendance === option.value}
                      onChange={(e) => handleInputChange('attendance', e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-crimson tracking-wide">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.attendance && <p className="text-red-500 text-sm mt-2 font-crimson">{errors.attendance}</p>}
            </div>

            <div>
              <label className="text-zinc-900 font-crimson mb-2 block tracking-wide">
                ADDITIONAL MESSAGE
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="border-2 border-zinc-900 focus:border-zinc-700 min-h-[100px] bg-white"
                placeholder="Share your thoughts or special requests..."
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-6 text-lg font-crimson tracking-wider border-2 border-zinc-900"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin"></div>
                    SUBMITTING RESPONSE...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send size={20} />
                    SUBMIT RSVP
                  </div>
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}