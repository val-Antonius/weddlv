export interface RSVP {
  id: string
  invitation_id: string
  name: string
  email: string
  phone: string | null
  attendance: boolean
  guest_count: number
  message: string | null
  created_at: string
}

export interface RSVPFormData {
  invitation_id: string
  name: string
  email: string
  phone?: string
  attendance: boolean
  guest_count: number
  message?: string
}

export interface GuestbookEntry {
  id: string
  invitation_id: string
  name: string
  message: string
  created_at: string
}

export interface GuestbookFormData {
  invitation_id: string
  name: string
  message: string
}
