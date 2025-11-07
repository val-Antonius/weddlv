'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, CreditCard, Building, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Bank {
  name: string
  account: string
  holder: string
}

interface RegistrySectionProps {
  registry: {
    banks: Bank[]
  }
}

export function RegistrySection({ registry }: RegistrySectionProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const [selectedBank, setSelectedBank] = useState<string>('all')

  const copyToClipboard = async (text: string, accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAccount(accountNumber)
      setTimeout(() => setCopiedAccount(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const bankTypes = ['all', ...new Set(registry.banks.map(bank => bank.name.toLowerCase().split(' ')[0]))]
  
  const filteredBanks = selectedBank === 'all' 
    ? registry.banks 
    : registry.banks.filter(bank => bank.name.toLowerCase().includes(selectedBank))

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-stone-50 to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-emerald-800 mb-4">
            Wedding Registry
          </h2>
          <p className="font-inter text-lg text-emerald-700 max-w-2xl mx-auto">
            Your presence is the greatest gift, but if you wish to honor us with a gift, here are our preferred options
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Bank filter */}
        {bankTypes.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white rounded-2xl p-2 shadow-lg border-2 border-emerald-100">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-emerald-600 ml-2" />
                {bankTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedBank(type)}
                    className={`
                      px-4 py-2 rounded-xl font-inter text-sm transition-all duration-300
                      ${selectedBank === type
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-emerald-600 hover:bg-emerald-50'
                      }
                    `}
                  >
                    {type === 'all' ? 'All Banks' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bank accounts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBanks.map((bank, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-8 shadow-2xl shadow-emerald-200/30 border-2 border-emerald-100 hover:shadow-3xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-200">
                  <Building className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-playfair text-2xl text-emerald-800 mb-2">
                  {bank.name}
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-inter text-sm text-emerald-600 uppercase tracking-wide mb-1 block">
                    Account Holder
                  </label>
                  <p className="font-inter text-emerald-800 font-medium">
                    {bank.holder}
                  </p>
                </div>

                <div>
                  <label className="font-inter text-sm text-emerald-600 uppercase tracking-wide mb-1 block">
                    Account Number
                  </label>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-emerald-800 font-medium flex-1 bg-emerald-50 px-3 py-2 rounded-lg">
                      {bank.account}
                    </p>
                    <Button
                      onClick={() => copyToClipboard(bank.account, bank.account)}
                      className={`
                        p-2 rounded-lg transition-all duration-300
                        ${copiedAccount === bank.account
                          ? 'bg-green-100 text-green-600 hover:bg-green-100'
                          : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                        }
                      `}
                      variant="ghost"
                    >
                      {copiedAccount === bank.account ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </Button>
                  </div>
                  {copiedAccount === bank.account && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-600 text-sm mt-1 font-inter"
                    >
                      Copied to clipboard!
                    </motion.p>
                  )}
                </div>

                {/* Copy all info button */}
                <Button
                  onClick={() => copyToClipboard(
                    `${bank.name}\nAccount Holder: ${bank.holder}\nAccount Number: ${bank.account}`,
                    `${bank.name}-all`
                  )}
                  className={`
                    w-full mt-4 transition-all duration-300
                    ${copiedAccount === `${bank.name}-all`
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }
                  `}
                >
                  {copiedAccount === `${bank.name}-all` ? (
                    <div className="flex items-center gap-2">
                      <Check size={18} />
                      Copied All Info!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} />
                      Copy All Details
                    </div>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Thank you message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-emerald-200/30 border-2 border-emerald-100 max-w-3xl mx-auto">
            <h3 className="font-playfair text-2xl md:text-3xl text-emerald-800 mb-4">
              Thank You for Your Generosity
            </h3>
            <p className="font-inter text-emerald-700 leading-relaxed">
              Your love and support mean the world to us. Whether you choose to give a gift or simply share in our joy, 
              your presence in our lives is the greatest blessing we could ask for.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full mt-6"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}