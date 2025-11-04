'use client'

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Palette, Sparkles } from 'lucide-react'
import type { InvitationConfigFormValues } from '@/lib/validations'

interface StepDesignProps {
  form: ReturnType<typeof useFormContext<InvitationConfigFormValues>>
}

const TEMPLATES = [
  {
    id: 'simple-modern',
    name: 'Simple Modern',
    description: 'Clean and minimalist design with modern typography',
    preview: '/templates/simple-modern.jpg',
    features: ['Minimalist', 'Responsive', 'Fast Loading', 'Typography Focus'],
    colors: ['Neutral', 'Black & White', 'Monochrome'],
  },
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    description: 'Traditional wedding invitation with elegant elements',
    preview: '/templates/classic-elegant.jpg',
    features: ['Traditional', 'Decorative', 'Timeless', 'Sophisticated'],
    colors: ['Gold', 'Cream', 'Burgundy', 'Navy'],
  },
  {
    id: 'romantic-feminine',
    name: 'Romantic Feminine',
    description: 'Soft and romantic design with floral elements',
    preview: '/templates/romantic-feminine.jpg',
    features: ['Floral', 'Soft Colors', 'Romantic', 'Delicate'],
    colors: ['Pink', 'Rose Gold', 'Lavender', 'Mint'],
  },
]

export function StepDesign({ form }: StepDesignProps) {
  const {
    watch,
    setValue,
    formState: { errors }
  } = form

  const selectedTemplate = watch('template')

  const handleTemplateSelect = (templateId: string) => {
    setValue('template', templateId as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Choose Your Template</h3>
        <p className="text-muted-foreground">
          Select a design that matches your wedding style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((template) => {
          const isSelected = selectedTemplate === template.id
          
          return (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:ring-1 hover:ring-primary/50'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {isSelected && <Sparkles className="h-4 w-4 text-primary" />}
                      {template.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {template.description}
                    </p>
                  </div>
                  {isSelected && (
                    <Badge variant="default">Selected</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Template Preview */}
                <div className="relative">
                  <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Palette className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">Template Preview</p>
                      <Badge variant="outline">{template.name}</Badge>
                    </div>
                  </div>
                  
                  {/* Template Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge 
                      variant={isSelected ? "default" : "secondary"} 
                      className="text-xs"
                    >
                      {template.id}
                    </Badge>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Color Scheme */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Color Scheme</h4>
                  <div className="flex flex-wrap gap-1">
                    {template.colors.map((color) => (
                      <Badge key={color} variant="secondary" className="text-xs">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="text-center pt-2 border-t">
                    <p className="text-sm text-primary font-medium">
                      ✓ This template is selected
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Template Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Template Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  {TEMPLATES.map((template) => (
                    <th key={template.id} className="text-center p-2">
                      {template.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Style</td>
                  {TEMPLATES.map((template) => (
                    <td key={template.id} className="text-center p-2">
                      {template.name.includes('Simple') ? 'Minimalist' :
                       template.name.includes('Classic') ? 'Traditional' : 'Romantic'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Best For</td>
                  {TEMPLATES.map((template) => (
                    <td key={template.id} className="text-center p-2 text-xs">
                      {template.id === 'simple-modern' ? 'Modern Couples' :
                       template.id === 'classic-elegant' ? 'Traditional Weddings' : 'Romantic Couples'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 font-medium">Loading Speed</td>
                  {TEMPLATES.map((template) => (
                    <td key={template.id} className="text-center p-2">
                      {template.id === 'simple-modern' ? '⚡ Fast' : '🐢 Normal'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Choosing the Right Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <h4 className="font-medium">Consider Your Theme</h4>
              <p>Match the template to your wedding theme, venue, and overall style.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Think About Your Guests</h4>
              <p>Choose a design that will appeal to your guests and be easy to read.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Mobile Experience</h4>
              <p>All templates are mobile-optimized, but simpler designs load faster.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Customization</h4>
              <p>You can always switch templates later, so don't worry about making the perfect choice now.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
