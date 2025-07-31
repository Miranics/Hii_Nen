// Simple script to wake up the backend service
export const wakeUpBackend = async () => {
  try {
    console.log('🔄 Attempting to wake up backend service...');
    
    const response = await fetch('https://hiinen-backend.onrender.com/api/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is awake:', data);
      return true;
    } else {
      console.log('⚠️ Backend responded but with error:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Failed to wake up backend:', error.message);
    return false;
  }
};

// Auto-wake backend when the app loads
if (typeof window !== 'undefined') {
  // Only run in browser
  setTimeout(wakeUpBackend, 1000);
}
