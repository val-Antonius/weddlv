-- ============================================================================
-- WEDDLV - Digital Wedding Invitation Platform
-- Database Schema with Row Level Security (RLS)
-- ============================================================================

-- ============================================================================
-- TABLE: users
-- Purpose: Store admin user information linked to Supabase Auth
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================================
-- TABLE: invitations
-- Purpose: Store wedding invitation configurations
-- ============================================================================
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  config_json JSONB NOT NULL,
  is_published BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT slug_length CHECK (char_length(slug) >= 3 AND char_length(slug) <= 50)
);

-- Indexes for invitations table
CREATE INDEX IF NOT EXISTS idx_invitations_slug ON invitations(slug);
CREATE INDEX IF NOT EXISTS idx_invitations_user_id ON invitations(user_id);
CREATE INDEX IF NOT EXISTS idx_invitations_is_published ON invitations(is_published);
CREATE INDEX IF NOT EXISTS idx_invitations_created_at ON invitations(created_at DESC);

-- GIN index for JSONB queries
CREATE INDEX IF NOT EXISTS idx_invitations_config_json ON invitations USING GIN (config_json);

-- Enable RLS on invitations table
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for invitations table
CREATE POLICY "Anyone can view published invitations"
  ON invitations FOR SELECT
  USING (is_published = true);

CREATE POLICY "Users can view own invitations"
  ON invitations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own invitations"
  ON invitations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own invitations"
  ON invitations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own invitations"
  ON invitations FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- TABLE: rsvps
-- Purpose: Store guest RSVP responses
-- ============================================================================
CREATE TABLE IF NOT EXISTS rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone TEXT,
  attendance BOOLEAN NOT NULL,
  guest_count INTEGER DEFAULT 1 NOT NULL CHECK (guest_count >= 1 AND guest_count <= 10),
  message TEXT CHECK (char_length(message) <= 500),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_email_per_invitation UNIQUE(invitation_id, email)
);

-- Indexes for rsvps table
CREATE INDEX IF NOT EXISTS idx_rsvps_invitation_id ON rsvps(invitation_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_email ON rsvps(email);
CREATE INDEX IF NOT EXISTS idx_rsvps_attendance ON rsvps(attendance);
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps(created_at DESC);

-- Enable RLS on rsvps table
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rsvps table
CREATE POLICY "Anyone can insert RSVP"
  ON rsvps FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Invitation owners can view RSVPs"
  ON rsvps FOR SELECT
  USING (
    invitation_id IN (
      SELECT id FROM invitations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Invitation owners can update RSVPs"
  ON rsvps FOR UPDATE
  USING (
    invitation_id IN (
      SELECT id FROM invitations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Invitation owners can delete RSVPs"
  ON rsvps FOR DELETE
  USING (
    invitation_id IN (
      SELECT id FROM invitations WHERE user_id = auth.uid()
    )
  );

-- ============================================================================
-- TABLE: guestbook
-- Purpose: Store guestbook messages from wedding guests
-- ============================================================================
CREATE TABLE IF NOT EXISTS guestbook (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  message TEXT NOT NULL CHECK (char_length(message) >= 5 AND char_length(message) <= 500),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for guestbook table
CREATE INDEX IF NOT EXISTS idx_guestbook_invitation_id ON guestbook(invitation_id);
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at ON guestbook(created_at DESC);

-- Enable RLS on guestbook table
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- RLS Policies for guestbook table
CREATE POLICY "Anyone can insert guestbook message"
  ON guestbook FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view guestbook messages"
  ON guestbook FOR SELECT
  USING (true);

CREATE POLICY "Invitation owners can delete guestbook messages"
  ON guestbook FOR DELETE
  USING (
    invitation_id IN (
      SELECT id FROM invitations WHERE user_id = auth.uid()
    )
  );

-- ============================================================================
-- FUNCTIONS: Automatic timestamp updates
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for invitations table
CREATE TRIGGER update_invitations_updated_at
  BEFORE UPDATE ON invitations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS: Automatic user creation on signup
-- ============================================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic user creation (drop if exists first)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- STORAGE: Setup for invitation media
-- ============================================================================
-- Create storage bucket for invitation media (run this in Supabase Dashboard)
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('invitation-media', 'invitation-media', true);

-- Storage policies for invitation media
-- CREATE POLICY "Authenticated users can upload media"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'invitation-media' 
--     AND auth.role() = 'authenticated'
--   );

-- CREATE POLICY "Anyone can view media"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'invitation-media');

-- CREATE POLICY "Users can update own media"
--   ON storage.objects FOR UPDATE
--   USING (
--     bucket_id = 'invitation-media' 
--     AND auth.uid()::text = (storage.foldername(name))[1]
--   );

-- CREATE POLICY "Users can delete own media"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'invitation-media' 
--     AND auth.uid()::text = (storage.foldername(name))[1]
--   );

-- ============================================================================
-- VIEWS: Useful views for analytics and reporting
-- ============================================================================

-- View: RSVP Statistics per Invitation
CREATE OR REPLACE VIEW invitation_rsvp_stats AS
SELECT 
  i.id AS invitation_id,
  i.slug,
  i.user_id,
  COUNT(r.id) AS total_rsvps,
  COUNT(r.id) FILTER (WHERE r.attendance = true) AS attending_count,
  COUNT(r.id) FILTER (WHERE r.attendance = false) AS not_attending_count,
  COALESCE(SUM(r.guest_count) FILTER (WHERE r.attendance = true), 0) AS total_guests
FROM invitations i
LEFT JOIN rsvps r ON i.id = r.invitation_id
GROUP BY i.id, i.slug, i.user_id;

-- View: Guestbook message count per Invitation
CREATE OR REPLACE VIEW invitation_guestbook_stats AS
SELECT 
  i.id AS invitation_id,
  i.slug,
  COUNT(g.id) AS total_messages
FROM invitations i
LEFT JOIN guestbook g ON i.id = g.invitation_id
GROUP BY i.id, i.slug;

-- ============================================================================
-- SAMPLE DATA (Optional - for development/testing)
-- ============================================================================
-- Uncomment to insert sample data

-- INSERT INTO users (id, email, role) VALUES
-- ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'demo@weddlv.com', 'admin');

-- ============================================================================
-- VERIFICATION QUERIES
-- Run these to verify your setup
-- ============================================================================

-- Check if all tables exist
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- AND table_name IN ('users', 'invitations', 'rsvps', 'guestbook');

-- Check if RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables 
-- WHERE schemaname = 'public' 
-- AND tablename IN ('users', 'invitations', 'rsvps', 'guestbook');

-- Check all indexes
-- SELECT tablename, indexname FROM pg_indexes 
-- WHERE schemaname = 'public' 
-- ORDER BY tablename, indexname;

-- Check all policies
-- SELECT tablename, policyname, cmd FROM pg_policies 
-- WHERE schemaname = 'public' 
-- ORDER BY tablename, policyname;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
