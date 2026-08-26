import { Article, ArticleCategory, ArticleStatus, CreateArticleInput, UpdateArticleInput } from '@/types/article-cms';
import { submitToIndexNow, getIndexNowConfig } from './indexnow-engine';

const STORAGE_KEY = 'rbt_article_cms_data';

export const INITIAL_SEED_ARTICLES: Article[] = [
  {
    id: 'art-rbt-2026-guide',
    slug: 'complete-rbt-exam-study-guide-2026',
    title: 'Complete RBT Exam 2026 Study Guide: BACB 3rd Edition TCO Breakdown',
    summary: 'A comprehensive breakdown of all 6 domains in the 2026 BACB RBT 3rd Edition Test Content Outline (TCO), including continuous measurement, ABC data, and ethics.',
    content: `# Complete RBT Exam 2026 Study Guide

*Disclaimer: RBT Practice AI is an independent test-preparation resource not affiliated with, sponsored by, or endorsed by the Behavior Analyst Certification Board® (BACB®).*

Preparing for your **Registered Behavior Technician (RBT)** examination requires a clear understanding of the 6 core domains outlined in the BACB RBT 3rd Edition Test Content Outline (TCO).

## BACB RBT Exam Domain Weightage

| Domain Code | BACB Task List Domain Name | Exam Questions % | Priority Level |
| :--- | :--- | :--- | :--- |
| **Domain A** | Measurement & Data Collection | 12 Questions (14%) | High |
| **Domain B** | Assessment Procedures | 8 Questions (9%) | Medium |
| **Domain C** | Skill Acquisition Procedures | 24 Questions (28%) | Critical |
| **Domain D** | Behavior Reduction Procedures | 20 Questions (24%) | Critical |
| **Domain E** | Documentation & Reporting | 10 Questions (12%) | High |
| **Domain F** | Professional Conduct & Ethics Scope | 11 Questions (13%) | High |

---

## 1. Domain C: Skill Acquisition Breakdown

Skill Acquisition forms the largest portion of your official exam (**28%**). Focus heavily on Discrete Trial Teaching (DTT), Task Analysis, and Prompting Hierarchies.

### Least-to-Most Prompt Hierarchy Table

| Prompt Level | Type | Clinical Description | Example Scenario |
| :--- | :--- | :--- | :--- |
| **Level 1** | Independent | No prompt given | Child washes hands upon hearing "Wash your hands" |
| **Level 2** | Visual / Gestural | Pointing or card prompt | Pointing to the soap dispenser |
| **Level 3** | Verbal Prompt | Direct verbal instruction | Saying "Turn on the water" |
| **Level 4** | Modeling | Demonstrating target behavior | BCBA models scrubbing hands for 20s |
| **Level 5** | Partial Physical | Guiding at elbow or wrist | Guiding candidate wrist toward faucet |
| **Level 6** | Full Physical | Hand-over-hand physical guidance | Full hand-over-hand assistance to turn faucet |

---

## 2. Key Ethics Rule (Domain F)

- **Dual Relationships**: RBTs must never engage in personal, financial, or romantic relationships with clients or client families.
- **Gift Acceptance**: RBTs should refrain from accepting gifts with financial value to preserve objective professional boundaries.
`,
    category: 'RBT Exam Guide',
    tags: ['RBT Study Guide', 'BACB Exam', 'Skill Acquisition', 'Ethics'],
    coverImageUrl: '/banner-rbt-hero.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 7,
    status: 'published',
    viewsCount: 310,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art-25-free-questions',
    slug: 'free-practice-questions-with-answers',
    title: 'RBT Practice Questions: 25 Free Questions With Answers (BACB 3rd Edition)',
    summary: 'Practice with 25 free, original RBT practice questions aligned with the current BACB RBT 3rd Edition outline. Includes detailed clinical rationales and exam tips.',
    content: `# RBT Practice Questions: 25 Free Questions With Answers & Rationales

*Disclaimer: RBT Practice AI is an independent exam-preparation platform. It is not affiliated with, sponsored by, or endorsed by the Behavior Analyst Certification Board® (BACB®). Questions are original practice probes and not actual BACB exam questions.*

Preparing for your Registered Behavior Technician® (RBT®) certification exam requires deliberate, scenario-based practice. Memorizing definitions in isolation is rarely enough; the exam evaluates your ability to apply Applied Behavior Analysis (ABA) principles in direct-service clinical, home, school, and community environments under BCBA supervision.

In this free practice set, you will find 25 original multiple-choice questions mapped directly across all 6 core domains of the **current BACB RBT 3rd Edition Test Content Outline (TCO)**.

---

### Practice Questions & Answers

#### Question 1 (Domain A: Measurement)
An RBT records the exact time that elapses between the delivery of the instruction "Please open your workbook" and the moment the learner begins turning to the assigned page. What measurement procedure is being utilized?
- A. Duration
- B. Inter-Response Time (IRT)
- **C. Latency (Correct)**
- D. Momentary Time Sampling
> **Explanation**: Latency measures the temporal locus—the exact elapsed time between the presentation of an antecedent stimulus ($S^D$) and the initiation of the response.

#### Question 2 (Domain A: Measurement)
During a 30-minute circle time session, an RBT sets a timer for 3-minute intervals. The RBT looks up at the precise moment the timer sounds and records whether the client is sitting in their assigned seat. What discontinuous measurement method is this?
- A. Whole-Interval Recording
- B. Partial-Interval Recording
- **C. Momentary Time Sampling (Correct)**
- D. Permanent Product Recording
> **Explanation**: Momentary Time Sampling (MTS) records whether the behavior is occurring at the exact instant an interval ends.

#### Question 3 (Domain A: Measurement)
A supervisor asks an RBT to track how much time elapses between consecutive occurrences of vocal stereotypy (from the end of one episode to the start of the next). Which metric should the RBT record?
- A. Rate
- **B. Inter-Response Time (IRT) (Correct)**
- C. Latency
- D. Frequency
> **Explanation**: IRT measures the time interval elapsed between two consecutive instances of the same target behavior.

#### Question 4 (Domain B: Assessment)
An RBT places five preferred toys in front of a child in a straight line. The child selects one toy and is allowed to play with it for 30 seconds. The RBT removes the selected toy from the array, rearranges the remaining four toys, and instructs the child to select another. Which preference assessment is being conducted?
- A. Paired Stimulus Assessment
- B. Multiple Stimulus With Replacement (MSW)
- **C. Multiple Stimulus Without Replacement (MSWO) (Correct)**
- D. Free Operant Preference Assessment
> **Explanation**: In MSWO, the selected item is removed from the array on subsequent trials to create a ranked preference hierarchy.

#### Question 5 (Domain C: Skill Acquisition)
An RBT teaches a child to wash hands using a 7-step task analysis. In the initial phase, the RBT physically prompts steps 1 through 6, and teaches the child to independently complete step 7 (drying hands on a paper towel) to access reinforcement. What chaining procedure is being implemented?
- A. Forward Chaining
- **B. Backward Chaining (Correct)**
- C. Total Task Chaining
- D. Behavior Shaping
> **Explanation**: Backward chaining teaches the final step of the chain first, providing immediate access to the natural terminal reinforcer upon completion.

---

### Flashcard Key Takeaways
- **Latency**: Time from instruction to response start.
- **IRT**: Time between two consecutive behaviors.
- **DRO**: Reinforcing the absence of problem behavior during an interval.
- **5% Monthly Rule**: Minimum mandatory percentage of direct hours supervised by a BCBA.

---

### Ready for More Practice?
Practice over 1,000+ realistic, scenario-based questions with instant clinical explanations on [RBTPracticeAI Question Bank](/exam)!
`,
    category: 'RBT Exam Guide',
    tags: ['RBT Practice Questions', 'BACB 3rd Edition', 'Free Exam Questions', 'Domain A-F'],
    coverImageUrl: '/banner-rbt-hero.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 8,
    status: 'published',
    viewsCount: 290,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art-beginner-practice',
    slug: 'beginner-practice-questions',
    title: 'RBT Practice Questions for Beginners: Step-by-Step Foundation Guide',
    summary: 'New to ABA? Master introductory RBT practice questions with simple explanations, 3-term contingency breakdowns, and 10 beginner-friendly practice questions.',
    content: `# RBT Practice Questions for Beginners: Your Step-by-Step Starting Guide

*Disclaimer: RBT Practice AI is an independent educational platform. RBT® is a registered trademark of the BACB®.*

Stepping into the field of Applied Behavior Analysis (ABA) can feel like learning a completely new language. Terms like *Antecedents*, *Establishing Operations*, *Differential Reinforcement*, and *Inter-Response Time* can overwhelm beginners.

In this guide, we break down core beginner concepts and provide 10 foundational questions with clear explanations.

## The Core ABA Triad Every Beginner Must Master
Every behavioral interaction consists of the **Three-Term Contingency (A-B-C)**:
1. **Antecedent (A)**: Environmental event occurring immediately before the behavior.
2. **Behavior (B)**: Observable and measurable action of the individual.
3. **Consequence (C)**: Environmental stimulus change occurring immediately after the behavior, which influences its future frequency.

---

### 10 Beginner Practice Questions

#### Question 1 (Domain A: Measurement)
An RBT counts the total number of times a child claps their hands during a 10-minute session. The child claps 14 times. What measurement procedure was recorded?
- A. Duration
- **B. Frequency (Count) (Correct)**
- C. Latency
- D. Rate
> **Explanation**: Frequency is the raw count of occurrences of a behavior.

#### Question 2 (Domain C: Skill Acquisition)
In Applied Behavior Analysis, what is the primary effect of Positive Reinforcement on behavior?
- A. It decreases the future frequency of the behavior.
- B. It adds an aversive stimulus to stop the behavior.
- **C. It adds a stimulus immediately following a behavior, increasing the future frequency of that behavior. (Correct)**
- D. It removes a preferred item to punish the client.
> **Explanation**: Positive means adding a stimulus; reinforcement means increasing future behavior.

#### Question 3 (Domain D: Behavior Reduction)
A child hits their sibling to get access to a toy truck. What is the function of the child's hitting behavior?
- A. Automatic Sensory
- **B. Access to Tangibles (Correct)**
- C. Escape from Demand
- D. Pain Attenuation
> **Explanation**: The behavior is maintained by obtaining a physical item (toy truck).

#### Question 4 (Domain F: Ethics)
Who is primarily responsible for creating, modifying, and updating a client's formal Behavior Intervention Plan (BIP)?
- A. The RBT providing direct therapy
- **B. The Supervising BCBA / Clinical Supervisor (Correct)**
- C. The client's school bus driver
- D. The front desk receptionist
> **Explanation**: RBTs implement behavior plans; only qualified BCBAs design and modify them.

---

### Next Steps for Beginners
Ready to advance? Try our [Topic-by-Topic Practice Questions](/rbt/questions/practice-questions-by-topic) or explore [Leitner Smart Flashcards](/flashcards)!
`,
    category: 'Study Strategies',
    tags: ['Beginner RBT', 'Introductory ABA', 'ABC Data', 'Reinforcement'],
    coverImageUrl: '/cert-badge-bacb.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 6,
    status: 'published',
    viewsCount: 275,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art-exam-questions-answers',
    slug: 'exam-questions-and-answers',
    title: 'RBT Exam Questions and Answers: Free Practice & Strategy Guide',
    summary: 'Learn how to deconstruct RBT exam questions, eliminate distractors, and practice with 15 original scenario-based questions with rationales.',
    content: `# RBT Exam Questions and Answers: How to Deconstruct and Solve Exam Scenarios

*Disclaimer: RBT Practice AI is an independent exam-preparation platform not affiliated with the BACB.*

Passing the RBT exam is less about rote memorization and more about **clinical decision-making within the RBT scope**. Test questions present realistic clinical scenarios where you must identify the correct measurement tool, prompt hierarchy step, reinforcement schedule, or ethical response.

## The 3-Step Question Deconstruction Method
1. **Identify the Core Domain**: Determine whether the question is testing Measurement (A), Assessment (B), Skill Acquisition (C), Behavior Reduction (D), Documentation (E), or Ethics (F).
2. **Find the Environmental Trigger**: Look at what happened *before* the behavior (the $S^D$ or MO) and what occurred *after* (the consequence).
3. **Eliminate Non-Behavioral Distractors**: Rule out answers containing mentalistic explanations (e.g., "The client was angry," "The client felt stubborn") or actions that fall outside the RBT's professional scope.

---

### Key Practice Probes

#### Question 1 (Domain A: Measurement)
Which measurement method is known for mathematically *underestimating* the total duration and frequency of a target behavior?
- A. Partial-Interval Recording
- **B. Whole-Interval Recording (Correct)**
- C. Continuous Frequency
- D. Inter-Response Time
> **Explanation**: Whole-Interval Recording requires the behavior to persist across the entire duration of the interval. If it stops for 1 second, it is scored as negative, causing an underestimation of total behavior.

#### Question 2 (Domain D: Behavior Reduction)
A student repeatedly shouts out answers in class without raising their hand. The BCBA designs a plan where the student receives reinforcement only if they shout out 2 or fewer times during the 60-minute period. What differential reinforcement procedure is this?
- A. Differential Reinforcement of Incompatible Behavior (DRI)
- **B. Differential Reinforcement of Low Rates of Responding (DRL) (Correct)**
- C. Differential Reinforcement of Other Behavior (DRO)
- D. Differential Reinforcement of Alternative Behavior (DRA)
> **Explanation**: DRL reinforces behaviors that are acceptable at lower frequencies, aiming to reduce but not completely eliminate the behavior.

#### Question 3 (Domain F: Ethics)
Under BACB Ethics Code 2.0, if an RBT is arrested or charged with a legal violation related to behavior-analytic services, within how many days must they report this to the BACB?
- **A. 30 days (Correct)**
- B. 60 days
- C. 90 days
- D. At annual renewal
> **Explanation**: Self-reporting of disciplinary or legal events must occur within 30 days.

---

### Practice More Questions
Test your clinical judgment on our [Full 85-Question RBT Mock Exam Simulator](/rbt/mock-exam)!
`,
    category: 'RBT Exam Guide',
    tags: ['Exam Questions', 'Test Strategies', 'DRL', 'Whole Interval'],
    coverImageUrl: '/banner-rbt-hero.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 7,
    status: 'published',
    viewsCount: 260,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art-practice-test-20',
    slug: 'rbt-practice-test-20-questions',
    title: 'RBT Practice Test: 20 Questions with Answer Key & Score Analyzer',
    summary: 'Test your knowledge with a timed 20-question RBT mini practice test. Includes automated score interpretation, answer keys, and next-step study guides.',
    content: `# RBT Practice Test: 20 Questions with Answer Key & Score Interpretation

*Disclaimer: RBT Practice AI is an independent study platform not endorsed by the BACB.*

Take this timed 20-question RBT practice test to evaluate your baseline readiness. Set a timer for **22 minutes** (which matches the official exam pace of ~1.05 minutes per question).

### Domain Coverage:
- Domain A: Measurement (3 Questions)
- Domain B: Assessment (2 Questions)
- Domain C: Skill Acquisition (6 Questions)
- Domain D: Behavior Reduction (5 Questions)
- Domain E: Documentation & Reporting (2 Questions)
- Domain F: Ethics & Professional Conduct (2 Questions)

---

### Sample Test Questions

#### Question 1 (Domain A)
Which of the following is a Permanent Product recording method?
- A. Counting how many times a student raises their hand during math
- **B. Counting the number of correctly solved math problems on a completed test paper (Correct)**
- C. Timing how long a student stays in their seat
- D. Recording interval data on vocal outbursts
> **Explanation**: Permanent products are concrete physical outcomes left behind by behavior.

#### Question 2 (Domain C)
In Forward Chaining, when is reinforcement delivered?
- **A. After the learner completes the first step independently (while subsequent steps are prompted/completed by therapist) (Correct)**
- B. Only after the last step of the chain is completed
- C. Before the session begins
- D. Never
> **Explanation**: Forward chaining teaches and reinforces Step 1 first, then Steps 1–2, etc.

#### Question 3 (Domain D)
An RBT places their hands between a client's hand and the client's forehead to physically prevent head-hitting behavior. What intervention was used?
- **A. Response Blocking (Correct)**
- B. Extinction
- C. Overcorrection
- D. Time-Out
> **Explanation**: Physically preventing a behavior from completing is response blocking.

---

### Score Interpretation
- **18–20 Correct (90%–100%)**: Exam Ready!
- **15–17 Correct (75%–85%)**: Solid Foundation.
- **Below 15 Correct (<75%)**: Needs Review before taking full mock exams.
`,
    category: 'RBT Exam Guide',
    tags: ['Practice Test', 'Mini Test', 'Score Analyzer', 'Chaining'],
    coverImageUrl: '/cert-badge-bacb.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 7,
    status: 'published',
    viewsCount: 340,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art-mock-exam-25',
    slug: 'mock-exam-25-questions',
    title: 'RBT Mock Exam: 25 Questions with Full Clinical Rationales',
    summary: 'Experience a realistic RBT mock exam with 25 mixed scenario, ethics, measurement, and skill-acquisition questions aligned with the 2026 BACB outline.',
    content: `# RBT Mock Exam: 25 Questions with Full Answer Rationales

*Disclaimer: RBT Practice AI is an independent mock examination simulator not affiliated with the BACB.*

This 25-question mock exam simulates the difficulty, scenario phrasing, and distribution of concepts found in current RBT certification examinations.

---

### Mock Questions

#### Question 1 (Domain A: Measurement)
Which of the following is the most appropriate way to display session-by-session rate data over a 6-month period in ABA?
- A. Pie Chart
- **B. Equal-Interval Line Graph (Correct)**
- C. Venn Diagram
- D. Word Cloud
> **Explanation**: Line graphs are the standard continuous visual analysis tool in ABA.

#### Question 2 (Domain B: Assessment)
In a Free Operant Preference Assessment, what does the RBT do?
- A. Forces the client to choose between two presented items on every trial.
- **B. Allows the client to freely interact with items in an enriched environment while measuring duration of engagement with each item. (Correct)**
- C. Withholds all toys until the client mands vocally.
- D. Presents items in an MSWO hierarchy.
> **Explanation**: Free Operant assessments provide unrestricted access with no demands.

#### Question 3 (Domain D: Behavior Reduction)
An RBT provides a high-five and a token every 3 minutes that a client does NOT engage in elopement (running away), regardless of what other appropriate behaviors occur. What procedure is this?
- **A. DRO (Differential Reinforcement of Other Behavior) (Correct)**
- B. DRA (Differential Reinforcement of Alternative Behavior)
- C. DRI (Differential Reinforcement of Incompatible Behavior)
- D. DRL (Differential Reinforcement of Low Rates)
> **Explanation**: DRO delivers reinforcement contingent on zero instances of problem behavior during an interval.

---

### Challenge Yourself
Take our timed [85-Question Realistic Mock Exam Simulator](/rbt/mock-exam) with live scoring!
`,
    category: 'Clinical Scenarios',
    tags: ['Mock Exam', 'Full Simulation', 'Free Operant', 'Graphing'],
    coverImageUrl: '/banner-rbt-hero.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 8,
    status: 'published',
    viewsCount: 380,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art-questions-by-topic',
    slug: 'practice-questions-by-topic',
    title: 'RBT Exam Practice Questions by Topic: 6 BACB Domains Explained',
    summary: 'Study RBT practice questions categorized by the 6 BACB 3rd Edition domains: Measurement, Assessment, Skill Acquisition, Behavior Reduction, Documentation, and Ethics.',
    content: `# RBT Exam Practice Questions by Topic: The Complete 6-Domain Breakdown

*Disclaimer: RBT Practice AI is an independent study tool not affiliated with the BACB.*

Isolating your study by topic allows you to identify clinical knowledge gaps and strengthen your weakest domain before test day.

## Domain Overview
- **Domain A: Measurement** (Continuous, Discontinuous, Permanent Product)
- **Domain B: Assessment** (Preference Assessments, ABC Data)
- **Domain C: Skill Acquisition** (DTT, NET, Chaining, Prompting)
- **Domain D: Behavior Reduction** (4 Functions, Differential Reinforcement, Extinction)
- **Domain E: Documentation** (Objective Notes, Abuse Reporting)
- **Domain F: Professional Conduct** (Ethics 2.0, Supervision Mandates)

---

### Topic Questions

#### Domain A: Measurement
An RBT checks every 5 minutes on the timer and records whether vocal humming is occurring at that exact second. What measurement system is being used?
- A. Whole-Interval Recording
- B. Partial-Interval Recording
- **C. Momentary Time Sampling (Correct)**
- D. Permanent Product

#### Domain C: Skill Acquisition
When teaching shoe-tying, the therapist completes all steps except the final loop-pull. When the child pulls the loop, the therapist immediately delivers praise and a token. What chaining procedure is this?
- A. Forward Chaining
- **B. Backward Chaining (Correct)**
- C. Total Task Chaining
- D. Massed Trials

#### Domain F: Ethics
A client's grandmother gives the RBT a handmade drawing that the client created in therapy. Can the RBT accept this?
- A. No, RBTs can never accept anything from a client's family.
- **B. Yes, accepting a non-monetary, handmade item of nominal value made by the client does not violate the BACB gift rule. (Correct)**
- C. Yes, but only if the RBT pays the grandmother $20.
- D. No, the RBT must report the grandmother to the BACB.
`,
    category: 'RBT Exam Guide',
    tags: ['Domains A-F', 'Topic Breakdown', 'Task List', 'MTS'],
    coverImageUrl: '/cert-badge-bacb.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 7,
    status: 'published',
    viewsCount: 310,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art-questions-explanations',
    slug: 'practice-questions-with-explanations',
    title: 'RBT Practice Questions With In-Depth Explanations & Rationales',
    summary: 'Master difficult RBT practice questions with comprehensive breakdown: Why the correct answer is right, why distractors are wrong, and clinical exam tips.',
    content: `# RBT Practice Questions With In-Depth Explanations & Clinical Rationales

*Disclaimer: RBT Practice AI is an independent exam-preparation platform.*

When studying for the RBT exam, knowing *why* an answer is correct is only half the battle. You must also understand *why the other three options are incorrect*.

---

### Detailed Question Breakdowns

#### Question 1 (Domain A: Measurement)
An RBT observes a learner for a 10-minute session divided into 1-minute intervals. The target behavior (vocal stereotypy) occurred from 0:15–0:30 in Interval 1, and 1:10–1:15 in Interval 2. If the RBT scores Interval 1 as $(+)$ and Interval 2 as $(+)$, what measurement system was used?
- A. Whole-Interval Recording
- **B. Partial-Interval Recording (Correct)**
- C. Momentary Time Sampling
- D. Latency Recording

**Why B is Correct**: In Partial-Interval Recording, an interval is scored as positive if the behavior occurs at *any point* during the interval.  
**Why Distractors are Incorrect**: Whole-interval requires all 60 seconds; Momentary checks only at the final second; Latency measures onset time.

---

### Practice More with AI Explanations
Have questions about ABA concepts? Chat with [Socrates AI Tutor](/tutor) for instant clinical rationales!
`,
    category: 'ABA Techniques',
    tags: ['Explanations', 'Rationales', 'Distractor Elimination', 'Partial Interval'],
    coverImageUrl: '/banner-rbt-hero.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 6,
    status: 'published',
    viewsCount: 295,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art-scenario-questions',
    slug: 'scenario-based-practice-questions',
    title: 'RBT Scenario-Based Practice Questions: Real-World Clinical Cases',
    summary: 'Practice with 15 complex scenario-based RBT practice questions set in real clinic, school, home, and community environments with clinical rationales.',
    content: `# RBT Scenario-Based Practice Questions: Real-World Clinical Case Studies

*Disclaimer: RBT Practice AI is an independent exam-preparation platform.*

The BACB RBT exam tests your ability to navigate nuanced, real-world clinical situations across diverse environments:
- **Clinic-Based Scenarios**: DTT, structured table transitions, peer play.
- **Home-Based Scenarios**: Sibling interactions, parent coaching boundaries, mealtime routines.
- **School-Based Scenarios**: Paraprofessional collaboration, classroom distractions, circle time routines.
- **Community-Based Scenarios**: Supermarket shopping, safety skills, stranger awareness.

---

### Scenario Probes

#### Scenario 1 (Home Environment: Parent Request & Ethical Boundaries)
While providing in-home therapy, the mother of a 4-year-old client says: "My husband and I are going out for our anniversary tonight. Could you stay an extra 2 hours after your session to watch the kids? We will pay you $30/hour in cash." How must the RBT respond?
- A. Accept the offer because it supports family rapport.
- **B. Politely explain that BACB ethical guidelines strictly prohibit dual relationships and paid personal babysitting with current clients, and decline the request. (Correct)**
- C. Accept the offer only if the BCBA approves.
- D. Agree to babysit for free.
> **Rationale**: Dual personal/financial relationships compromise clinical boundaries under Ethics Code 2.0 Section 1.07.

#### Scenario 2 (Clinic Setting: Differential Reinforcement)
A client frequently engages in hand-mouthing during tabletop activities. The BCBA designs a DRI (Differential Reinforcement of Incompatible Behavior) program. Which of the following behaviors should the RBT reinforce?
- A. Sitting quietly without saying anything
- **B. Clapping hands or holding a stress ball with both hands during the lesson (Correct)**
- C. Crying while keeping hands in mouth
- D. Running away from the table
> **Rationale**: Holding a stress ball with both hands makes hand-mouthing physically impossible at that moment.

---

### Master Clinical Application
Explore our [Scenario Bank on RBTPracticeAI](/exam)!
`,
    category: 'Clinical Scenarios',
    tags: ['Scenarios', 'Ethics', 'DRI', 'Dual Relationships'],
    coverImageUrl: '/cert-badge-bacb.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 7,
    status: 'published',
    viewsCount: 320,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art-easy-questions',
    slug: 'easy-rbt-practice-questions',
    title: 'Easy RBT Practice Questions: 20 Core Definition & Foundation Probes',
    summary: 'Build test-day confidence with 20 easy, introductory RBT practice questions. Learn essential definitions and basic ABA principles before advancing.',
    content: `# Easy RBT Practice Questions: Master the Fundamentals

*Disclaimer: RBT Practice AI is an independent study tool.*

Building confidence begins with mastering fundamental definitions. This quiz covers baseline terminology from the current BACB RBT 3rd Edition Test Content Outline.

---

### 5 Fast Sample Questions

1. **What is an Antecedent?**
   - **A. An event that occurs immediately *before* a behavior. (Correct)**
   - B. An event that occurs 3 days after a behavior.
   - C. A consequence that punishes behavior.
   - D. The client's medical diagnosis.

2. **What does ABA stand for?**
   - A. Automated Behavioral Assessment
   - **B. Applied Behavior Analysis (Correct)**
   - C. Association of Behavior Analysts
   - D. Annual Behavior Adjustment

3. **What is Duration in measurement?**
   - A. How many times a behavior occurs.
   - **B. How long a behavior lasts from start to finish. (Correct)**
   - C. The time between instruction and starting.
   - D. The weight of a client.

4. **Which of the following is a primary (unconditioned) reinforcer?**
   - A. A $10 bill
   - B. A gold star sticker
   - **C. A drink of water when thirsty (Correct)**
   - D. Praise ("Good job!")

5. **What is a Mand?**
   - **A. A request for a desired item or activity. (Correct)**
   - B. Labeling a picture.
   - C. Repeating what someone says.
   - D. Answering a conversational question.

---

### Ready to level up?
Advance to [Hard RBT Practice Questions](/rbt/questions/hard-rbt-practice-questions)!
`,
    category: 'Study Strategies',
    tags: ['Easy Questions', 'Glossary', 'Mand', 'Antecedent'],
    coverImageUrl: '/banner-rbt-hero.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 5,
    status: 'published',
    viewsCount: 280,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art-hard-questions',
    slug: 'hard-rbt-practice-questions',
    title: 'Hard RBT Practice Questions: 20 Advanced Clinical Scenarios',
    summary: 'Challenge yourself with 20 difficult, advanced RBT practice questions featuring complex scenarios, multi-step interventions, and strict ethics boundaries.',
    content: `# Hard RBT Practice Questions: Advanced Clinical Application & Problem Solving

*Disclaimer: RBT Practice AI is an independent study tool.*

Difficult RBT exam questions are not "trick questions"—they are challenging because they require deep clinical reasoning, precise understanding of experimental definitions, and the ability to differentiate between two clinically plausible interventions within the RBT scope of practice.

---

### Advanced Questions

#### Question 1 (Domain A: Measurement | Discontinuous Bias)
An RBT is measuring off-task vocalizations that occur in rapid, brief 1-second bursts throughout a 30-minute session. The BCBA needs a measurement system that will NOT overestimate the total duration of the behavior. Which system should the RBT avoid?
- A. Whole-Interval Recording
- **B. Partial-Interval Recording (Correct)**
- C. Latency Recording
- D. Momentary Time Sampling
> **Explanation**: Partial-interval recording inherently overestimates duration because a 1-second burst marks an entire interval as positive.

#### Question 2 (Domain C: Generalization Traps)
An RBT teaches a client to request a snack by vocally saying "I want pretzels please." Three weeks after mastery, the client independently says "Can I have pretzels please?" and "Pretzels now please." What behavioral phenomenon has taken place?
- A. Stimulus Generalization
- **B. Response Generalization (Correct)**
- C. Stimulus Discrimination
- D. Behavioral Contrast
> **Explanation**: Response Generalization occurs when untrained, topographically different responses produce the same functional outcome.

#### Question 3 (Domain F: Complex Ethical Dilemmas)
An RBT works at a clinic that requires staff to implement a 10-minute mechanical restraint protocol for non-injurious vocal whining. The RBT knows this protocol is unapproved, dangerous, and violates client dignity and the BACB Ethics Code. What is the RBT's mandatory ethical duty?
- A. Comply with clinic policy to avoid losing their job.
- **B. Refuse to implement the unapproved, harmful procedure, immediately inform the clinical director and BCBA supervisor, and report the safety violation to appropriate protective/regulatory authorities if unaddressed. (Correct)**
- C. Complain anonymously on social media.
- D. Restrain the client for only 5 minutes instead of 10.
> **Explanation**: RBTs have a mandatory duty to uphold client welfare, client dignity, and ethical standards above unlawful clinic directives.

---

### Test Your Limits
Simulate the real exam on our [Full 85-Question RBT Mock Exam Simulator](/rbt/mock-exam)!
`,
    category: 'Clinical Scenarios',
    tags: ['Hard Questions', 'Advanced Scenarios', 'Response Generalization', 'Ethics'],
    coverImageUrl: '/cert-badge-bacb.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 7,
    status: 'published',
    viewsCount: 360,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function calculateReadTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function getAllArticles(): Article[] {
  if (typeof window === 'undefined') return INITIAL_SEED_ARTICLES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_ARTICLES));
      return INITIAL_SEED_ARTICLES;
    }
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_SEED_ARTICLES;
  }
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((a) => a.status === 'published');
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find((a) => a.slug === slug.toLowerCase().trim()) || null;
}

