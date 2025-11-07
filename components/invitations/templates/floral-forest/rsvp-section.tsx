'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, Phone, MapPin, Check } from 'lucide-react'
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
    
    // Simulate API call
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
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-stone-50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-12 shadow-2xl shadow-emerald-200/30 border-2 border-emerald-200"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-emerald-600" />
            </motion.div>
            
            <h3 className="font-playfair text-3xl text-emerald-800 mb-4">
              Thank You!
            </h3>
            <p className="font-inter text-emerald-700">
              Your RSVP has been received. We can't wait to celebrate with you!
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-stone-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-emerald-800 mb-4">
            RSVP
          </h2>
          <p className="font-inter text-lg text-emerald-700 max-w-2xl mx-auto">
            Please let us know if you'll be joining us for our special day
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-emerald-200/30 border-2 border-emerald-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-emerald-700 font-inter mb-2">
                  <User size={18} />
                  Full Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`border-2 ${errors.name ? 'border-red-300' : 'border-emerald-200'} focus:border-emerald-500`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-emerald-700 font-inter mb-2">
                  <Mail size={18} />
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`border-2 ${errors.email ? 'border-red-300' : 'border-emerald-200'} focus:border-emerald-500`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-emerald-700 font-inter mb-2">
                  <Phone size={18} />
                  Phone Number *
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`border-2 ${errors.phone ? 'border-red-300' : 'border-emerald-200'} focus:border-emerald-500`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-emerald-700 font-inter mb-2">
                  <MapPin size={18} />
                  Address *
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`border-2 ${errors.address ? 'border-red-300' : 'border-emerald-200'} focus:border-emerald-500`}
                  placeholder="Enter your address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>

            <div>
              <label className="text-emerald-700 font-inter mb-4 block">
                Will you be attending? *
              </label>
              <div className="flex gap-4">
                {[
                  { value: 'yes', label: 'Yes, I\'ll be there!', color: 'emerald' },
                  { value: 'no', label: 'Sorry, can\'t make it', color: 'rose' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`
                      flex-1 p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300
                      ${formData.attendance === option.value 
                        ? `border-${option.color}-500 bg-${option.color}-50` 
                        : 'border-emerald-200 hover:border-emerald-300'
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
                    <span className="font-inter text-emerald-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.attendance && <p className="text-red-500 text-sm mt-2">{errors.attendance}</p>}
            </div>

            <div>
              <label className="text-emerald-700 font-inter mb-2 block">
                Special Message (Optional)
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="border-2 border-emerald-200 focus:border-emerald-500 min-h-[100px]"
                placeholder="Share your wishes or any special requests..."
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-6 text-lg font-inter rounded-2xl shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending RSVP...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send size={20} />
                    Send RSVP
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