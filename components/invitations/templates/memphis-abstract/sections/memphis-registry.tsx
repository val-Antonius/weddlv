'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Gift } from 'lucide-react'
import { MemphisAbstractConfig } from '../memphis-abstract-template'

interface MemphisRegistryProps {
  config: MemphisAbstractConfig
}

export function MemphisRegistry({ config }: MemphisRegistryProps) {
  const registryLinks = config.content.registry.links.length > 0 
    ? config.content.registry.links 
    : [
        { name: 'AMAZON', url: '#' },
        { name: 'TARGET', url: '#' },
        { name: 'IKEA', url: '#' },
        { name: 'WEST ELM', url: '#' }
      ]

  return (
    <section id="registry" className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-purple-100 via-orange-100 to-cyan-100 py-20 relative overflow-hidden">
      {/* Wild Background Shapes */}
      <div className="absolute inset-0">
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              ['w-4 h-4', 'w-6 h-6', 'w-3 h-10', 'w-10 h-3', 'w-8 h-8'][Math.floor(Math.random() * 5)]
            } ${
              ['bg-pink-400', 'bg-yellow-300', 'bg-cyan-400', 'bg-purple-600', 'bg-orange-500', 'bg-lime-500'][Math.floor(Math.random() * 6)]
            } ${
              ['rounded-full', '', 'rotate-45', 'skew-x-12', 'skew-y-12'][Math.floor(Math.random() * 5)]
            } opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, Math.random() * 720 - 360],
              scale: [1, Math.random() * 0.8 + 0.6, 1],
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-center mb-16"
        >
          <div className="text-6xl md:text-7xl font-black mb-6">
            <span className="inline-block transform rotate-6 bg-red-500 text-white px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.cyan.400)] mr-4">
              GIFT
            </span>
            <span className="inline-block transform -rotate-3 bg-yellow-300 text-black px-6 py-2 border-8 border-black shadow-[12px_12px_0_theme(colors.purple.600)]">
              CHAOS
            </span>
          </div>
          <div className="text-2xl font-bold bg-white border-4 border-black px-8 py-4 transform rotate-1 shadow-[8px_8px_0_theme(colors.pink.400)] inline-block">
            {config.content.registry.message}
          </div>
        </motion.div>

        {/* Registry Grid */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16"
        >
          {registryLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, rotate: index % 2 === 0 ? -10 : 10 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: index % 2 === 0 ? 3 : -3,
                y: -10
              }}
              whileTap={{ scale: 0.95 }}
              className={`block bg-white border-8 border-black p-8 transform ${
                index % 2 === 0 ? 'rotate-2' : '-rotate-2'
              } shadow-[12px_12px_0_theme(colors.${
                ['pink.400', 'cyan.400', 'yellow.300', 'lime.500'][index % 4]
              })] hover:shadow-[16px_16px_0_theme(colors.${
                ['purple.600', 'orange.500', 'red.500', 'blue.600'][index % 4]
              })] transition-all duration-200 relative`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 ${
                    ['bg-pink-400', 'bg-cyan-400', 'bg-yellow-300', 'bg-lime-500'][index % 4]
                  } border-4 border-black flex items-center justify-center transform ${
                    index % 2 === 0 ? 'rotate-6' : '-rotate-6'
                  } shadow-[6px_6px_0_theme(colors.purple.600)]`}>
                    <Gift className="text-black" size={32} />
                  </div>
                  
                  <div>
                    <div className="text-3xl font-black text-black mb-1">
                      {link.name}
                    </div>
                    <div className="text-lg font-bold text-gray-600">
                      CLICK TO SHOP
                    </div>
                  </div>
                </div>
                
                <div className={`${
                  ['text-red-500', 'text-blue-600', 'text-purple-600', 'text-orange-500'][index % 4]
                }`}>
                  <ExternalLink size={32} />
                </div>
              </div>

              {/* Store Preview */}
              <div className={`${
                ['bg-pink-100', 'bg-cyan-100', 'bg-yellow-100', 'bg-lime-100'][index % 4]
              } border-4 border-black p-4 transform ${
                index % 2 === 0 ? '-rotate-1' : 'rotate-1'
              }`}>
                <div className="text-lg font-black text-purple-600 mb-2">
                  FEATURED CATEGORIES:
                </div>
                <div className="text-black font-bold">
                  Home • Kitchen • Decor • Electronics
                </div>
              </div>

              {/* Corner Decorations */}
              <div className={`absolute -top-3 -left-3 w-6 h-6 ${
                ['bg-cyan-400', 'bg-pink-400', 'bg-lime-500', 'bg-orange-500'][index % 4]
              } rounded-full border-4 border-black`} />
              <div className={`absolute -top-3 -right-3 w-8 h-8 ${
                ['bg-yellow-300', 'bg-purple-600', 'bg-red-500', 'bg-blue-600'][index % 4]
              } rotate-45 border-4 border-black`} />
              <div className={`absolute -bottom-3 -left-3 w-4 h-8 ${
                ['bg-lime-500', 'bg-orange-500', 'bg-pink-400', 'bg-cyan-400'][index % 4]
              } skew-x-12 border-4 border-black`} />
              <div className={`absolute -bottom-3 -right-3 w-6 h-6 ${
                ['bg-purple-600', 'bg-red-500', 'bg-blue-600', 'bg-yellow-300'][index % 4]
              } border-4 border-black`} />
            </motion.a>
          ))}
        </motion.div>

        {/* Wishlist Highlights */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
          className="bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-400 border-8 border-black p-8 transform rotate-1 shadow-[16px_16px_0_theme(colors.purple.600)] mb-16 max-w-4xl mx-auto relative"
        >
          <div className="text-center">
            <div className="text-4xl font-black text-black mb-6">
              WHAT WE'RE DREAMING OF:
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: '🏠', name: 'COLORFUL HOME', priority: 'HIGH' },
                { icon: '🍳', name: 'KITCHEN CHAOS', priority: 'MEDIUM' },
                { icon: '🎨', name: 'ART SUPPLIES', priority: 'HIGH' },
                { icon: '🌱', name: 'PLANT FRIENDS', priority: 'LOW' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                  className={`bg-white border-4 border-black p-4 text-center transform ${
                    i % 2 === 0 ? 'rotate-3' : '-rotate-3'
                  } shadow-[6px_6px_0_theme(colors.${
                    ['red.500', 'blue.600', 'green.400', 'orange.500'][i]
                  })]`}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-lg font-black text-black mb-1">{item.name}</div>
                  <div className={`text-sm font-bold ${
                    item.priority === 'HIGH' ? 'text-red-500' :
                    item.priority === 'MEDIUM' ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    {item.priority} PRIORITY
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rotate-45 border-4 border-black" />
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-blue-600 rounded-full border-4 border-black" />
          <div className="absolute -bottom-4 -left-4 w-6 h-12 bg-lime-500 skew-x-12 border-4 border-black" />
          <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-purple-600 border-4 border-black" />
        </motion.div>

        {/* Fun Message */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mb-12"
        >
          <div className="bg-orange-500 text-white text-2xl font-black px-8 py-4 transform -rotate-2 border-6 border-black shadow-[10px_10px_0_theme(colors.cyan.400)] inline-block">
            EVERY GIFT ADDS TO OUR GEOMETRIC HAPPINESS!
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5, type: "spring" }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: -8 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-400 text-black text-2xl font-black px-12 py-6 transform rotate-3 border-8 border-black shadow-[12px_12px_0_theme(colors.red.500)] hover:shadow-[16px_16px_0_theme(colors.purple.600)] transition-all duration-200"
            onClick={() => {
              document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            SPREAD THE LOVE! →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}