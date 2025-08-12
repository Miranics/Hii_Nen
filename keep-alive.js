// Keep-Alive Script for HiiNen Backend
// This script pings your backend every 10 minutes to prevent Render.com from sleeping

const BACKEND_URL = 'https://hiinen-backend.onrender.com';
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes
const HEALTH_ENDPOINT = '/api/health';

console.log('🚀 Starting HiiNen Keep-Alive Service...');
console.log('Backend URL:', BACKEND_URL);
console.log('Ping interval:', PING_INTERVAL / 1000, 'seconds');

let consecutiveFailures = 0;
const MAX_FAILURES = 3;

async function pingBackend() {
    const timestamp = new Date().toISOString();
    
    try {
        console.log(`\n⏰ [${timestamp}] Pinging backend...`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        const response = await fetch(`${BACKEND_URL}${HEALTH_ENDPOINT}`, {
            method: 'GET',
            signal: controller.signal,
            headers: {
                'User-Agent': 'HiiNen-KeepAlive/1.0'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
            const data = await response.json();
            console.log(`✅ Backend is alive: ${data.message || 'OK'}`);
            consecutiveFailures = 0;
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
    } catch (error) {
        consecutiveFailures++;
        console.error(`❌ Ping failed (${consecutiveFailures}/${MAX_FAILURES}):`, error.message);
        
        if (consecutiveFailures >= MAX_FAILURES) {
            console.log('🔄 Multiple failures detected, attempting to wake up service...');
            
            try {
                // Try multiple endpoints to wake up the service
                const wakeupEndpoints = [
                    '/api/health',
                    '/api/ai/chat',
                    '/api/user-progress'
                ];
                
                for (const endpoint of wakeupEndpoints) {
                    try {
                        await fetch(`${BACKEND_URL}${endpoint}`, {
                            method: 'HEAD',
                            timeout: 5000
                        });
                        console.log(`📡 Pinged ${endpoint}`);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } catch (e) {
                        // Ignore individual endpoint failures during wakeup
                    }
                }
                
                consecutiveFailures = 0; // Reset after wakeup attempt
                console.log('🔔 Wakeup sequence completed');
                
            } catch (wakeupError) {
                console.error('🚨 Wakeup failed:', wakeupError.message);
            }
        }
    }
}

// Initial ping
pingBackend();

// Set up interval
setInterval(pingBackend, PING_INTERVAL);

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Keep-alive service stopping...');
    process.exit(0);
});

console.log('✅ Keep-alive service started successfully!');
console.log('💡 Tip: Keep this script running to prevent your backend from sleeping');
console.log('📝 Press Ctrl+C to stop');
