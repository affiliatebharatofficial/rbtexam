# 24 - Multilingual i18n & Spanish Language Engine

> Authoritative documentation for the RBT Practice Questions Multilingual Internationalization (i18n) Architecture & Spanish (Español 🇪🇸) Integration.

---

## 1. Overview & Purpose
The Multilingual i18n Engine provides seamless platform-wide internationalization across English (`en-US`) and Spanish (`es-ES`, `es-MX`, `es-US`).
It enables candidates to:
- Switch language preferences dynamically from the header navigation bar via `LanguageSelector`.
- Practice exam questions, Leitner 5-box flashcards, and Socrates AI Tutor in Spanish.
- Retain language state across sessions using local storage (`rbt_user_language`) and browser auto-detection.

---

## 2. Architecture & Components

### Core Files & Modules
1. **`context/language-context.tsx`**:
   - `LanguageProvider` & `LanguageContext` managing client-side translation dictionaries (`en` and `es`).
   - `useLanguage()` hook exposing `language`, `setLanguage`, and `t(key, fallback)` helper.
   - Automatic browser language detection & `localStorage` persistence.

2. **`components/layout/language-selector.tsx`**:
   - Apple-grade glassmorphism dropdown with flag indicators (🇺🇸 English, 🇪🇸 Español).
   - Integrated into desktop header actions and mobile drawer.

3. **AI Engine Prompt Enhancements**:
   - `lib/ai-question-generator-engine.ts`: Injects Spanish prompt directives (`Write ALL question text, scenarios, options, explanations in Spanish with official BACB ABA terms`).
   - `lib/ai-flashcard-generator-engine.ts`: Support for Spanish flashcard generation.
   - `lib/ai-prompt-manager.ts` & `app/api/tutor/chat/route.ts`: Configures Socrates AI Tutor to communicate in fluent Spanish when `language === 'es'`.

4. **Super Admin Manager**:
   - `lib/platform-config.ts` & `app/admin/page.tsx`: Super Admin CMS tab for setting default candidate locale and viewing active supported locales inventory.

---

## 3. Translation Key Standard
Translation keys follow hierarchical dot notation:
- `nav.*`: Navigation menu items
- `hero.*`: Landing hero section titles and CTAs
- `exam.*`: Practice exam setup, live question interface, rationale, and score summary
- `flashcard.*`: Flashcard deck, Leitner ratings, AI generator modal
- `tutor.*`: Socrates AI Tutor dialogue bar, prompt modes, suggested chips
- `dashboard.*`: Candidate performance, readiness score, weak domain highlights
- `admin.*`: Super Admin CMS locale settings

---

## 4. Verification & Testing
- **Unit Tests**: `tests/unit/language-context.test.ts`
- **Manual Verification**:
  - Toggle language between English 🇺🇸 and Spanish 🇪🇸 in Navbar.
  - Verify UI strings updated dynamically across Navbar, Exam, Flashcards, AI Tutor, Admin.
  - Verify AI Tutor and Flashcards generate Spanish content with proper ABA terminology.
