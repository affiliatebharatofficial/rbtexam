# Release Management Framework

## 1. Environment Promotion Pipeline
RBTTrainingAI enforces a strict 5-stage deployment progression:
1. **Development (`dev`)**: Local integration and unit testing.
2. **Staging (`staging`)**: Pre-release verification and automated E2E testing.
3. **Private Beta (`private_beta`)**: Internal testers and select power users.
4. **Public Beta (`public_beta`)**: Early access waitlist users.
5. **Production (`production`)**: Live environment serving all active subscribers.

## 2. Release Types
- **Major**: Architectural changes, breaking API modifications.
- **Minor**: New engines, pages, or major feature additions.
- **Patch**: Non-breaking bug fixes and optimizations.
- **Hotfix**: Emergency patch deployed directly to production.

## 3. Related Files
- Service: [release-management-engine.ts](file:///g:/RBT/lib/release-management-engine.ts)
- API Endpoint: [route.ts](file:///g:/RBT/app/api/v1/release-management/releases/route.ts)
