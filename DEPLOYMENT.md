# V 19+ Deployment Guide

This guide will help you deploy your OTT platform for free using Vercel (Frontend), Supabase (Backend/DB), and Cloudinary (Video Storage).

## Prerequisites

1.  **Node.js** installed locally.
2.  **Git** installed locally.
3.  Accounts on:
    *   [Vercel](https://vercel.com)
    *   [Supabase](https://supabase.com)
    *   [Cloudinary](https://cloudinary.com)

## 1. Supabase Setup (Database & Auth)

1.  Create a new project on Supabase.
2.  Go to the **SQL Editor** in your Supabase dashboard.
3.  Copy the content of `src/lib/schema.sql` from this project.
4.  Paste it into the SQL Editor and run it. This creates all necessary tables and policies.
5.  Go to **Project Settings > API**.
6.  Copy the `Project URL` and `anon public` key.

## 2. Environment Variables

1.  Create a `.env` file in the root directory (copy from `.env.example`).
2.  Fill in your Supabase credentials:
    ```
    VITE_SUPABASE_URL=your_project_url
    VITE_SUPABASE_ANON_KEY=your_anon_key
    ```

## 3. Deployment to Vercel

1.  Push your code to a GitHub repository.
2.  Log in to Vercel and click **Add New > Project**.
3.  Import your GitHub repository.
4.  In the **Environment Variables** section, add the same variables from step 2 (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
5.  Click **Deploy**.

## 4. Admin Setup

1.  Sign up a new user on your deployed site.
2.  Go to Supabase **Table Editor > profiles**.
3.  Find your user and set `is_admin` to `TRUE`.
4.  Now you can access `/admin` to upload movies!

## 5. PWA (Mobile App)

The app is already configured as a PWA. When users visit on mobile (Chrome/Safari), they will see an "Add to Home Screen" option. This installs it like a native app.

## 6. Video Hosting (Cloudinary)

1.  Upload videos to Cloudinary (Free tier allows decent amount).
2.  Copy the direct video URL (ending in .mp4).
3.  Use the Admin Panel to add a new movie and paste this URL into the "Video Source URL" field.

Enjoy your streaming platform!
