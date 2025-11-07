'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, Phone, MapPin, Check, Heart, PartyPopper } from 'lucide-react'
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
      <section className="py-20 px-4 bg-gradient-to-br from-green-200 via-blue-200 to-purple-200">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-lg relative overflow-hidden"
          >
            {/* Confetti animation */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-4 text-yellow-400"
            >
              <PartyPopper size={32} />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            
            <h3 className="font-pacifico text-4xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
              Yay! Thank You! 🎉
            </h3>
            <p className="font-nunito text-lg text-gray-700">
              Your RSVP has been received! We can't wait to celebrate with you! 💕
            </p>
            <motion.div 
              className="text-4xl mt-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🥳✨🎊
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-200 via-blue-200 to-purple-200">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-quicksand text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            RSVP 📝
          </motion.h2>
          <p className="font-nunito text-xl text-gray-700 max-w-2xl mx-auto">
            Let us know if you'll be joining our colorful celebration! 🌈
          </p>
          <motion.div 
            className="w-40 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mx-auto rounded-full mt-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden"
        >
          {/* Floating decorations */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-4 right-4 text-pink-300"
          >
            <Heart size={24} />
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-nunito font-semibold mb-2">
                  <User size={18} className="text-pink-500" />
                  Full Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`border-2 rounded-xl ${errors.name ? 'border-red-400' : 'border-pink-300'} focus:border-pink-500 bg-white/80`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 font-nunito">{errors.name}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-nunito font-semibold mb-2">
                  <Mail size={18} className="text-blue-500" />
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`border-2 rounded-xl ${errors.email ? 'border-red-400' : 'border-blue-300'} focus:border-blue-500 bg-white/80`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 font-nunito">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-nunito font-semibold mb-2">
                  <Phone size={18} className="text-green-500" />
                  Phone Number *
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`border-2 rounded-xl ${errors.phone ? 'border-red-400' : 'border-green-300'} focus:border-green-500 bg-white/80`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1 font-nunito">{errors.phone}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-nunito font-semibold mb-2">
                  <MapPin size={18} className="text-purple-500" />
                  Address *
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`border-2 rounded-xl ${errors.address ? 'border-red-400' : 'border-purple-300'} focus:border-purple-500 bg-white/80`}
                  placeholder="Enter your address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1 font-nunito">{errors.address}</p>}
              </div>
            </div>

            <div>
              <label className="text-gray-700 font-nunito font-semibold mb-4 block">
                Will you be attending? *
              </label>
              <div className="flex gap-4">
                {[
                  { value: 'yes', label: 'Yes! Can\'t wait! 🎉', gradient: 'from-green-400 to-emerald-400' },
                  { value: 'no', label: 'Sorry, can\'t make it 😢', gradient: 'from-gray-400 to-gray-500' }
                ].map((option) => (
                  <motion.label
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 text-center
                      ${formData.attendance === option.value 
                        ? `bg-gradient-to-r ${option.gradient} text-white border-transparent shadow-lg` 
                        : 'border-gray-300 hover:border-gray-400 bg-white/50'
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
                    <span className="font-nunito font-semibold">{option.label}</span>
                  </motion.label>
                ))}
              </div>
              {errors.attendance && <p className="text-red-500 text-sm mt-2 font-nunito">{errors.attendance}</p>}
            </div>

            <div>
              <label className="text-gray-700 font-nunito font-semibold mb-2 block">
                Special Message (Optional) 💌
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="border-2 border-yellow-300 focus:border-yellow-500 rounded-xl min-h-[100px] bg-white/80"
                placeholder="Share your excitement, wishes, or any special requests..."
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white py-6 text-lg font-nunito font-bold rounded-xl shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending RSVP... ✨
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send size={20} />
                    Send RSVP 🎉
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