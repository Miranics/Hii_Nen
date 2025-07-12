import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Debug logging
console.log('🔧 Supabase Client Config:')
console.log('URL:', supabaseUrl)
console.log('Key exists:', !!supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl)
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!supabaseAnonKey)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers with enhanced error handling
export const signUp = async (email, password, fullName, userType) => {
  console.log('🔄 Starting signup process...')
  console.log('Email:', email)
  console.log('Full Name:', fullName)
  console.log('User Type:', userType)
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: userType,
        },
      },
    })
    
    console.log('📤 Supabase signup response:')
    console.log('Data:', data)
    console.log('Error:', error)
    
    return { data, error }
  } catch (err) {
    console.error('💥 Signup catch error:', err)
    return { data: null, error: { message: err.message } }
  }
}

export const signIn = async (email, password) => {
  console.log('🔄 Starting signin process...')
  console.log('Email:', email)
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    console.log('📤 Supabase signin response:')
    console.log('Data:', data)
    console.log('Error:', error)
    
    return { data, error }
  } catch (err) {
    console.error('💥 Signin catch error:', err)
    return { data: null, error: { message: err.message } }
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  })
  
  return { data, error }
}

export const signInWithLinkedIn = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'linkedin',
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  })
  
  return { data, error }
}
