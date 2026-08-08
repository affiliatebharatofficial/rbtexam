# 22. Future Roadmap - RBT Practice Questions SaaS

## Purpose
This document outlines the product strategy, upcoming features, architectural scalability milestones, and feature expansion roadmap for RBT Practice Questions.

## Architecture
Planned system extensions:
- Phase 1 (Q3 2026): Voice-enabled Socratic Ethics roleplay tutor.
- Phase 2 (Q4 2026): Native iOS and Android mobile app launch (React Native / Expo).
- Phase 3 (Q1 2027): Automated BACB 40-Hour Training Video Course & Certificate Verification.
- Phase 4 (Q2 2027): BCBA Candidate Exam Prep Expansion (BCBA Task List 5th/6th Edition).

## Folder Location
- `g:\RBT\docs\`

## Feature Roadmap Grid

### Near-Term Enhancements (Q3 - Q4 2026)
- **Interactive Audio Flashcards**: Native voice pronunciation of ABA terms (DRO, DRA, IRT, DTT).
- **Gamified Achievements**: Badges for 7-day study streaks, 100 flashcards mastered, and 90%+ diagnostic scores.
- **Offline PWA Support**: Service worker caching enabling candidates to practice offline.

### Long-Term Scalability (2027+)
- **Institutional Enterprise Licensing**: API connectors for major ABA therapy networks (Center for Autism and Related Disorders, BlueSprig, Hopebridge).
- **AI Competency Simulator**: Virtual client avatars reacting to candidate prompting choices in real-time.

## Database Tables Used
- Future tables: `achievements`, `user_badges`, `audio_assets`, `video_progress`.

## API Endpoints
- Future endpoints: `/api/v2/voice-tutor`, `/api/v2/offline-sync`.

## Workflow
Features developed incrementally following 2-week agile sprint cycles with automated testing and staging environment deployment.

## Business Logic
- Platform expansion targets increasing customer Lifetime Value (LTV) while maintaining current 99.4% first-time pass guarantee commitment.

## Security Notes
- Voice stream processing encrypted end-to-end via WebRTC security protocols.

## Performance Considerations
- Offline PWA caching strategy targets keeping initial offline bundle under 5MB.

## Dependencies
- React Native (Planned), Web Speech API.

## Related Files
- [docs/01-project-overview.md](file:///g:/RBT/docs/01-project-overview.md)
