-- HiiNen Database Schema for Supabase (Corrected Version)
-- Run this in your Supabase SQL Editor

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('entrepreneur', 'mentor', 'both')),
  avatar_url TEXT,
  bio TEXT,
  skills TEXT[],
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'expert')),
  industry TEXT,
  location TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ideas table
CREATE TABLE IF NOT EXISTS ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  industry TEXT,
  stage TEXT CHECK (stage IN ('concept', 'validation', 'development', 'launch', 'scaling')),
  funding_needed DECIMAL,
  team_size INTEGER DEFAULT 1,
  looking_for TEXT[], -- ['mentor', 'co-founder', 'funding', 'advisor']
  skills_needed TEXT[],
  tags TEXT[],
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentorship_requests table
CREATE TABLE IF NOT EXISTS mentorship_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entrepreneur_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mentor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(entrepreneur_id, mentor_id, idea_id)
);

-- Create mentor_expertise table
CREATE TABLE IF NOT EXISTS mentor_expertise (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill TEXT NOT NULL,
  experience_years INTEGER,
  expertise_level TEXT CHECK (expertise_level IN ('beginner', 'intermediate', 'expert')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(mentor_id, skill)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('mentorship_request', 'mentorship_accepted', 'new_idea', 'system')),
  read BOOLEAN DEFAULT false,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ideas_updated_at BEFORE UPDATE ON ideas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentorship_requests_updated_at BEFORE UPDATE ON mentorship_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security Policies

-- User profiles: users can only see their own profile and public profiles of others
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Ideas: public ideas are viewable by all, private ideas only by owner
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public ideas are viewable by everyone" ON ideas FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users can create their own ideas" ON ideas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ideas" ON ideas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ideas" ON ideas FOR DELETE USING (auth.uid() = user_id);

-- Mentorship requests: visible to both parties
ALTER TABLE mentorship_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Mentorship requests visible to involved parties" ON mentorship_requests FOR SELECT USING (auth.uid() = entrepreneur_id OR auth.uid() = mentor_id);
CREATE POLICY "Entrepreneurs can create mentorship requests" ON mentorship_requests FOR INSERT WITH CHECK (auth.uid() = entrepreneur_id);
CREATE POLICY "Mentors can update mentorship requests" ON mentorship_requests FOR UPDATE USING (auth.uid() = mentor_id);

-- Mentor expertise: public readable, only mentor can modify
ALTER TABLE mentor_expertise ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Mentor expertise publicly readable" ON mentor_expertise FOR SELECT TO authenticated USING (true);
CREATE POLICY "Mentors can manage their expertise" ON mentor_expertise FOR ALL USING (auth.uid() = mentor_id);

-- Notifications: users can only see their own notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, user_type)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    COALESCE(new.raw_user_meta_data->>'user_type', 'entrepreneur')
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample data (optional)
-- You can run this after your first user signup to test

-- Sample ideas (will be inserted after real users sign up)
/*
INSERT INTO ideas (user_id, title, description, industry, stage, funding_needed, looking_for, skills_needed, tags) VALUES
('user-id-here', 'AI-Powered Recipe Assistant', 'An app that suggests recipes based on ingredients you have at home', 'Food Tech', 'concept', 50000, ARRAY['mentor', 'co-founder'], ARRAY['React Native', 'AI/ML', 'Backend'], ARRAY['ai', 'food', 'mobile']);
*/
