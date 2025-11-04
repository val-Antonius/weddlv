export type TemplateType = 'simple-modern' | 'classic-elegant' | 'romantic-feminine'
export type EventType = 'akad' | 'reception' | 'other'
export type Language = 'en' | 'id'

export interface CoupleInfo {
  fullName: string
  nickname: string
  parents: string
  photo: string
}

export interface EventDetails {
  id: string
  type: EventType
  title: string
  date: string // ISO 8601 format
  time: string
  venue: string
  address: string
  mapsLink: string
}

export interface Gallery {
  photos: string[]
  videos?: string[]
}

export interface LoveStory {
  title: string
  content: string
}

export interface Music {
  url: string
  autoplay: boolean
}

export interface BankAccount {
  bankName: string
  accountNumber: string
  accountName: string
}

export interface Gift {
  enabled: boolean
  accounts: BankAccount[]
}

export interface InvitationSettings {
  showProtocolPopup: boolean
  enableGuestbook: boolean
  language: Language
}

export interface InvitationConfig {
  template: TemplateType
  couple: {
    bride: CoupleInfo
    groom: CoupleInfo
  }
  events: EventDetails[]
  gallery: Gallery
  loveStory?: LoveStory
  music?: Music
  gift?: Gift
  settings: InvitationSettings
}

export interface Invitation {
  id: string
  user_id: string
  slug: string
  config_json: InvitationConfig
  is_published: boolean
  created_at: string
  updated_at: string
}
