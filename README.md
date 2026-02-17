# V 19+ OTT Platform

> A premium, Netflix-style OTT streaming platform built with React, Vite, Tailwind CSS, and Supabase.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D20.16-brightgreen)](https://nodejs.org/)

## ✨ Features

- 🎥 **Cinematic UI** - Custom black & orange theme with smooth Framer Motion animations
- 🔐 **Authentication** - Email (Magic Link), Google OAuth, and OTP login via Supabase
- 🎬 **Video Player** - Custom player with skip intro, quality control, and autoplay
- 💳 **Subscriptions** - Integrated Razorpay payment flow for Premium plans
- 📱 **PWA Support** - Installable on mobile devices (iOS/Android)
- 🛠️ **Admin Panel** - Manage movies, users, and view analytics
- 🎮 **Demo Mode** - Test the UI without database setup

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/v19-ott.git
cd v19-ott

# Install dependencies
npm install

# Run in demo mode (no setup required!)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | React 19, Vite 5, Tailwind CSS 3 |
| Animations | Framer Motion |
| Backend | Supabase (Auth, Database, Storage) |
| Payments | Razorpay |
| Deployment | Vercel |
| Video Hosting | Cloudinary / Supabase Storage |

## 📦 Project Structure

```
v19-ott/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route pages
│   ├── context/        # React Context (Auth)
│   ├── lib/            # Utilities (Supabase, Razorpay)
│   └── data/           # Mock data
├── public/             # Static assets
└── .env.example        # Environment variables template
```

## 🔧 Configuration

1. Copy `.env.example` to `.env`
2. Add your credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   VITE_RAZORPAY_KEY_ID=your_razorpay_key
   ```

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Production deployment steps
- [Contributing](./CONTRIBUTING.md) - How to contribute
- [Walkthrough](./brain/walkthrough.md) - Feature overview

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

## 📄 License

MIT © 2026
