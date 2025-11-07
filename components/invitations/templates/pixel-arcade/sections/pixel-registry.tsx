'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Gift } from 'lucide-react'
import { PixelArcadeConfig } from '../pixel-arcade-template'

interface PixelRegistryProps {
  config: PixelArcadeConfig
}

export function PixelRegistry({ config }: PixelRegistryProps) {
  const registryLinks = config.content.registry.links.length > 0 
    ? config.content.registry.links 
    : [
        { name: 'AMAZON', url: '#' },
        { name: 'TARGET', url: '#' },
        { name: 'BEST BUY', url: '#' },
        { name: 'WALMART', url: '#' }
      ]

  return (
    <section id="registry" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black py-20 relative">
      {/* Floating Power-ups */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {['🎁', '💎', '⭐', '🏆', '💰'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="bg-yellow-300 text-gray-900 px-6 py-2 inline-block font-bold text-lg mb-4 border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.orange.500)]">
            🎮 POWER-UP SHOP
          </div>
          <div className="text-4xl font-bold text-cyan-400 mb-4" style={{
            textShadow: '4px 4px 0px #ff00ff'
          }}>
            WEDDING REGISTRY
          </div>
          <div className="text-xl text-lime-400 font-mono">
            {config.content.registry.message}
          </div>
        </motion.div>

        {/* Shop Interface */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-gray-800 border-4 border-cyan-400 shadow-[12px_12px_0px_0px_theme(colors.purple.500)]"
        >
          {/* Shop Header */}
          <div className="bg-indigo-900 border-b-4 border-cyan-400 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Gift className="text-yellow-300" size={32} />
                <div>
                  <div className="text-2xl font-bold text-yellow-300 font-mono">
                    GIFT SHOP
                  </div>
                  <div className="text-cyan-400 font-mono text-sm">
                    SELECT YOUR POWER-UP
                  </div>
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-yellow-300">COINS:</div>
                <div className="text-2xl text-lime-400 font-bold">∞</div>
              </div>
            </div>
          </div>

          {/* Registry Items Grid */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {registryLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="block bg-purple-900 border-4 border-magenta-500 p-6 shadow-[6px_6px_0px_0px_theme(colors.purple.700)] hover:shadow-[8px_8px_0px_0px_theme(colors.purple.700)] transition-all duration-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Store Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-magenta-500 border-4 border-white flex items-center justify-center">
                        <div className="text-2xl font-bold text-white">
                          {link.name.charAt(0)}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xl font-bold text-magenta-500 font-mono mb-1">
                          {link.name}
                        </div>
                        <div className="text-cyan-400 font-mono text-sm">
                          CLICK TO VISIT STORE
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-yellow-300">
                      <ExternalLink size={24} />
                    </div>
                  </div>

                  {/* Item Preview */}
                  <div className="mt-4 bg-black border-2 border-gray-600 p-3">
                    <div className="text-lime-400 font-mono text-xs mb-1">
                      FEATURED ITEMS:
                    </div>
                    <div className="text-white font-mono text-sm">
                      Kitchen • Home • Electronics • More
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Special Items Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-black border-4 border-yellow-300 p-6 mb-6"
            >
              <div className="text-center">
                <div className="text-yellow-300 font-bold font-mono text-xl mb-4">
                  🌟 LEGENDARY ITEMS 🌟
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: '🏠', name: 'HOME BASE', rarity: 'EPIC' },
                    { icon: '🚗', name: 'VEHICLE', rarity: 'RARE' },
                    { icon: '💍', name: 'RINGS', rarity: 'LEGENDARY' },
                    { icon: '🌙', name: 'HONEYMOON', rarity: 'MYTHIC' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        boxShadow: [
                          '0 0 10px #ffff00',
                          '0 0 20px #ff00ff',
                          '0 0 10px #ffff00'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="bg-gray-800 border-2 border-white p-3 text-center"
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <div className="text-white font-mono text-xs mb-1">
                        {item.name}
                      </div>
                      <div className={`text-xs font-mono font-bold ${
                        item.rarity === 'MYTHIC' ? 'text-red-400' :
                        item.rarity === 'LEGENDARY' ? 'text-yellow-300' :
                        item.rarity === 'EPIC' ? 'text-purple-400' : 'text-blue-400'
                      }`}>
                        {item.rarity}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-indigo-900 border-4 border-lime-400 p-4 text-center font-mono"
            >
              <div className="text-lime-400 font-bold mb-2">
                💡 HOW TO PLAY:
              </div>
              <div className="text-cyan-400 text-sm">
                Click on any store above to browse our wishlist and help us level up our new life together!
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white px-8 py-4 text-xl font-bold border-4 border-white shadow-[4px_4px_0px_0px_theme(colors.red.700)] hover:shadow-[6px_6px_0px_0px_theme(colors.red.700)] transition-all duration-100 font-mono"
            onClick={() => {
              document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            CONTINUE QUEST →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}