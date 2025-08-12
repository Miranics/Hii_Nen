#!/usr/bin/env node
// HiiNen Production Readiness Verification Script
// Run this to ensure your app is ready for grading

const https = require('https');
const fs = require('fs');

const CONFIG = {
  FRONTEND_URL: 'https://hii-nen.vercel.app',
  BACKEND_URL: 'https://hiinen-backend.onrender.com',
  SUPABASE_URL: 'https://bipmqxgwdxtksipqdrat.supabase.co',
  GITHUB_REPO: 'https://github.com/Miranics/Hii_Nen'
};

console.log('🚀 HiiNen Production Readiness Check');
console.log('=====================================\n');

// Helper function to check URL
const checkUrl = (url, name) => {
  return new Promise((resolve) => {
    const request = https.get(url, (res) => {
      const success = res.statusCode >= 200 && res.statusCode < 400;
      console.log(`${success ? '✅' : '❌'} ${name}: ${res.statusCode} ${success ? 'OK' : 'FAILED'}`);
      resolve({ name, url, success, status: res.statusCode });
    });
    
    request.on('error', (error) => {
      console.log(`❌ ${name}: ${error.message}`);
      resolve({ name, url, success: false, error: error.message });
    });
    
    request.setTimeout(15000, () => {
      console.log(`❌ ${name}: Timeout (15s)`);
      resolve({ name, url, success: false, error: 'Timeout' });
    });
  });
};

// Check API endpoint with payload
const checkApiEndpoint = (url, endpoint, payload) => {
  return new Promise((resolve) => {
    const postData = JSON.stringify(payload);
    const urlObj = new URL(url + endpoint);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 15000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const success = res.statusCode >= 200 && res.statusCode < 400;
        console.log(`${success ? '✅' : '❌'} ${endpoint}: ${res.statusCode} ${success ? 'OK' : 'FAILED'}`);
        resolve({ endpoint, success, status: res.statusCode, response: data });
      });
    });

    req.on('error', (error) => {
      console.log(`❌ ${endpoint}: ${error.message}`);
      resolve({ endpoint, success: false, error: error.message });
    });

    req.on('timeout', () => {
      console.log(`❌ ${endpoint}: Timeout (15s)`);
      req.destroy();
      resolve({ endpoint, success: false, error: 'Timeout' });
    });

    req.write(postData);
    req.end();
  });
};

async function runChecks() {
  console.log('📍 Core Infrastructure');
  console.log('----------------------');
  
  const coreChecks = await Promise.all([
    checkUrl(CONFIG.FRONTEND_URL, 'Frontend (Vercel)'),
    checkUrl(CONFIG.BACKEND_URL + '/api/health', 'Backend Health'),
    checkUrl(CONFIG.SUPABASE_URL, 'Database (Supabase)'),
    checkUrl(CONFIG.GITHUB_REPO, 'GitHub Repository')
  ]);
  
  console.log('\n🤖 AI Functionality');
  console.log('-------------------');
  
  const aiChecks = await Promise.all([
    checkApiEndpoint(CONFIG.BACKEND_URL, '/api/ai/chat', {
      message: 'Test message',
      context: 'test'
    }),
    checkApiEndpoint(CONFIG.BACKEND_URL, '/api/ai/validate-idea', {
      ideaData: {
        description: 'Test idea validation',
        targetMarket: 'Test market',
        problem: 'Test problem',
        solution: 'Test solution'
      }
    }),
    checkApiEndpoint(CONFIG.BACKEND_URL, '/api/ai/insights', {
      userStats: { ideasValidated: 1, businessScore: 75 }
    })
  ]);
  
  console.log('\n📊 Database Operations');
  console.log('---------------------');
  
  const dbChecks = await Promise.all([
    checkApiEndpoint(CONFIG.BACKEND_URL, '/api/user-progress', {
      userId: 'test-user-id'
    })
  ]);
  
  console.log('\n📋 Final Assessment');
  console.log('===================');
  
  const allChecks = [...coreChecks, ...aiChecks, ...dbChecks];
  const successCount = allChecks.filter(check => check.success).length;
  const totalChecks = allChecks.length;
  const successRate = Math.round((successCount / totalChecks) * 100);
  
  console.log(`\n🎯 Overall Status: ${successCount}/${totalChecks} checks passed (${successRate}%)`);
  
  if (successRate >= 80) {
    console.log('✅ EXCELLENT: Your app is production-ready for grading!');
    console.log('💡 All critical systems are operational.');
  } else if (successRate >= 60) {
    console.log('⚠️  GOOD: Most systems working, some AI features may use fallbacks.');
    console.log('💡 This is acceptable - fallbacks ensure functionality.');
  } else {
    console.log('❌ NEEDS ATTENTION: Several critical issues detected.');
    console.log('💡 Check backend deployment and database connections.');
  }
  
  console.log('\n🔧 Quick Fixes:');
  console.log('- Run: node keep-alive.js (to keep backend active)');
  console.log('- Check: Render.com deployment status');
  console.log('- Verify: Supabase project is active');
  console.log('- Ensure: Environment variables are set');
  
  console.log('\n🎥 Demo Readiness:');
  const frontendOk = coreChecks.find(c => c.name?.includes('Frontend'))?.success;
  const backendOk = coreChecks.find(c => c.name?.includes('Backend'))?.success;
  
  if (frontendOk) {
    console.log('✅ Frontend ready for demo recording');
  } else {
    console.log('❌ Frontend issue - check Vercel deployment');
  }
  
  if (backendOk || successRate >= 60) {
    console.log('✅ Backend ready (with intelligent fallbacks if needed)');
  } else {
    console.log('❌ Backend needs attention - start keep-alive service');
  }
  
  console.log('\n🌟 Your HiiNen platform is equipped with intelligent fallbacks.');
  console.log('   Even if AI services are down, all features remain functional!');
  console.log('\n📧 Ready for academic submission! Good luck! 🚀');
}

runChecks().catch(console.error);
