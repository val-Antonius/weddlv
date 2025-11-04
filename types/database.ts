export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      invitations: {
        Row: {
          id: string
          user_id: string
          slug: string
          config_json: Json
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          slug: string
          config_json: Json
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          slug?: string
          config_json?: Json
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      rsvps: {
        Row: {
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
        Insert: {
          id?: string
          invitation_id: string
          name: string
          email: string
          phone?: string | null
          attendance: boolean
          guest_count?: number
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          name?: string
          email?: string
          phone?: string | null
          attendance?: boolean
          guest_count?: number
          message?: string | null
          created_at?: string
        }
      }
      guestbook: {
        Row: {
          id: string
          invitation_id: string
          name: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          name: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          name?: string
          message?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
