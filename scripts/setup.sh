#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# RBTTrainingAI — One-Command Setup Script
# Usage: bash scripts/setup.sh
# ─────────────────────────────────────────────────────────────────────────────
set -e

BOLD="\033[1m"
GREEN="\033[32m"
YELLOW="\033[33m"
RED="\033[31m"
RESET="\033[0m"

echo -e "${BOLD}🚀 RBTTrainingAI — Enterprise Setup${RESET}\n"

# ── Step 1: Check Node.js ─────────────────────────────────────────────────────
echo -e "1️⃣  Checking Node.js version..."
NODE_VER=$(node -v 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1)
if [ -z "$NODE_VER" ] || [ "$NODE_VER" -lt 18 ]; then
  echo -e "${RED}❌ Node.js 18+ required. Install from https://nodejs.org${RESET}"
  exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) found${RESET}"

# ── Step 2: Environment File ──────────────────────────────────────────────────
echo -e "\n2️⃣  Setting up environment..."
if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
  echo -e "${YELLOW}⚠  Created .env.local from .env.example. Please fill in your credentials.${RESET}"
else
  echo -e "${GREEN}✓ .env.local exists${RESET}"
fi

# ── Step 3: Install Dependencies ──────────────────────────────────────────────
echo -e "\n3️⃣  Installing dependencies..."
npm install
echo -e "${GREEN}✓ Dependencies installed${RESET}"

# ── Step 4: Validate Environment ──────────────────────────────────────────────
echo -e "\n4️⃣  Validating environment variables..."
node -e "
  const vars = ['NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_ANON_KEY'];
  const missing = vars.filter(k => !process.env[k]);
  if (missing.length > 0) {
    console.log('⚠  The following vars need values in .env.local:', missing.join(', '));
  } else {
    console.log('✓ Core environment variables present');
  }
" || true

# ── Step 5: Type Check ────────────────────────────────────────────────────────
echo -e "\n5️⃣  Running TypeScript check..."
npx tsc --noEmit && echo -e "${GREEN}✓ TypeScript clean${RESET}" || echo -e "${YELLOW}⚠  TypeScript errors found${RESET}"

# ── Step 6: Done ─────────────────────────────────────────────────────────────
echo -e "\n${BOLD}${GREEN}✅ Setup complete!${RESET}"
echo -e "\nNext steps:"
echo -e "  1. Fill in credentials in ${BOLD}.env.local${RESET}"
echo -e "  2. Run ${BOLD}npm run dev${RESET} to start development server"
echo -e "  3. Open ${BOLD}http://localhost:3000${RESET}"
echo -e "\nFor production: See ${BOLD}docs/buyer-deployment-guide.md${RESET}\n"
