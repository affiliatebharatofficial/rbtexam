# Production Cleanup & Data Isolation Architecture

## Overview
RBTTrainingAI enforces strict zero-fake-data architecture in production environments. All mock users, sample analytics, fake revenues, hardcoded trends, and pre-populated test attempts are removed from production runtime.

## Core Directives
1. **Allowed Starter Content**: The ONLY starter content permitted in production is the **Master Question Bank**.
2. **Dynamic PostgreSQL Queries**: Every dashboard widget, candidate analytics summary, and admin scorecard fetches real database records.
3. **Zero Fake Accounts**: Users must authenticate via Supabase Auth or email signup. Sample profiles (`Alex Morgan`, `Sarah Jenkins`) are completely removed.
4. **Environment Check**: `process.env.NEXT_PUBLIC_APP_ENV === 'production'` enforces strict isolation.

## Security Safeguard Matrix
| Component | Development Mode | Production Mode |
| :--- | :--- | :--- |
| **Demo Seeding** | Allowed via Admin Toolbar | **STRICTLY BLOCKED (Throws Error)** |
| **Empty Widgets** | Show sample preview if seeded | **Render Apple-Level Empty States** |
| **User Profiles** | Real or Auth Session | **Authenticated Supabase Users Only** |
| **Starter Data** | Questions & Decks | **Master Question Bank Only** |
