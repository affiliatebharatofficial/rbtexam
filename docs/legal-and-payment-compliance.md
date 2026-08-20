# Legal, Refund & Payment Compliance Architecture

## Overview
This document defines the compliance standards, legal disclosures, refund procedures, educational disclaimers, and payment transparency rules for **RBTPracticeQuestions.com** / **RBT Practice AI**.

## 1. Compliance Architecture & Pages
- **Refund & Cancellation Policy** (`/refund-policy`): Full explanation of subscription billing, auto-renewal, 1-click self-service cancellation via `/profile/billing`, 48-hour accidental renewal grace window, 100% Pass-or-Refund Guarantee claim workflow, failed payment retries, and duplicate charge remedies.
- **Educational Disclaimer & Non-Affiliation** (`/disclaimer`): Official non-affiliation notice regarding the Behavior Analyst Certification Board® (BACB®) and Pearson VUE®, clarification that practice questions are original educational materials (no unauthorized/leaked content), no exam pass warranties, and Socratic AI limitations.
- **Terms of Service** (`/terms`): Binding user agreement covering account security, acceptable use, anti-scraping / anti-sharing policies, subscription terms, intellectual property, AI content disclaimers, limitation of liability, and Delaware governing law.
- **Privacy Policy** (`/privacy`): Comprehensive data governance in compliance with GDPR & CCPA, itemizing data collection, encryption (AES-256 / TLS 1.3), sub-processors (Cloudflare, Supabase, OpenAI, Anthropic, Stripe, Lemon Squeezy), and account deletion / Right to be Forgotten workflows.
- **Support & Inquiries Desk** (`/contact`): Direct channel for candidate help, refund requests, pass guarantee claims, and BCBA question feedback via `hello@rbtpracticeai.com`.
- **Pass-or-Refund Guarantee Terms** (`/guarantee-terms`): Binding criteria for 3 qualifying 85%+ full-length mock exams and 30-day Pearson VUE score report claim submission.

## 2. Payment & Checkout Transparency
- **Explicit Currency**: All prices clearly marked in USD ($).
- **Billing Frequency**: Clear monthly ($29 USD/mo) and annual ($19 USD/mo billed annually at $228/yr) distinction.
- **Pre-Checkout Disclosures**: Explicit recurring billing notice and direct links to Terms of Service, Privacy Policy, and Refund Policy before checkout initiation.
- **PCI-DSS Compliance**: Raw payment card credentials are handled exclusively by third-party processors and never touch platform servers.

## 3. BACB Trademark Safety
- Independent exam preparation platform notice displayed persistently across footers and legal pages.
- No false claims of "Official BACB", "BACB approved", or guaranteed certification pass.
