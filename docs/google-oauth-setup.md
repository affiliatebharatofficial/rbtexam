# Google OAuth Branding & Supabase Authentication Production Configuration

## Overview
RBTTrainingAI uses official Supabase Google OAuth (`@supabase/supabase-js`) for candidate authentication. When candidates click **"Continue with Google"**, they are redirected directly to Google's official sign-in screen, where the application branding displays **RBTTrainingAI**.

---

## Dynamic Redirect Architecture
The client application automatically calculates the redirect URL based on the current origin:
```ts
const redirectUrl = `${window.location.origin}/auth/callback`;
```
This dynamically supports:
- **Local Development**: `http://localhost:3000/auth/callback`
- **Vercel Preview Deployments**: `https://rbtexam-olive.vercel.app/auth/callback` (or any branch preview URL)
- **Custom Production Domain**: `https://rbttraining.ai/auth/callback`

---

## Step-by-Step Google Cloud Console & Supabase Configuration

### Step 1: Configure Google Cloud OAuth Consent Screen (Branding)
To ensure Google displays **RBTTrainingAI** during candidate sign-in:
1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to **APIs & Services** > **OAuth consent screen**.
3. Set **App Name**: `RBTTrainingAI`
4. Set **User support email**: `support@rbttraining.ai`
5. Upload **App Logo**: RBTTrainingAI Brain Logo SVG/PNG.
6. Set **Authorized Domains**:
   - `supabase.co`
   - `vercel.app`
   - `rbttraining.ai`
7. Save and publish the consent screen.

### Step 2: Create OAuth 2.0 Client Credentials
1. In Google Cloud Console, navigate to **Credentials** > **Create Credentials** > **OAuth client ID**.
2. Select **Application type**: `Web application`.
3. Set **Name**: `RBTTrainingAI Web Client`.
4. Add **Authorized JavaScript Origins**:
   - `http://localhost:3000`
   - `https://rbtexam-olive.vercel.app`
   - `https://rbttraining.ai`
5. Add **Authorized Redirect URIs**:
   - `https://<YOUR_SUPABASE_PROJECT_ID>.supabase.co/auth/v1/callback`
6. Copy the generated **Client ID** and **Client Secret**.

### Step 3: Configure Supabase Dashboard
1. Open [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project > **Authentication** > **Providers** > **Google**.
3. Toggle **Enable Google provider**: `ON`.
4. Enter **Client ID** and **Client Secret** obtained from Google Cloud.
5. Save settings.

### Step 4: Environment Variables (`.env.production` & Vercel)
In Vercel Project Settings > **Environment Variables**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<YOUR_SUPABASE_PROJECT_ID>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

---

## Verification Matrix
| Environment | JavaScript Origin | Supabase OAuth Redirect | Application Redirect Callback |
| :--- | :--- | :--- | :--- |
| **Localhost** | `http://localhost:3000` | `https://<proj>.supabase.co/auth/v1/callback` | `http://localhost:3000/auth/callback` |
| **Vercel Preview** | `https://rbtexam-olive.vercel.app` | `https://<proj>.supabase.co/auth/v1/callback` | `https://rbtexam-olive.vercel.app/auth/callback` |
| **Production** | `https://rbttraining.ai` | `https://<proj>.supabase.co/auth/v1/callback` | `https://rbttraining.ai/auth/callback` |