export function saveArticles(articles: Article[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to save articles to localStorage:', e);
    }
  }
}

export function createArticle(input: CreateArticleInput): Article {
  const articles = getAllArticles();
  const baseSlug = generateSlug(input.title);
  let slug = baseSlug;
  let counter = 1;

  while (articles.some((a) => a.slug === slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  const now = new Date().toISOString();
  const newArticle: Article = {
    id: `art_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    slug,
    title: input.title.trim(),
    summary: input.summary.trim(),
    content: input.content,
    category: input.category || 'RBT Exam Guide',
    tags: input.tags || ['RBT'],
    coverImageUrl: input.coverImageUrl || '/banner-rbt-hero.png',
    authorName: input.authorName || 'Jobpe gyan',
    readTimeMinutes: calculateReadTime(input.content),
    status: input.status || 'draft',
    viewsCount: 0,
    publishedAt: input.status === 'published' ? now : undefined,
    createdAt: now,
    updatedAt: now,
  };

  const updatedList = [newArticle, ...articles];
  saveArticles(updatedList);

  if (newArticle.status === 'published') {
    try {
      const cfg = getIndexNowConfig();
      if (cfg.enabled && cfg.autoSubmitOnPublish) {
        submitToIndexNow(`/articles/${newArticle.slug}`, 'Article CMS (New Publish)');
      }
    } catch (e) { /* background non-blocking */ }
  }

  return newArticle;
}

export function updateArticle(input: UpdateArticleInput): Article | null {
  const articles = getAllArticles();
  const idx = articles.findIndex((a) => a.id === input.id);
  if (idx === -1) return null;

  const existing = articles[idx];
  const now = new Date().toISOString();

  let slug = existing.slug;
  if (input.title && input.title !== existing.title) {
    slug = generateSlug(input.title);
  }

  const updatedArticle: Article = {
    ...existing,
    ...(input.title && { title: input.title.trim() }),
    ...(input.summary && { summary: input.summary.trim() }),
    ...(input.content && { content: input.content, readTimeMinutes: calculateReadTime(input.content) }),
    ...(input.category && { category: input.category }),
    ...(input.tags && { tags: input.tags }),
    ...(input.coverImageUrl !== undefined && { coverImageUrl: input.coverImageUrl }),
    ...(input.authorName && { authorName: input.authorName }),
    ...(input.status && {
      status: input.status,
      publishedAt: input.status === 'published' && !existing.publishedAt ? now : existing.publishedAt,
    }),
    slug,
    updatedAt: now,
  };

  articles[idx] = updatedArticle;
  saveArticles(articles);
  return updatedArticle;
}

export function deleteArticle(id: string): boolean {
  const articles = getAllArticles();
  const filtered = articles.filter((a) => a.id !== id);
  if (filtered.length === articles.length) return false;
  saveArticles(filtered);
  return true;
}

export function incrementArticleViews(id: string): void {
  const articles = getAllArticles();
  const idx = articles.findIndex((a) => a.id === id);
  if (idx !== -1) {
    articles[idx].viewsCount = (articles[idx].viewsCount || 0) + 1;
    saveArticles(articles);
  }
}
