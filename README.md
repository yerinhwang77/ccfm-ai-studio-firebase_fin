<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1_TojPt48XtMWP32_kkQOYnMgyylfehdm

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Firebase Hosting

**Prerequisites:** Node.js, Firebase CLI

1. Install Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Build and deploy:
   ```bash
   npm run deploy
   ```
   
   Or deploy only hosting (after building):
   ```bash
   npm run build
   npm run deploy:hosting
   ```

Your app will be available at: `https://ccfm-ai-studio-f905a.web.app`