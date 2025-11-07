'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, CreditCard, Award, Filter, Crown } from 'lucide-react'
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
    <section className="py-20 px-4 bg-gradient-to-b from-zinc-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-zinc-900 mb-6 tracking-wider">
            WEDDING REGISTRY
          </h2>
          <p className="font-crimson text-lg text-zinc-700 max-w-2xl mx-auto italic">
            Your gracious presence is gift enough, but should you wish to honor us further
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-32 h-px bg-zinc-900"></div>
            <Crown className="w-6 h-6 text-zinc-900" />
            <div className="w-32 h-px bg-zinc-900"></div>
          </div>
        </motion.div>

        {/* Bank filter */}
        {bankTypes.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="border-2 border-zinc-900 p-2 bg-white">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-zinc-900 ml-2" />
                {bankTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedBank(type)}
                    className={`
                      px-4 py-2 font-crimson text-sm transition-all duration-300 tracking-wide
                      ${selectedBank === type
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-900 hover:bg-zinc-100'
                      }
                    `}
                  >
                    {type === 'all' ? 'ALL BANKS' : type.toUpperCase()}
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
              className="border-2 border-zinc-900 p-8 bg-white drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300 relative"
            >
              {/* Corner decorations */}
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-white border border-zinc-900"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-white border border-zinc-900"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-white border border-zinc-900"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border border-zinc-900"></div>

              <div className="text-center mb-6">
                <div className="w-16 h-16 border-2 border-zinc-900 flex items-center justify-center mx-auto mb-4 bg-white">
                  <Award className="w-8 h-8 text-zinc-900" />
                </div>
                <h3 className="font-cinzel text-2xl text-zinc-900 mb-2 tracking-wide">
                  {bank.name}
                </h3>
                <div className="w-16 h-px bg-zinc-900 mx-auto"></div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-crimson text-sm text-zinc-700 uppercase tracking-wider mb-1 block">
                    Account Holder
                  </label>
                  <p className="font-crimson text-zinc-900 font-semibold">
                    {bank.holder}
                  </p>
                </div>

                <div>
                  <label className="font-crimson text-sm text-zinc-700 uppercase tracking-wider mb-1 block">
                    Account Number
                  </label>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-zinc-900 font-medium flex-1 bg-zinc-50 px-3 py-2 border border-zinc-900">
                      {bank.account}
                    </p>
                    <Button
                      onClick={() => copyToClipboard(bank.account, bank.account)}
                      className={`
                        p-2 border border-zinc-900 transition-all duration-300
                        ${copiedAccount === bank.account
                          ? 'bg-zinc-900 text-white hover:bg-zinc-800'
                          : 'bg-white text-zinc-900 hover:bg-zinc-100'
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
                      className="text-zinc-900 text-sm mt-1 font-crimson"
                    >
                      Copied successfully
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
                    w-full mt-4 transition-all duration-300 border-2 border-zinc-900 font-crimson tracking-wide
                    ${copiedAccount === `${bank.name}-all`
                      ? 'bg-zinc-900 hover:bg-zinc-800 text-white'
                      : 'bg-white hover:bg-zinc-100 text-zinc-900'
                    }
                  `}
                >
                  {copiedAccount === `${bank.name}-all` ? (
                    <div className="flex items-center gap-2">
                      <Check size={18} />
                      ALL DETAILS COPIED
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} />
                      COPY ALL DETAILS
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
          <div className="border-2 border-zinc-900 p-8 md:p-12 bg-white drop-shadow-2xl max-w-3xl mx-auto relative">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-r border-b border-zinc-900"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-zinc-900"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-r border-t border-zinc-900"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-l border-t border-zinc-900"></div>
            
            <h3 className="font-cinzel text-2xl md:text-3xl text-zinc-900 mb-4 tracking-wide">
              WITH DEEPEST GRATITUDE
            </h3>
            <p className="font-crimson text-zinc-700 leading-relaxed italic">
              Your generosity and thoughtfulness are treasured beyond measure. Whether you choose to bestow a gift 
              or simply grace us with your presence, your place in our hearts remains invaluable.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-24 h-px bg-zinc-900"></div>
              <div className="w-2 h-2 bg-zinc-900 rotate-45"></div>
              <div className="w-24 h-px bg-zinc-900"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}