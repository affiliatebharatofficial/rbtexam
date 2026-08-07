# Semantic Versioning Policy

## 1. Version Format (`MAJOR.MINOR.PATCH`)
- **MAJOR (`X.0.0`)**: Incompatible API schema changes, fundamental database overhauls.
- **MINOR (`2.X.0`)**: Backward-compatible feature additions, new engines, new pages.
- **PATCH (`2.8.X`)**: Backward-compatible bug fixes and small optimizations.

## 2. Automated Changelog Generation
Changelogs are automatically compiled from SemVer metadata using `generateChangelogMarkdown()` in [release-management-engine.ts](file:///g:/RBT/lib/release-management-engine.ts).
