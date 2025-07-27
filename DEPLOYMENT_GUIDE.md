# HiiNen Deployment Guide

##  Quick Deployment Steps

### Prerequisites
1. Sign up for [Vercel](https://vercel.com) with GitHub
2. Sign up for [Render](https://render.app) with GitHub
3. Have your Supabase and GitHub tokens ready

---

## 📱 Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `Hii_Nen` repository
3. Select the `frontend` folder as root directory
4. Click "Deploy"

### Step 2: Add Environment Variables
In Vercel dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key  
NEXT_PUBLIC_API_URL = your_railway_backend_url
```

---

## Backend Deployment (Railway)

### Step 1: Deploy to Railway
1. Go to [railway.app/new](https://railway.app/new)
2. Select "Deploy from GitHub repo"
3. Choose your `Hii_Nen` repository
4. Select the `backend` folder
5. Click "Deploy"

### Step 2: Add Environment Variables
In Railway dashboard → Variables:
```
SUPABASE_URL = your_supabase_url
SUPABASE_ANON_KEY = your_supabase_anon_key
SUPABASE_SERVICE_KEY = your_supabase_service_key
GITHUB_TOKEN = your_github_models_token
FRONTEND_URL = your_vercel_frontend_url
```

---

## 🔗 Final Configuration

### Step 3: Update API URLs
1. Copy your Railway app URL (e.g., `https://your-app.railway.app`)
2. Add it to Vercel's `NEXT_PUBLIC_API_URL`
3. Copy your Vercel app URL (e.g., `https://your-app.vercel.app`)
4. Add it to Railway's `FRONTEND_URL`

### Step 4: Redeploy
- Vercel: Auto-redeploys on environment variable changes
- Railway: Click "Deploy" button or push to GitHub

---

## ✅ Verification

Test these URLs:
- Frontend: `https://your-app.vercel.app`
- Backend Health: `https://your-app.railway.app/api/health`
- AI Integration: Use the chat widget on dashboard

---

## Post-Deployment

1. **Custom Domains** (Optional): Add your own domain in both platforms
2. **Analytics**: Enable Vercel Analytics for insights
3. **Monitoring**: Use Railway's built-in monitoring
4. **SSL**: Both platforms provide automatic HTTPS

Your HiiNen app will be live and scalable! 🚀
