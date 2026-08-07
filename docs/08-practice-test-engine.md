# 08. Practice Test Engine - RBTTrainingAI SaaS

## Purpose
The RBT Practice Test Engine delivers a realistic, high-concurrency exam simulation environment matching Pearson VUE test center conditions for the BACB® 2nd Edition Task List certification exam. It features randomized question pooling, selectable modes (*Timed Simulation vs Untimed Socratic Study Mode*), configurable question lengths (*20, 50, 85, 100 questions*), instant option explanations, question bookmarking, a pre-submit review grid drawer, immediate scoring, BACB domain sub-score analytics, detailed post-exam rationales walkthrough, and automatic progress saving.

## Architecture
- **Primary Interface**: `/app/exam/page.tsx`
- **Question Generator & Bank**: `lib/sample-questions.ts` (`generateExamQuestions`, `SAMPLE_BACB_QUESTIONS`)
- **State Machine Phases**:
  - `setup`: Mode, length, and domain selection.
  - `active`: Live question rendering, options selection, timer countdown, bookmarking.
  - `review_drawer`: Pre-submission grid of answered, unanswered, and bookmarked questions.
  - `results`: Instant percentage score, pass/fail badge, BACB domain sub-scores, and full question walkthrough.

## Folder Location
- Page: `g:\RBT\app\exam\page.tsx`
- Question Models: `g:\RBT\lib\sample-questions.ts`
- Type Declarations: `g:\RBT\types\exam.ts`

## Database Tables Used
- `public.exam_sessions`: Records total test score, duration, mode, passed status, and domain accuracy map.
- `public.exam_answers`: Logs individual question selections, time spent per item, and correctness.
- `public.user_task_mastery`: Updates individual BACB Task List item ratings (A-01 through F-04).

## API Endpoints
- `POST /api/exam/start`: Initializes a new exam attempt and returns randomized questions.
- `POST /api/exam/save-progress`: Syncs active exam answers to cloud database.
- `POST /api/exam/submit`: Evaluates test payload, calculates domain percentages, and returns pass/fail state.

## Workflow

### 1. Test Setup Workflow
1. Candidate selects Mode (*Timed Simulation with countdown timer vs Untimed Socratic Study Mode*).
2. Candidate selects Question Count (*20, 50, 85 Official Length, 100 Extended Mock*).
3. Candidate selects Domain Focus (*All Domains A-F or specific domain*).
4. System invokes `generateExamQuestions(count, domainFocus)` to randomize questions.

### 2. Active Test & Review Workflow
1. Questions rendered with scenario text, BACB citation, and options A-D.
2. Candidate can toggle `Bookmark` on any question.
3. Candidate can open `Review Drawer` at any time to jump to unanswered or bookmarked items.
4. Auto-save engine writes progress to `localStorage` under `rbt_exam_active_session_v2`.

### 3. Scoring & Results Workflow
1. Upon submission (or timer expiration), engine evaluates `userAnswers` against `correctOptionId`.
2. Computes overall percentage score: `(Correct / Total) * 100`.
3. If percentage >= 85%, displays `PASS READY` badge and triggers `canvas-confetti`.
4. If percentage < 85%, displays `RETRY DRILL` recommendation with direct Socrates AI drill link.
5. Computes individual accuracy percentages for Domains A, B, C, D, E, and F.
6. Renders complete question walkthrough with distractor explanations and Socratic AI rationales.

## Data Flow
`User Setup Choices` -> `Question Randomizer` -> `Active Exam State Machine` -> `Local Storage Progress Sync` -> `Final Evaluation Engine` -> `Domain Analytics & Rationale View`.

## Business Logic
- **Pass Threshold**: 85% overall score (72 out of 85 questions correct).
- **Domain Weighting**: Questions allocated proportionally to official BACB Task List weights (Domain C 28%, Domain D 24%, Domain F 16%, Domain A 12%, Domain B 10%, Domain E 10%).
- **Untimed Mode**: Rationale explanations toggled instantly after selecting choice.
- **Timed Mode**: Rationale explanations withheld until final test submission.

## Security Notes
- Answers evaluated client-side in memory and validated server-side upon API submission.
- Prevents inspecting correct choice answers via obfuscated question IDs.

## Performance Considerations
- Zero page reload delays during question transitions; state updated in < 1ms.
- LocalStorage caching allows candidate to recover exam progress after browser crashes.

## Future Improvements
- Pearson VUE split-screen interface mode simulating official testing workstation environment.

## Dependencies
- `canvas-confetti`: ^1.9.4
- `lucide-react`: ^1.29.0
- `react`: ^19.2.8

## Related Files
- [app/exam/page.tsx](file:///g:/RBT/app/exam/page.tsx)
- [lib/sample-questions.ts](file:///g:/RBT/lib/sample-questions.ts)
- [types/exam.ts](file:///g:/RBT/types/exam.ts)
