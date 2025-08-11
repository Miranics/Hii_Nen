Write-Host "🚀 Starting HiiNen Backend Server..." -ForegroundColor Green
Write-Host ""

# Change to backend directory
Push-Location "backend"

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Start the server
Write-Host "🌐 Starting server on http://localhost:5000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

try {
    npm start
} catch {
    Write-Host "❌ Failed to start server. Check if Node.js is installed." -ForegroundColor Red
} finally {
    Pop-Location
}
