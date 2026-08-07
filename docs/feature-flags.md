# Feature Flags & Targeting Engine

## 1. Overview
The Feature Flags engine provides dynamic runtime control over feature visibility without requiring code re-deployments.

## 2. Targeting Capabilities
- **Enable / Disable**: Global toggle for features.
- **Role-Based**: Restrict features to `admin`, `beta_tester`, `tutor`, or `student`.
- **Country-Based**: Geo-targeted feature deployment.
- **Percentage Rollout**: Deterministic hash-based user traffic allocation (e.g. 10%, 50%, 100%).
- **Time-Based Rollout**: Automated start and end timestamps for promotional or scheduled features.
- **Beta / Internal / Premium Only**: Enforce plan or group-level feature accessibility.

## 3. Usage Example
```typescript
import { evaluateFeatureFlag } from '@/lib/release-management-engine';

const isVoiceEnabled = evaluateFeatureFlag('ai_tutor_voice', {
  userId: user.id,
  role: user.role,
  isBetaUser: user.isBetaUser,
});
```
