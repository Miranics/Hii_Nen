# HiiNen Backend Server Troubleshooting Guide

## 🚨 Error: Failed to fetch

This error occurs when the frontend cannot connect to the backend server. Here's how to fix it:

## ✅ Solution Steps:

### 1. **Start the Backend Server Manually**

Open a new terminal/command prompt and run:

```bash
# Navigate to backend directory
cd "c:\Users\ALU Education\.vscode\Hii_Nen\backend"

# Start the server
node server.js
```

**Expected Output:**
```
🚀 HiiNen API Server running on port 5000
📍 Environment: development
🌐 Health check: http://localhost:5000/api/health
 Supabase connected successfully!
```

### 2. **Alternative Methods to Start Backend**

**Method A - Use npm start:**
```bash
cd "c:\Users\ALU Education\.vscode\Hii_Nen\backend"
npm start
```

**Method B - Use the batch file:**
```bash
# Double-click on: start-backend.bat
# Or run in terminal:
"c:\Users\ALU Education\.vscode\Hii_Nen\start-backend.bat"
```

**Method C - Use PowerShell script:**
```powershell
powershell -ExecutionPolicy Bypass -File "c:\Users\ALU Education\.vscode\Hii_Nen\start-backend.ps1"
```

### 3. **Verify Backend is Running**

Once started, you should see the backend status indicator in the demo page:
- 🟢 **Green**: HiiNen AI Online
- 🔴 **Red**: Backend Offline 
- 🟡 **Yellow**: Checking Backend...

### 4. **Test Backend Health**

Open your browser and visit: http://localhost:5000/api/health

**Expected Response:**
```json
{
  "success": true,
  "message": "HiiNen API is running!",
  "timestamp": "2025-07-19T...",
  "version": "1.0.0"
}
```

## 🔧 Troubleshooting Common Issues:

### Issue 1: Node.js not found
```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, download from: https://nodejs.org
```

### Issue 2: Port 5000 already in use
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue 3: Environment variables missing
Check that `backend\.env` file exists and contains:
```
GITHUB_TOKEN=your_github_token_here
SUPABASE_URL=https://bipmqxgwdxtksipqdrat.supabase.co
```

### Issue 4: Dependencies not installed
```bash
cd "c:\Users\ALU Education\.vscode\Hii_Nen\backend"
npm install
```

## 🎯 Quick Test:

1. Start backend server (see methods above)
2. Open frontend demo page
3. Look for green "HiiNen AI Online" indicator
4. Try chatting with HiiNen AI
5. If you see responses, the integration is working!

## 📝 Current AI Integration Status:

✅ Backend AI System: Fully configured with GitHub Models GPT-4.1
✅ Frontend Components: All updated to use real AI
✅ Error Handling: Improved with health checks
✅ Status Indicator: Added to demo page for debugging

**The issue is simply that the backend server needs to be started manually.**

## 🚀 Next Steps After Starting Backend:

1. Verify the green status indicator appears
2. Test AI chat in demo page
3. Check dashboard AI insights
4. Try idea validation with real AI analysis
5. Use mentorship chat for business guidance

All AI functionality will work once the backend server is running on port 5000!
