# Apple-Level Empty States System

## 1. Design Standard
Whenever a database query returns zero records, RBT Practice Questions hides empty charts and displays a unified, Apple-level `EmptyState` component featuring:
- **Icon / Badge**: Visual category indicator (e.g. `Users`, `FolderOpen`, `Lock`).
- **Heading**: Clear, bold headline (e.g., "No Users Registered Yet", "No Questions Available").
- **Description**: Helpful context explaining how to populate data.
- **Primary CTA**: High-priority action button (e.g. "Create First Question", "Invite Candidate").
- **Secondary CTA**: Optional secondary navigation button.

## 2. Standardized Messages & CTAs

| Context | Empty State Title | Primary CTA | Secondary CTA |
|---|---|---|---|
| Users Roster | "No Users Registered Yet" | "Invite Candidate" | "Configure Roles" |
| Question Bank | "No Questions Created" | "Create First Question" | "Import CSV Bank" |
| Flashcards Deck | "No Flashcards Available" | "Create Flashcard Deck" | "Generate via AI" |
| Analytics Hub | "No Analytics Available Yet" | "View Live Telemetry" | "Documentation" |
| Subscriptions | "No Active Subscriptions" | "Create Subscription Plan" | "Stripe Settings" |
| Audit Logs | "No Security Audit Logs" | N/A | N/A |

## 3. Related Component
- Component: [empty-state.tsx](file:///g:/RBT/components/ui/empty-state.tsx)
