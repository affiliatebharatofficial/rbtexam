# Granular Role & Permission System - RBTTrainingAI SaaS

## Purpose
This document specifies the Role-Based Access Control (RBAC) architecture governing Super Admins, Admins, BCBA Clinical Editors, Support Staff, and Students.

## Roles Hierarchy
1. `super_admin`: Full platform control, billing, AI provider routing, and system configuration.
2. `admin`: User management and analytics oversight.
3. `bcba_editor`: Question Bank editing, flashcard decks, and AI prompt refinement.
4. `support_staff`: User ticket resolution and student progress viewing.
5. `student`: Standard candidate access.

## Related Files
- [types/super-admin.ts](file:///g:/RBT/types/super-admin.ts)
- [app/admin/page.tsx](file:///g:/RBT/app/admin/page.tsx)
