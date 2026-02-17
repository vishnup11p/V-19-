# Building APK for V 19+ OTT Platform

## Quick Build Options

### Option 1: GitHub Actions (Recommended - Free & Automatic)

1. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a GitHub repository and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. Go to your GitHub repository → Actions tab
4. The workflow will run automatically and build the APK
5. Download the APK from the Actions artifacts (available for 30 days)

**APK Download Link**: After pushing to GitHub, go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions` and download the artifact from the latest workflow run.

### Option 2: Local Build (Requires Java & Android SDK)

1. Install Java JDK 17 or higher
2. Install Android Studio (includes Android SDK)
3. Set JAVA_HOME environment variable
4. Run:
   ```bash
   npm run build
   npm run cap:sync
   cd android
   ./gradlew assembleDebug
   ```
5. APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Option 3: Cloud Build Services

- **AppCircle** (Free tier): https://appcircle.io
- **Bitrise** (Free tier): https://www.bitrise.io
- **Codemagic** (Free tier): https://codemagic.io

## Current Status

✅ All routes enabled (including ViewingHistory)
✅ Capacitor configured
✅ Android platform added
✅ Web app built successfully
✅ GitHub Actions workflow ready

## Next Steps

To get your APK link:
1. Push to GitHub (see Option 1 above)
2. Wait for GitHub Actions to build (5-10 minutes)
3. Download APK from Actions artifacts
