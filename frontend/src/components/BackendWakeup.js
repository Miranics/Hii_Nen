'use client'

import { useEffect } from 'react'
import { wakeUpBackend } from '../lib/backend-wake'

export default function BackendWakeup() {
  useEffect(() => {
    // Wake up backend when app loads
    const initBackend = async () => {
      try {
        console.log('Initializing backend connection...')
        await wakeUpBackend()
        console.log('Backend initialization complete')
      } catch (error) {
        console.warn('Backend wake-up failed:', error.message)
        // Don't show error to user, just log it
      }
    }

    initBackend()
  }, [])

  // This component renders nothing but handles the side effect
  return null
}
