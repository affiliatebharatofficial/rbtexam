# Known Issues & Workarounds Registry

## 1. Registry Overview
This document tracks known non-blocking issues and technical debt items across release versions.

| Issue ID | Description | Severity | Target Fix Version | Workaround |
|---|---|---|---|---|
| ISSUE-101 | High AI model latency during peak hours (Anthropic fallback) | Low | v2.9.0 | Model router automatically switches to DeepSeek/OpenAI |
| ISSUE-102 | Playwright test browser initialization delay on cold start | Low | v2.8.5 | Increase timeout in `playwright.config.ts` |
