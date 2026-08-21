# Dynamic Free Access & Super Admin Monetization Engine

## Overview
The Dynamic Free Access & Super Admin Monetization Engine allows the platform to operate in 100% Free Open Access Mode (where all 85-question BACB mock exams, answer rationales, flashcards, diagnostic reports, and Socrates AI tutor features are completely unlocked for all users without requiring a credit card or subscription), while empowering the Super Admin to enable or disable monetization (Payment Chalu / Band) instantly from the Super Admin Panel.

---

## Core Capabilities

1. **100% Free Access Mode (Sabke Liye Free)**:
   - When active (`freeAccessMode = true`), all feature permission guards (`canUserAccessFeature`) and rate limits (`checkAndTrackUsageQuota`) are unlocked.
   - All candidates receive unrestricted Pro-level access across mock exams, flashcards, and AI tutor.
   - Pricing section displays a prominent open access announcement and replaces checkout buttons with direct free practice links to `/exam`.

2. **Super Admin Live Monetization Controls**:
   - **Master Switch**: "Sabke Liye Free (100% Free Open Access Mode)" [ON / OFF].
   - **Payment Gateway Switch**: "Payment System (Chalu / Band)" [ON / OFF].
   - **Landing Page Pricing Section Toggle**: "Hide / Show Price Tag Section on Landing Page" (`showPricingSection`). When toggled to Hidden, the pricing tables and paywalls are completely hidden from the home page.
   - **Custom Announcement Banner**: Live configurable banner text shown across pricing and user dashboards.
   - Immediate persistence to Supabase `system_settings` and `localStorage`, with security audit logs.

3. **Dynamic API & Server State Sync**:
   - `/api/config`: Public endpoint delivering platform flags (`freeAccessMode`, `monetizationEnabled`, `showPricingSection`).
   - `/api/plans`: Delivers active plans with real-time `freeAccessMode`, `monetizationEnabled`, and `showPricingSection` flags.
   - `/api/billing/checkout`: Bypasses payment flow when free access mode is enabled.

---

## Key Files & Modules
- Platform Configuration: [`lib/platform-config.ts`](file:///g:/RBT/lib/platform-config.ts)
- Subscription Engine: [`lib/subscription-engine.ts`](file:///g:/RBT/lib/subscription-engine.ts)
- Admin Plans CMS: [`app/admin/plans/page.tsx`](file:///g:/RBT/app/admin/plans/page.tsx)
- Super Admin Dashboard: [`app/admin/page.tsx`](file:///g:/RBT/app/admin/page.tsx)
- Pricing Section UI: [`components/landing/pricing-section.tsx`](file:///g:/RBT/components/landing/pricing-section.tsx)
- Candidate Dashboard Banner: [`components/dashboard/trial-banner.tsx`](file:///g:/RBT/components/dashboard/trial-banner.tsx)
- Public Config API: [`app/api/config/route.ts`](file:///g:/RBT/app/api/config/route.ts)
