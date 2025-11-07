'use client'

import { motion } from 'framer-motion'
import { Heart, Flower, Flower2, Leaf } from 'lucide-react'

interface ThankYouSectionProps {
  couple: {
    bride: { name: string }
    groom: { name: string }
  }
}

export function ThankYouSection({ couple }: ThankYouSectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-emerald-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-10 left-10 text-emerald-600"
        >
          <Flower size={60} />
        </motion.div>
        
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 right-20 text-amber-500"
        >
          <Flower2 size={50} />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity 
          }}
          className="absolute bottom-20 left-20 text-rose-400"
        >
          <Leaf size={45} />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -15, 15, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity 
          }}
          className="absolute bottom-10 right-10 text-emerald-500"
        >
          <Leaf size={40} />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Main thank you message */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-2xl shadow-emerald-200/40 border-2 border-emerald-200 relative">
            {/* Decorative corner hearts */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -left-4 text-rose-300"
            >
              <Heart size={32} fill="currentColor" />
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-4 -right-4 text-rose-300"
            >
              <Heart size={32} fill="currentColor" />
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 text-rose-300"
            >
              <Heart size={32} fill="currentColor" />
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              className="absolute -bottom-4 -right-4 text-rose-300"
            >
              <Heart size={32} fill="currentColor" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="font-playfair text-4xl md:text-6xl text-emerald-800 mb-8">
                Thank You
              </h2>
              
              <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full mb-8"></div>
              
              <p className="font-inter text-lg md:text-xl text-emerald-700 leading-relaxed mb-8 max-w-3xl mx-auto">
                Your presence in our lives has been a blessing, and having you celebrate this special moment with us 
                means more than words can express. Thank you for being part of our love story.
              </p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-8"
              >
                <p className="font-dancing text-3xl md:text-4xl text-emerald-700 mb-4">
                  With all our love,
                </p>
                <p className="font-playfair text-2xl md:text-3xl text-emerald-800">
                  {couple.bride.name} & {couple.groom.name}
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Additional decorative quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <blockquote className="font-dancing text-2xl md:text-3xl text-emerald-700 max-w-2xl mx-auto">
              "Love is not just looking at each other, it's looking in the same direction together"
            </blockquote>
          </motion.div>

          {/* Final decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Flower className="w-8 h-8 text-emerald-600" />
              </motion.div>
              
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-10 h-10 text-rose-400" fill="currentColor" />
              </motion.div>
              
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Flower2 className="w-8 h-8 text-amber-500" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-emerald-100 to-transparent"></div>
    </section>
  )
}