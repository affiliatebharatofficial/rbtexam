# Beta Program Management

## 1. Beta Groups
- **Internal Testers (`internal_testers`)**: Core QA and internal engineers.
- **Early Access (`early_access`)**: Waitlist users invited to pre-release testing.
- **Power Users (`power_users`)**: Active subscribers providing deep feedback.
- **Enterprise Beta (`enterprise_beta`)**: Institutional accounts testing bulk features.

## 2. Beta Invites & Feedback API
- Redeem Code: `POST /api/v1/beta/invites` `{ action: "redeem", code: "RBTBETA2026", email: "user@example.com" }`
- Submit Feedback: `POST /api/v1/beta/invites` `{ action: "feedback", feedback: { title: "...", description: "..." } }`
