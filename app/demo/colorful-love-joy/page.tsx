import { ColorfulLoveJoyTemplate, sampleColorfulLoveJoyConfig } from '@/components/invitations/templates/colorful-love-joy'

export default function ColorfulLoveJoyDemo() {
  return (
    <div className="min-h-screen">
      <ColorfulLoveJoyTemplate config={sampleColorfulLoveJoyConfig} />
    </div>
  )
}

export const metadata = {
  title: 'Colorful Love Joy Wedding Invitation - Demo',
  description: 'A vibrant, cheerful, modern celebration wedding invitation template with joyful, festive, youthful energy and modern romance.',
}