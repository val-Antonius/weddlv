'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Zap, Star, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Wish {
  name: string
  message: string
  date: string
}

interface WishesSectionProps {
  wishes: Wish[]
}

const comicTextStyle = {
  textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
}

export function WishesSection({ wishes: initialWishes }: WishesSectionProps) {
  const [wishes, setWishes] = useState(initialWishes)
  const [newWish, setNewWish] = useState({ name: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({})

  const validateForm = (): boolean => {
    const newErrors: { name?: string; message?: string } = {}
    
    if (!newWish.name.trim()) newErrors.name = 'Name is required'
    if (!newWish.message.trim()) newErrors.message = 'Message is required'
    else if (newWish.message.length > 500) newErrors.message = 'Message must be 500 characters or less'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newWishEntry: Wish = {
      name: newWish.name,
      message: newWish.message,
      date: new Date().toISOString()
    }
    
    setWishes(prev => [newWishEntry, ...prev])
    setNewWish({ name: '', message: '' })
    setIsSubmitting(false)
  }

  const handleInputChange = (field: 'name' | 'message', value: string) => {
    setNewWish(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const wishColors = [
    'bg-red-600',
    'bg-blue-600', 
    'bg-purple-600',
    'bg-green-500',
    'bg-yellow-400'
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-red-600 to-orange-500">
      <div className="max-w-6xl mx-auto">
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
              HERO WISHES!
            </h2>
            <div className="bg-yellow-400 text-black px-4 py-2 border-2 border-black inline-block font-bold" style={comicTextStyle}>
              SEND YOUR SUPER POWERS!
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Wish form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
              whileHover={{ scale: 1.02 }}
            >
              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-red-600 border-2 border-black"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 border-2 border-black"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-600 border-2 border-black"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 border-2 border-black"></div>

              {/* Action burst */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black w-12 h-12 rounded-full border-4 border-black flex items-center justify-center"
              >
                <Zap size={20} />
              </motion.div>

              <div className="flex items-center gap-3 mb-6 pt-4">
                <div className="w-12 h-12 bg-red-600 border-4 border-black flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black uppercase tracking-wide" style={comicTextStyle}>
                  SEND A WISH!
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-black font-bold mb-2 uppercase" style={comicTextStyle}>
                    <User size={18} />
                    HERO NAME *
                  </label>
                  <Input
                    value={newWish.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`border-4 ${errors.name ? 'border-red-600' : 'border-black'} focus:border-blue-600 bg-yellow-100 font-bold`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1 font-bold">{errors.name}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-black font-bold mb-2 uppercase" style={comicTextStyle}>
                    <Target size={18} />
                    YOUR MESSAGE *
                  </label>
                  <Textarea
                    value={newWish.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`border-4 ${errors.message ? 'border-red-600' : 'border-black'} focus:border-blue-600 min-h-[120px] bg-yellow-100 font-bold`}
                    placeholder="Share your super wishes and powers for our love adventure..."
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message && <p className="text-red-600 text-sm font-bold">{errors.message}</p>}
                    <p className="text-black text-sm ml-auto font-bold">
                      {newWish.message.length}/500
                    </p>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider"
                    style={comicTextStyle}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin"></div>
                        SENDING WISH...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send size={20} />
                        SEND SUPER WISH!
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          {/* Wishes display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {wishes.length === 0 ? (
                <motion.div 
                  className="text-center py-12 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-yellow-400 text-black w-16 h-16 rounded-full border-4 border-black flex items-center justify-center mx-auto mb-4"
                  >
                    <Star size={32} />
                  </motion.div>
                  <p className="font-bold text-black uppercase" style={comicTextStyle}>
                    BE THE FIRST HERO TO WISH!
                  </p>
                </motion.div>
              ) : (
                wishes.map((wish, index) => {
                  const bgColor = wishColors[index % wishColors.length]
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="relative"
                    >
                      {/* Thought bubble */}
                      <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                        {/* Bubble tail */}
                        <div className="absolute -left-3 top-6 w-0 h-0 border-t-[12px] border-b-[12px] border-r-[12px] border-t-transparent border-b-transparent border-r-white"></div>
                        <div className="absolute -left-4 top-5 w-0 h-0 border-t-[14px] border-b-[14px] border-r-[14px] border-t-transparent border-b-transparent border-r-black"></div>
                        
                        <div className="flex items-start gap-4">
                          <motion.div 
                            className={`w-10 h-10 ${bgColor} border-4 border-black flex items-center justify-center flex-shrink-0`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <User className="w-5 h-5 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-black uppercase tracking-wide" style={comicTextStyle}>
                                {wish.name}
                              </h4>
                              <span className="text-black text-sm font-bold">
                                {formatDate(wish.date)}
                              </span>
                            </div>
                            <p className="font-bold text-black leading-relaxed">
                              "{wish.message}"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action word */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className={`absolute -bottom-2 -right-2 ${bgColor} text-white px-2 py-1 border-2 border-black font-bold text-xs transform rotate-12`}
                        style={comicTextStyle}
                      >
                        {index % 4 === 0 && "WOW!"}
                        {index % 4 === 1 && "COOL!"}
                        {index % 4 === 2 && "NICE!"}
                        {index % 4 === 3 && "YES!"}
                      </motion.div>
                    </motion.div>
                  )
                })
              )}
            </div>
          </motion.div>
        </div>

        {/* Statistics */}
        {wishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <motion.div 
              className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-red-600 text-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center"
                >
                  <Star size={24} />
                </motion.div>
                <div>
                  <p className="text-2xl font-bold text-black uppercase tracking-wide" style={comicTextStyle}>
                    {wishes.length}
                  </p>
                  <p className="font-bold text-black text-sm uppercase tracking-wide">
                    {wishes.length === 1 ? 'SUPER WISH!' : 'SUPER WISHES!'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}