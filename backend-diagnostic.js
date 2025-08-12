// Backend Diagnostic Script
// Run this to test backend connectivity and diagnose issues

const API_BASE = 'https://hiinen-backend.onrender.com';

async function testEndpoint(endpoint, method = 'GET', data = null) {
  console.log(`\n🔍 Testing ${method} ${endpoint}`);
  
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    };
    
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    
    const start = Date.now();
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const duration = Date.now() - start;
    
    console.log(`✅ Status: ${response.status} ${response.statusText}`);
    console.log(`⏱️ Duration: ${duration}ms`);
    
    if (response.ok) {
      const result = await response.json();
      console.log(`📄 Response:`, JSON.stringify(result, null, 2));
      return { success: true, data: result, duration };
    } else {
      const error = await response.text();
      console.log(`❌ Error:`, error);
      return { success: false, error, duration };
    }
    
  } catch (error) {
    console.log(`💥 Network Error:`, error.message);
    return { success: false, error: error.message };
  }
}

async function runDiagnostics() {
  console.log('🚀 Starting HiiNen Backend Diagnostics');
  console.log(`🌐 Target: ${API_BASE}`);
  console.log(`🕒 Time: ${new Date().toISOString()}`);
  
  // Test 1: Health Check
  await testEndpoint('/api/health');
  
  // Test 2: AI Chat endpoint
  await testEndpoint('/api/ai/chat', 'POST', {
    message: 'Hello, this is a diagnostic test.',
    context: { type: 'diagnostic' }
  });
  
  // Test 3: AI Insights endpoint 
  await testEndpoint('/api/ai/insights', 'POST', {
    userData: { testUser: true },
    requestType: 'diagnostic'
  });
  
  // Test 4: Multiple rapid requests (stress test)
  console.log('\n🔥 Stress Testing (3 rapid requests)');
  const promises = [];
  for (let i = 0; i < 3; i++) {
    promises.push(testEndpoint('/api/health'));
  }
  
  const results = await Promise.allSettled(promises);
  console.log('Stress test results:', results.map(r => r.status));
  
  console.log('\n✅ Diagnostics Complete');
}

// Run diagnostics if this is run directly
if (typeof window === 'undefined') {
  runDiagnostics().catch(console.error);
}

// Export for browser use
if (typeof window !== 'undefined') {
  window.runBackendDiagnostics = runDiagnostics;
  console.log('🔧 Backend diagnostics loaded. Run: runBackendDiagnostics()');
}
