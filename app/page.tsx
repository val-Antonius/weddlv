import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Heart, Smartphone, BarChart3, Users, Star, ArrowRight, Leaf, Diamond, Sparkles } from 'lucide-react'
import Link from 'next/link'

const templates = [
  { 
    id: 1, 
    name: 'Floral Forest', 
    style: 'Natural', 
    price: 'Premium', 
    description: 'Organic woodland romance with emerald greens',
    gradient: 'from-emerald-100 to-amber-100',
    icon: Leaf,
    iconColor: 'text-emerald-600',
    demoUrl: '/demo/floral-forest'
  },
  { 
    id: 2, 
    name: 'Monochrome Vintage', 
    style: 'Classic', 
    price: 'Premium', 
    description: 'Timeless black & white Art Deco elegance',
    gradient: 'from-zinc-100 to-neutral-100',
    icon: Diamond,
    iconColor: 'text-zinc-900',
    demoUrl: '/demo/monochrome-vintage'
  },
  { 
    id: 3, 
    name: 'Colorful Love Joy', 
    style: 'Modern', 
    price: 'Premium', 
    description: 'Vibrant rainbow celebration of love',
    gradient: 'from-pink-200 via-purple-200 to-blue-200',
    icon: Sparkles,
    iconColor: 'text-pink-500',
    demoUrl: '/demo/colorful-love-joy'
  },
]

const testimonials = [
  { name: 'Sarah & Mike', text: 'Perfect for our eco-friendly wedding! Guests loved the interactive RSVP.', rating: 5 },
  { name: 'Emma & James', text: 'Saved us hundreds on printing. The analytics helped us plan better.', rating: 5 },
  { name: 'Lisa & David', text: 'So easy to customize. Our families could RSVP from anywhere.', rating: 5 },
]

const faqs = [
  { q: 'How does payment work?', a: 'Free templates are always free. Premium templates are one-time purchases with no recurring fees.' },
  { q: 'Can I make revisions?', a: 'Yes! Edit your invitation anytime before sending. Premium plans include unlimited revisions.' },
  { q: 'What\'s the timeline?', a: 'Create your invitation in minutes. Send immediately or schedule for later.' },
  { q: 'Is it mobile-friendly?', a: 'Absolutely! All invitations are optimized for mobile devices and tablets.' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 to-pink-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Beautiful Digital Wedding Invitations
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create stunning, eco-friendly wedding invitations with RSVP management, 
              guest analytics, and mobile-perfect design. No design skills required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                <Heart className="w-5 h-5 mr-2" />
                Create Your Invitation
              </Button>
              <Button size="lg" variant="outline">
                View Templates
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">Free templates available • No credit card required</p>
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Perfect Template</h2>
            <div className="flex justify-center gap-2 mb-8">
              <Badge variant="secondary">All Styles</Badge>
              <Badge variant="outline">Natural</Badge>
              <Badge variant="outline">Classic</Badge>
              <Badge variant="outline">Modern</Badge>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {templates.map((template) => {
              const IconComponent = template.icon
              return (
                <Card key={template.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className={`aspect-[4/3] bg-gradient-to-br ${template.gradient} flex items-center justify-center relative`}>
                    <div className="text-center p-6">
                      <IconComponent className={`w-16 h-16 ${template.iconColor} mx-auto mb-4`} />
                      <p className="text-sm text-gray-600 font-medium">Live Preview Available</p>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-700 hover:bg-white">
                      {template.price}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                      <Badge variant="outline" className="mb-3">
                        {template.style} Style
                      </Badge>
                      <p className="text-sm text-gray-600 leading-relaxed">{template.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={template.demoUrl} className="flex-1">
                        <Button className="w-full" variant="outline">
                          View Demo
                        </Button>
                      </Link>
                      <Button className="flex-1">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Choose the plan that fits your wedding needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <div className="text-3xl font-bold">$0</div>
                <p className="text-gray-600">Perfect for simple weddings</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />Basic templates</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />RSVP collection</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />Mobile responsive</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />Up to 50 guests</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">Get Started Free</Button>
              </CardContent>
            </Card>
            
            <Card className="border-rose-200 relative">
              <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-rose-600">Most Popular</Badge>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <div className="text-3xl font-bold">$29</div>
                <p className="text-gray-600">One-time payment</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />All premium templates</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />Unlimited guests</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />Guest analytics</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />Custom domain</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />Email notifications</li>
                </ul>
                <Button className="w-full mt-6 bg-rose-600 hover:bg-rose-700">Choose Premium</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold">$99</div>
                <p className="text-gray-600">For wedding planners</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />Everything in Premium</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />Multiple weddings</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />White-label options</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" />Priority support</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Loved by 10,000+ Couples</h2>
            <div className="flex justify-center items-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600">4.9/5 from 2,847 reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-gray-600">Powerful features to make your wedding planning effortless</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile-First Design</h3>
              <p className="text-gray-600">Perfect viewing experience on all devices. Your guests can RSVP from anywhere.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Guest Analytics</h3>
              <p className="text-gray-600">Track RSVPs in real-time. Get insights to plan your perfect day.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">RSVP Management</h3>
              <p className="text-gray-600">Automated RSVP collection with dietary preferences and plus-ones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Create Your Perfect Invitation?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of couples who chose digital for their special day</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-100">
              Start Creating Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-600">
              View All Templates
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
