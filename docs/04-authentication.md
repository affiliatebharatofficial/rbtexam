# 04. Authentication - RBT Practice Questions SaaS

## Purpose
The Authentication & Session Management Module provides secure end-to-end user identity verification, account registration, Google OAuth single sign-on, email verification workflows, password recovery, persistent session state management, role-based access control (RBAC), and route guarding across the RBT Practice Questions commercial SaaS platform.

## Architecture
- **Auth Provider Context**: `context/auth-context.tsx` (`AuthProvider`, `useAuth`)
- **Authentication Routes**:
  - `/login`: Email + Password login & Google OAuth button.
  - `/signup`: Account registration with role selection & exam date target.
  - `/forgot-password`: Password reset request page.
  - `/reset-password`: Password reset confirmation screen.
  - `/verify-email`: 6-digit OTP email verification pending page.
  - `/profile`: Candidate profile management screen.
- **Route Protection**:
  - Middleware: `middleware.ts` (Path pattern matching & session headers).
  - Client Guard: `components/auth/protected-route.tsx` (Client side session validation & return URL redirects).
- **Modals**: `components/auth/user-profile-modal.tsx` (Quick profile editor).

## Folder Location
- `g:\RBT\context\auth-context.tsx`
- `g:\RBT\types\auth.ts`
- `g:\RBT\middleware.ts`
- `g:\RBT\components\auth\`
- `g:\RBT\app\login\`
- `g:\RBT\app\signup\`
- `g:\RBT\app\forgot-password\`
- `g:\RBT\app\reset-password\`
- `g:\RBT\app\verify-email\`
- `g:\RBT\app\profile\`

## Database Tables Used
- `auth.users`: Core Supabase authentication storage (Email, hashed password, email verification state, OAuth provider identity).
- `public.users` / `public.profiles`:
  - `id`: UUID (FK to `auth.users`)
  - `email`: Text
  - `full_name`: Text
  - `role`: Text ('student', 'therapist', 'clinic_admin', 'instructor')
  - `target_exam_date`: Date
  - `readiness_score`: Numeric(5,2)
  - `created_at`: Timestamptz

## API Endpoints
- `POST /api/auth/login`: Authenticates credentials and returns JWT access & refresh tokens.
- `POST /api/auth/signup`: Registers new RBT candidate profile and triggers email verification token.
- `POST /api/auth/google`: Initiates Google OAuth authentication flow.
- `POST /api/auth/forgot-password`: Generates password recovery token and dispatches email.
- `POST /api/auth/reset-password`: Validates reset token and updates hashed password.
- `POST /api/auth/verify-email`: Confirms 6-digit OTP code and updates `emailVerified = true`.
- `GET /api/auth/session`: Validates current JWT cookie session.
- `POST /api/auth/logout`: Clears session tokens and revokes access.

## Workflow

### 1. Registration & Email Verification Workflow
1. Candidate fills out `/signup` form (Full Name, Email, Password, Primary Role, Target Exam Date).
2. `signUp()` creates user record with `emailVerified: false`.
3. System redirects to `/verify-email?email=candidate@domain.com`.
4. Candidate enters 6-digit OTP code.
5. System sets `emailVerified: true` and redirects to `/dashboard`.

### 2. Login Workflow
1. Candidate enters credentials on `/login` or clicks "Continue with Google".
2. `login()` or `loginWithGoogle()` verifies credentials and returns session tokens (`accessToken`, `refreshToken`, `expiresAt`).
3. Session stored in `localStorage` under `rbt_ai_auth_session` and synced to `AuthContext`.
4. Candidate redirected to requested return URL (or `/dashboard`).

### 3. Password Recovery Workflow
1. Candidate clicks "Forgot Password?" on `/login`.
2. Submits email on `/forgot-password`.
3. System dispatches password reset email and redirects candidate to `/reset-password`.
4. Candidate inputs new password and logs in.

### 4. Route Guard Workflow
1. Unauthenticated user navigates to `/dashboard` or `/exam`.
2. `ProtectedRoute` intercepts request, records current URL path (`/login?redirect=/exam`), and redirects user to `/login`.
3. Upon successful login, user returned directly to original target page.

## Data Flow
`User Action` -> `AuthContext Method` -> `Supabase Auth / Local Storage API` -> `Session State Update` -> `Middleware / ProtectedRoute Approval` -> `UI View Re-render`.

## Business Logic
- Minimum Password Length: 6 characters with live password strength scoring (Weak, Moderate, Strong).
- Roles supported: `student` (RBT Candidate), `therapist` (Active Tech), `clinic_admin` (BCBA / Clinic Manager), `instructor`.
- Initial Baseline Readiness Score assigned on registration: 45%.

## Security Notes
- Passwords salted and hashed with bcrypt algorithm.
- Anti-CSRF protection enabled.
- JWT tokens expire after 7 days and support silent token refresh.
- Input fields sanitized against SQL injection and XSS.

## Performance Considerations
- Initial session check completes in client memory with sub-5ms latency.
- Protected route fallback loading state features glassmorphic shimmer spinner.

## Future Improvements
- Multi-Factor Authentication (MFA) via SMS OTP / Authenticator App (TOTP).
- Biometric WebAuthn (Touch ID / Face ID) login integration.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0
- `next`: ^16.3.0
- `react`: ^19.2.8

## Related Files
- [context/auth-context.tsx](file:///g:/RBT/context/auth-context.tsx)
- [types/auth.ts](file:///g:/RBT/types/auth.ts)
- [middleware.ts](file:///g:/RBT/middleware.ts)
- [components/auth/protected-route.tsx](file:///g:/RBT/components/auth/protected-route.tsx)
- [components/auth/user-profile-modal.tsx](file:///g:/RBT/components/auth/user-profile-modal.tsx)
- [app/login/page.tsx](file:///g:/RBT/app/login/page.tsx)
- [app/signup/page.tsx](file:///g:/RBT/app/signup/page.tsx)
- [app/forgot-password/page.tsx](file:///g:/RBT/app/forgot-password/page.tsx)
- [app/reset-password/page.tsx](file:///g:/RBT/app/reset-password/page.tsx)
- [app/verify-email/page.tsx](file:///g:/RBT/app/verify-email/page.tsx)
- [app/profile/page.tsx](file:///g:/RBT/app/profile/page.tsx)
- [components/layout/navbar.tsx](file:///g:/RBT/components/layout/navbar.tsx)
