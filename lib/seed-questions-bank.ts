import { MasterQuestion } from '@/types/master-question';

/**
 * High-Yield BACB 3rd Edition Master Exam Questions
 * Covering all 6 Domains: Measurement (A), Assessment (B), Skill Acquisition (C),
 * Behavior Reduction (D), Documentation (E), and Ethics/Professional Conduct (F).
 */
export const FULL_BACB_SEED_QUESTIONS: MasterQuestion[] = [
  {
    "id": "q-a01-1",
    "certification": "RBT",
    "question": "An RBT tracks how many times a client slaps their own leg during a 30-minute session. What continuous measurement procedure is the RBT using?",
    "scenarioText": "The RBT uses a tally counter and clicks it every single time the leg-slapping behavior occurs from start to finish of the 30-minute period.",
    "questionType": "scenario_based",
    "difficulty": "easy",
    "options": [
      {
        "id": "A",
        "text": "Frequency (Count)",
        "isCorrect": true,
        "explanation": "Frequency is the direct tally count of behavior occurrences during an observation period."
      },
      {
        "id": "B",
        "text": "Duration",
        "isCorrect": false,
        "explanation": "Duration measures the elapsed time from onset to offset of behavior."
      },
      {
        "id": "C",
        "text": "Latency",
        "isCorrect": false,
        "explanation": "Latency measures time between stimulus and response start."
      },
      {
        "id": "D",
        "text": "Inter-Response Time (IRT)",
        "isCorrect": false,
        "explanation": "IRT measures time between two consecutive responses."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Frequency (Count) is a continuous measurement procedure that records the total number of times a behavior occurs.",
    "clinicalExplanation": "BACB Item A-01: Frequency recording is appropriate for discrete behaviors with clear start and end points.",
    "references": "BACB RBT 3rd Edition TCO Item A-01",
    "category": "Data Collection and Graphing",
    "subCategory": "Continuous Measurement",
    "keywords": [
      "Frequency",
      "Count",
      "Continuous Measurement",
      "A-01"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-a01-2",
    "certification": "RBT",
    "question": "An RBT calculates that a learner engaged in 12 instances of vocal outbursts during a 3-hour observation. What rate of behavior should the RBT record?",
    "scenarioText": "Total count = 12 outbursts. Total session duration = 3 hours.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "4 outbursts per hour",
        "isCorrect": true,
        "explanation": "Rate = Total Count / Total Time = 12 / 3 = 4 per hour."
      },
      {
        "id": "B",
        "text": "12 outbursts per hour",
        "isCorrect": false,
        "explanation": "Does not divide by total hours."
      },
      {
        "id": "C",
        "text": "3 outbursts per hour",
        "isCorrect": false,
        "explanation": "Incorrect math."
      },
      {
        "id": "D",
        "text": "36 outbursts per hour",
        "isCorrect": false,
        "explanation": "Multiplied instead of dividing."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Rate is calculated by dividing total frequency count by observation time unit (12 / 3 hours = 4 per hour).",
    "clinicalExplanation": "BACB Item A-01: Rate provides a standardized measure when observation session lengths vary.",
    "references": "BACB RBT 3rd Edition TCO Item A-01",
    "category": "Data Collection and Graphing",
    "subCategory": "Continuous Measurement",
    "keywords": [
      "Rate",
      "Frequency",
      "Calculation",
      "A-01"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-a02-1",
    "certification": "RBT",
    "question": "Which continuous measurement procedure is most appropriate for recording how long a tantrum lasts from start to finish?",
    "scenarioText": "When the child begins screaming and lying on the floor, the RBT starts a digital timer and stops it when the child stops screaming for 30 consecutive seconds.",
    "questionType": "scenario_based",
    "difficulty": "easy",
    "options": [
      {
        "id": "A",
        "text": "Duration",
        "isCorrect": true,
        "explanation": "Duration measures total elapsed time of a single behavior event."
      },
      {
        "id": "B",
        "text": "Latency",
        "isCorrect": false,
        "explanation": "Latency measures delay before behavior starts."
      },
      {
        "id": "C",
        "text": "Partial Interval",
        "isCorrect": false,
        "explanation": "Discontinuous measurement sampling procedure."
      },
      {
        "id": "D",
        "text": "IRT",
        "isCorrect": false,
        "explanation": "IRT measures time elapsed between two separate responses."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Duration recording measures the total amount of time from onset of behavior until offset.",
    "clinicalExplanation": "BACB Item A-02: Duration is ideal for behaviors with prolonged onset-to-offset times such as tantrums.",
    "references": "BACB RBT 3rd Edition TCO Item A-02",
    "category": "Data Collection and Graphing",
    "subCategory": "Continuous Measurement",
    "keywords": [
      "Duration",
      "Continuous Measurement",
      "A-02"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-a02-2",
    "certification": "RBT",
    "question": "An RBT measures the time between the end of a teacher's instruction (\"Sit down\") and when the student begins to sit down. What measure is being taken?",
    "scenarioText": "Instruction given at 10:00:00 AM. Student begins sitting down at 10:00:05 AM. Time recorded = 5 seconds.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Latency",
        "isCorrect": true,
        "explanation": "Latency is the elapsed time from SD presentation to initiation of response."
      },
      {
        "id": "B",
        "text": "Duration",
        "isCorrect": false,
        "explanation": "Duration is length of behavior execution."
      },
      {
        "id": "C",
        "text": "IRT",
        "isCorrect": false,
        "explanation": "IRT is time between two responses."
      },
      {
        "id": "D",
        "text": "Whole Interval",
        "isCorrect": false,
        "explanation": "Whole interval is discontinuous sampling."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Latency measures the temporal locus: time from stimulus presentation (SD) to initiation of behavior.",
    "clinicalExplanation": "BACB Item A-02: Latency measurement evaluates response prompt compliance speed.",
    "references": "BACB RBT 3rd Edition TCO Item A-02",
    "category": "Data Collection and Graphing",
    "subCategory": "Continuous Measurement",
    "keywords": [
      "Latency",
      "Prompt Response",
      "A-02"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-a03-1",
    "certification": "RBT",
    "question": "What discontinuous measurement system is being used when an RBT marks (+) if the behavior occurs at ANY point during a 10-second interval?",
    "scenarioText": "The session is split into 10-second intervals. If hand-mouthing occurs for even 1 second during an interval, the RBT scores (+).",
    "questionType": "scenario_based",
    "difficulty": "easy",
    "options": [
      {
        "id": "A",
        "text": "Partial Interval Recording",
        "isCorrect": true,
        "explanation": "Partial interval scores (+) if target behavior occurs at any point in interval."
      },
      {
        "id": "B",
        "text": "Whole Interval Recording",
        "isCorrect": false,
        "explanation": "Whole interval requires behavior to persist for ENTIRE duration."
      },
      {
        "id": "C",
        "text": "Momentary Time Sampling",
        "isCorrect": false,
        "explanation": "Scores (+) only if behavior occurs at exact end moment of interval."
      },
      {
        "id": "D",
        "text": "Permanent Product",
        "isCorrect": false,
        "explanation": "Measures physical artifacts."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Partial Interval Recording tends to OVERESTIMATE behavior occurrence because any brief instance marks the full interval positive.",
    "clinicalExplanation": "BACB Item A-03: Partial interval recording is useful for reduction behaviors where brief instances matter.",
    "references": "BACB RBT 3rd Edition TCO Item A-03",
    "category": "Data Collection and Graphing",
    "subCategory": "Discontinuous Measurement",
    "keywords": [
      "Partial Interval",
      "Discontinuous Measurement",
      "Overestimate",
      "A-03"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-a03-2",
    "certification": "RBT",
    "question": "An RBT records a (+) ONLY IF the learner engages in quiet sitting for the ENTIRE 20-second interval without stopping. What sampling method is this?",
    "scenarioText": "If the learner stands up at second 18 of a 20-second interval, the RBT marks (-).",
    "questionType": "scenario_based",
    "difficulty": "easy",
    "options": [
      {
        "id": "A",
        "text": "Whole Interval Recording",
        "isCorrect": true,
        "explanation": "Whole interval requires continuous behavior throughout the complete interval."
      },
      {
        "id": "B",
        "text": "Partial Interval Recording",
        "isCorrect": false,
        "explanation": "Partial interval scores (+) for any brief instance."
      },
      {
        "id": "C",
        "text": "Momentary Time Sampling",
        "isCorrect": false,
        "explanation": "Scores (+) at exact moment interval timer rings."
      },
      {
        "id": "D",
        "text": "Frequency Tally",
        "isCorrect": false,
        "explanation": "Continuous tally count."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Whole Interval Recording tends to UNDERESTIMATE behavior occurrence because any brief interruption makes the interval negative.",
    "clinicalExplanation": "BACB Item A-03: Whole interval recording is used for target behaviors aimed at increasing continuous duration.",
    "references": "BACB RBT 3rd Edition TCO Item A-03",
    "category": "Data Collection and Graphing",
    "subCategory": "Discontinuous Measurement",
    "keywords": [
      "Whole Interval",
      "Underestimate",
      "A-03"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-a03-3",
    "certification": "RBT",
    "question": "An RBT looks up at a timer beep at the end of every 2 minutes and marks (+) if the client is currently looking at the teacher. What measurement is used?",
    "scenarioText": "Interval = 2 minutes. The RBT pays attention to other tasks until timer beeps, then looks up at that exact second.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Momentary Time Sampling (MTS)",
        "isCorrect": true,
        "explanation": "MTS checks occurrence at exact moment interval ends."
      },
      {
        "id": "B",
        "text": "Partial Interval Recording",
        "isCorrect": false,
        "explanation": "Checks occurrence throughout entire interval."
      },
      {
        "id": "C",
        "text": "Whole Interval Recording",
        "isCorrect": false,
        "explanation": "Requires behavior throughout entire interval."
      },
      {
        "id": "D",
        "text": "Rate Recording",
        "isCorrect": false,
        "explanation": "Calculates count per time."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Momentary Time Sampling is convenient for group settings because observer does not need continuous visual attention.",
    "clinicalExplanation": "BACB Item A-03: MTS is useful for high-frequency or continuous behaviors when continuous observation is impractical.",
    "references": "BACB RBT 3rd Edition TCO Item A-03",
    "category": "Data Collection and Graphing",
    "subCategory": "Discontinuous Measurement",
    "keywords": [
      "Momentary Time Sampling",
      "MTS",
      "A-03"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-a04-1",
    "certification": "RBT",
    "question": "An RBT checks how many math worksheets a student completed independently while the RBT was working with another child. What measurement procedure is being used?",
    "scenarioText": "The RBT counts 8 completed worksheets in the turn-in bin without observing the student during the task.",
    "questionType": "scenario_based",
    "difficulty": "easy",
    "options": [
      {
        "id": "A",
        "text": "Permanent Product Recording",
        "isCorrect": true,
        "explanation": "Permanent product measures tangible environmental outcomes left by behavior without direct observation."
      },
      {
        "id": "B",
        "text": "Momentary Time Sampling",
        "isCorrect": false,
        "explanation": "Requires looking at student when timer beeps."
      },
      {
        "id": "C",
        "text": "Duration Recording",
        "isCorrect": false,
        "explanation": "Requires timing start and end of work."
      },
      {
        "id": "D",
        "text": "Latency Recording",
        "isCorrect": false,
        "explanation": "Measures delay before starting."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Permanent Product Recording measures the physical output or lasting outcome of a behavior.",
    "clinicalExplanation": "BACB Item A-04: Permanent product recording does not require direct observation during behavior execution.",
    "references": "BACB RBT 3rd Edition TCO Item A-04",
    "category": "Data Collection and Graphing",
    "subCategory": "Permanent Product",
    "keywords": [
      "Permanent Product",
      "A-04"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-a05-1",
    "certification": "RBT",
    "question": "On a line graph, what is the horizontal line at the bottom called?",
    "scenarioText": "An RBT is graphing session trial data for baseline vs intervention.",
    "questionType": "multiple_choice",
    "difficulty": "easy",
    "options": [
      {
        "id": "A",
        "text": "Y-Axis (Ordinate)",
        "isCorrect": false,
        "explanation": "Y-axis is vertical."
      },
      {
        "id": "B",
        "text": "X-Axis (Abscissa)",
        "isCorrect": true,
        "explanation": "The horizontal axis is the X-axis (Abscissa), representing time or sessions."
      },
      {
        "id": "C",
        "text": "Phase Change Line",
        "isCorrect": false,
        "explanation": "Phase change line is vertical dashed line."
      },
      {
        "id": "D",
        "text": "Data Path",
        "isCorrect": false,
        "explanation": "Data path connects data points."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "The X-axis (Abscissa) is the horizontal axis representing time, days, or session numbers.",
    "clinicalExplanation": "BACB Item A-05: Understanding graphic visual analysis is essential for identifying trend and level changes.",
    "references": "BACB RBT 3rd Edition TCO Item A-05",
    "category": "Data Collection and Graphing",
    "subCategory": "Graphing Data",
    "keywords": [
      "X-Axis",
      "Abscissa",
      "Graphing",
      "A-05"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-b01-1",
    "certification": "RBT",
    "question": "Which preference assessment methodology is the RBT conducting when chosen items are removed from the array before presenting the remaining items?",
    "scenarioText": "During a preference assessment, an RBT presents 5 toys on a table. The child selects a toy car, plays with it for 30 seconds, and the RBT REMOVES the car from the room before presenting the remaining 4 toys.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Multiple Stimulus WITH Replacement (MSW)",
        "isCorrect": false,
        "explanation": "In MSW, chosen item is placed back."
      },
      {
        "id": "B",
        "text": "Multiple Stimulus WITHOUT Replacement (MSWO)",
        "isCorrect": true,
        "explanation": "In MSWO, chosen items are removed from array."
      },
      {
        "id": "C",
        "text": "Paired Choice (Forced Choice)",
        "isCorrect": false,
        "explanation": "Presents only 2 items at a time."
      },
      {
        "id": "D",
        "text": "Naturalistic Free Operant",
        "isCorrect": false,
        "explanation": "Allows unrestricted access."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Multiple Stimulus Without Replacement (MSWO) is efficient because selected items are withheld, allowing rapid hierarchy ranking.",
    "clinicalExplanation": "MSWO is an efficient assessment method for establishing preference hierarchies.",
    "references": "BACB RBT 3rd Edition TCO Item B-01",
    "category": "Behavior Assessment",
    "subCategory": "Preference Assessment",
    "keywords": [
      "MSWO",
      "Preference Assessment",
      "B-01"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-b01-2",
    "certification": "RBT",
    "question": "An RBT places 2 items at a time in front of a child and records which item the child touches first across all possible pairings. What preference assessment is this?",
    "scenarioText": "The RBT pairs Item A vs B, A vs C, B vs C, etc. until every item has been paired against every other item.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Paired Choice (Forced Choice)",
        "isCorrect": true,
        "explanation": "Paired choice presents 2 items simultaneously in randomized trial pairs."
      },
      {
        "id": "B",
        "text": "Free Operant Assessment",
        "isCorrect": false,
        "explanation": "Free operant observes free play."
      },
      {
        "id": "C",
        "text": "Multiple Stimulus Without Replacement",
        "isCorrect": false,
        "explanation": "Presents 3+ items simultaneously."
      },
      {
        "id": "D",
        "text": "Single Stimulus Assessment",
        "isCorrect": false,
        "explanation": "Presents 1 item at a time."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Paired Choice (Forced Choice) presents items in pairs until all combinations are tested.",
    "clinicalExplanation": "High accuracy for establishing rankings, but time-intensive.",
    "references": "BACB RBT 3rd Edition TCO Item B-01",
    "category": "Behavior Assessment",
    "subCategory": "Preference Assessment",
    "keywords": [
      "Paired Choice",
      "Preference Assessment",
      "B-01"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-b02-1",
    "certification": "RBT",
    "question": "What type of assessment data is an RBT recording when logging Antecedents, Behaviors, and Consequences during a session?",
    "scenarioText": "Child screams (Behavior) -> Teacher gives tablet (Consequence) -> Teacher presented math sheet (Antecedent).",
    "questionType": "scenario_based",
    "difficulty": "easy",
    "options": [
      {
        "id": "A",
        "text": "Descriptive ABC Functional Assessment Data",
        "isCorrect": true,
        "explanation": "Descriptive ABC recording documents environmental variables surrounding behavior."
      },
      {
        "id": "B",
        "text": "Experimental Functional Analysis",
        "isCorrect": false,
        "explanation": "Involves systematic manipulation of conditions by BCBA."
      },
      {
        "id": "C",
        "text": "Preference Hierarchy Data",
        "isCorrect": false,
        "explanation": "Measures stimulus preference."
      },
      {
        "id": "D",
        "text": "Probe Baseline Assessment",
        "isCorrect": false,
        "explanation": "Measures skill acquisition baseline."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "ABC Data collection involves observing and recording the environmental events immediately preceding and following a behavior.",
    "clinicalExplanation": "BACB Item B-02: ABC descriptive data assists BCBA in hypothesizing behavior function.",
    "references": "BACB RBT 3rd Edition TCO Item B-02",
    "category": "Behavior Assessment",
    "subCategory": "ABC Data",
    "keywords": [
      "ABC Data",
      "Antecedent",
      "Consequence",
      "B-02"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-c04-1",
    "certification": "RBT",
    "question": "This structured teaching trial represents which ABA procedure: SD -> Prompt -> Response -> Reinforcer -> Inter-Trial Interval?",
    "scenarioText": "RBT says \"Touch Red\", immediately points to red card, child touches red, RBT gives token, waits 3 seconds before next trial.",
    "questionType": "scenario_based",
    "difficulty": "easy",
    "options": [
      {
        "id": "A",
        "text": "Discrete Trial Training (DTT)",
        "isCorrect": true,
        "explanation": "DTT consists of clear trial units with SD, prompt, response, consequence, and ITI."
      },
      {
        "id": "B",
        "text": "Incidental Teaching",
        "isCorrect": false,
        "explanation": "Child-led naturalistic teaching."
      },
      {
        "id": "C",
        "text": "Shaping",
        "isCorrect": false,
        "explanation": "Reinforcing successive approximations."
      },
      {
        "id": "D",
        "text": "Chaining",
        "isCorrect": false,
        "explanation": "Linking task analysis steps."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Discrete Trial Training (DTT) is a structured, instructor-led ABA method that breaks skills down into small, repeatable discrete units.",
    "clinicalExplanation": "BACB Item C-04: DTT trial components must follow precise timing sequences.",
    "references": "BACB RBT 3rd Edition TCO Item C-04",
    "category": "Behavior Acquisition",
    "subCategory": "Discrete Trial Training",
    "keywords": [
      "DTT",
      "Discrete Trial Training",
      "C-04"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-c05-1",
    "certification": "RBT",
    "question": "An RBT embeds receptive color identification into a play session when the child reaches for a blue train. What teaching method is this?",
    "scenarioText": "During free play, the child reaches for blue train. RBT holds blue train and asks \"What color?\" or \"Point to blue train\" before handing train over.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Naturalistic / Incidental Teaching (NET)",
        "isCorrect": true,
        "explanation": "NET utilizes child motivation in natural play settings to teach target skills."
      },
      {
        "id": "B",
        "text": "Discrete Trial Training",
        "isCorrect": false,
        "explanation": "Instructor-led structured desk work."
      },
      {
        "id": "C",
        "text": "Backward Chaining",
        "isCorrect": false,
        "explanation": "Task analysis completion from last step."
      },
      {
        "id": "D",
        "text": "Extinction",
        "isCorrect": false,
        "explanation": "Withholding reinforcement."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Naturalistic Teaching Procedures (NET / Incidental Teaching) build learning opportunities directly into naturalistic child-initiated play contexts.",
    "clinicalExplanation": "BACB Item C-05: Naturalistic procedures enhance skill generalization across environments.",
    "references": "BACB RBT 3rd Edition TCO Item C-05",
    "category": "Behavior Acquisition",
    "subCategory": "Naturalistic Teaching",
    "keywords": [
      "NET",
      "Incidental Teaching",
      "Naturalistic",
      "C-05"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-c06-1",
    "certification": "RBT",
    "question": "Which chaining procedure is being implemented when the RBT prompts the child through steps 1-5 of handwashing, but requires the child to independently turn off water (step 6) to earn reinforcement?",
    "scenarioText": "Task analysis: 1. Turn on faucet 2. Wet hands 3. Apply soap 4. Rub hands 5. Rinse 6. Turn off faucet. RBT does steps 1-5 with child, child does step 6 independently.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Backward Chaining",
        "isCorrect": true,
        "explanation": "Backward chaining teaches final step first so learner experiences natural completion reinforcement."
      },
      {
        "id": "B",
        "text": "Forward Chaining",
        "isCorrect": false,
        "explanation": "Teaches step 1 first."
      },
      {
        "id": "C",
        "text": "Total Task Chaining",
        "isCorrect": false,
        "explanation": "Prompts every step as needed in one attempt."
      },
      {
        "id": "D",
        "text": "Shaping",
        "isCorrect": false,
        "explanation": "Differs from chaining discrete task steps."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Backward Chaining completes all initial steps for the learner and trains the last step of the task analysis first.",
    "clinicalExplanation": "BACB Item C-06: Backward chaining provides immediate primary or secondary reinforcement upon task completion.",
    "references": "BACB RBT 3rd Edition TCO Item C-06",
    "category": "Behavior Acquisition",
    "subCategory": "Chaining",
    "keywords": [
      "Backward Chaining",
      "Task Analysis",
      "C-06"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-c06-2",
    "certification": "RBT",
    "question": "An RBT teaches a 6-step handwashing task by reinforcing independent completion of Step 1 (Turn on water) first, while prompting steps 2-6. What procedure is this?",
    "scenarioText": "Step 1 = independent. Steps 2-6 = full physical assistance.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Forward Chaining",
        "isCorrect": true,
        "explanation": "Forward chaining teaches the first step of a task analysis to mastery before advancing."
      },
      {
        "id": "B",
        "text": "Backward Chaining",
        "isCorrect": false,
        "explanation": "Teaches final step first."
      },
      {
        "id": "C",
        "text": "Total Task Presentation",
        "isCorrect": false,
        "explanation": "Prompts all steps as needed."
      },
      {
        "id": "D",
        "text": "Stimulus Fading",
        "isCorrect": false,
        "explanation": "Fading visual/physical stimuli."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Forward Chaining starts at the first step of the task analysis and progresses systematically through the chain.",
    "clinicalExplanation": "BACB Item C-06: Forward chaining builds behavioral momentum from step 1 onward.",
    "references": "BACB RBT 3rd Edition TCO Item C-06",
    "category": "Behavior Acquisition",
    "subCategory": "Chaining",
    "keywords": [
      "Forward Chaining",
      "Task Analysis",
      "C-06"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-c07-1",
    "certification": "RBT",
    "question": "An RBT provides Full Physical guidance -> Partial Physical -> Modeling -> Verbal -> Independent. What prompt hierarchy is being implemented?",
    "scenarioText": "Starting with most intrusive prompt and fading down to least intrusive prompt.",
    "questionType": "scenario_based",
    "difficulty": "easy",
    "options": [
      {
        "id": "A",
        "text": "Most-to-Least Prompting (MTL)",
        "isCorrect": true,
        "explanation": "MTL starts with high prompt intrusive support and systematically fades down."
      },
      {
        "id": "B",
        "text": "Least-to-Most Prompting (LTM)",
        "isCorrect": false,
        "explanation": "LTM starts with independent or verbal first."
      },
      {
        "id": "C",
        "text": "Time Delay Prompting",
        "isCorrect": false,
        "explanation": "Inserts time delay before prompt."
      },
      {
        "id": "D",
        "text": "Graduated Guidance",
        "isCorrect": false,
        "explanation": "Fades physical contact during single trial."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Most-to-Least Prompting begins with the highest level of assistance to minimize errors, then fades to less intrusive prompts.",
    "clinicalExplanation": "BACB Item C-07: MTL prompting is effective for errorless learning during new skill acquisition.",
    "references": "BACB RBT 3rd Edition TCO Item C-07",
    "category": "Behavior Acquisition",
    "subCategory": "Prompting",
    "keywords": [
      "Most to Least",
      "Prompting Hierarchy",
      "C-07"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-d04-1",
    "certification": "RBT",
    "question": "Which differential reinforcement procedure provides reinforcement when the problem behavior does NOT occur during a specific period of time, regardless of what other behavior occurs?",
    "scenarioText": "Every 5 minutes that screaming does NOT occur, RBT gives a token. If student taps pencil or wiggles, token is still awarded as long as NO screaming occurred.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Differential Reinforcement of OTHER Behavior (DRO)",
        "isCorrect": true,
        "explanation": "DRO delivers reinforcement for omission of problem behavior during interval."
      },
      {
        "id": "B",
        "text": "Differential Reinforcement of ALTERNATIVE Behavior (DRA)",
        "isCorrect": false,
        "explanation": "DRA requires specific replacement behavior."
      },
      {
        "id": "C",
        "text": "Differential Reinforcement of INCOMPATIBLE Behavior (DRI)",
        "isCorrect": false,
        "explanation": "DRI requires behavior physically incompatible with problem."
      },
      {
        "id": "D",
        "text": "DRL",
        "isCorrect": false,
        "explanation": "DRL reinforces lower rates of behavior."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "DRO (Differential Reinforcement of Other Behavior) reinforces the absence of the target problem behavior during predetermined intervals.",
    "clinicalExplanation": "BACB Item D-04: DRO interval setting must be based on baseline inter-response times.",
    "references": "BACB RBT 3rd Edition TCO Item D-04",
    "category": "Behavior Reduction",
    "subCategory": "Differential Reinforcement",
    "keywords": [
      "DRO",
      "Differential Reinforcement",
      "D-04"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-d04-2",
    "certification": "RBT",
    "question": "An RBT reinforces a learner for handing over a \"Break Please\" PECS card instead of engaging in property destruction to escape work. What procedure is this?",
    "scenarioText": "Target behavior to reduce = property destruction (function = escape). Replacement behavior = functional mand for break.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Differential Reinforcement of Alternative Behavior (DRA)",
        "isCorrect": true,
        "explanation": "DRA reinforces functional replacement behavior while extinguishing problem behavior."
      },
      {
        "id": "B",
        "text": "Differential Reinforcement of Other Behavior (DRO)",
        "isCorrect": false,
        "explanation": "DRO reinforces absence of behavior without requiring specific mand."
      },
      {
        "id": "C",
        "text": "Response Blocking",
        "isCorrect": false,
        "explanation": "Physical prevention of behavior."
      },
      {
        "id": "D",
        "text": "Overcorrection",
        "isCorrect": false,
        "explanation": "Punishment procedure."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "DRA (Differential Reinforcement of Alternative Behavior) reinforces a functional alternative communication response that serves the same function.",
    "clinicalExplanation": "BACB Item D-04: Functional Communication Training (FCT) is a primary application of DRA.",
    "references": "BACB RBT 3rd Edition TCO Item D-04",
    "category": "Behavior Reduction",
    "subCategory": "Differential Reinforcement",
    "keywords": [
      "DRA",
      "FCT",
      "Replacement Behavior",
      "D-04"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-d05-1",
    "certification": "RBT",
    "question": "How should the RBT interpret a sudden temporary increase in screaming intensity and frequency immediately after implementing an attention-extinction procedure?",
    "scenarioText": "RBT stops providing verbal attention for screaming. In session 1 of extinction, screaming increases by 200% and child stomps feet.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Extinction Burst",
        "isCorrect": true,
        "explanation": "An extinction burst is a predictable temporary increase in target behavior upon extinction implementation."
      },
      {
        "id": "B",
        "text": "Spontaneous Recovery",
        "isCorrect": false,
        "explanation": "Re-emergence after behavior was previously extinguished."
      },
      {
        "id": "C",
        "text": "Reinforcement Failure",
        "isCorrect": false,
        "explanation": "Extinction burst is an expected phenomenon, not failure."
      },
      {
        "id": "D",
        "text": "Response Generalization",
        "isCorrect": false,
        "explanation": "Spreading of response topographies."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "An Extinction Burst is an immediate, temporary spike in frequency, intensity, or variability of a behavior when reinforcement is first withheld.",
    "clinicalExplanation": "BACB Item D-05: RBTs must maintain extinction consistency during extinction bursts to prevent accidentally reinforcing higher magnitude behavior.",
    "references": "BACB RBT 3rd Edition TCO Item D-05",
    "category": "Behavior Reduction",
    "subCategory": "Extinction",
    "keywords": [
      "Extinction Burst",
      "Extinction",
      "D-05"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-e03-1",
    "certification": "RBT",
    "question": "Select the most objective session note entry compliant with BACB standards:",
    "scenarioText": "RBT is writing session documentation at the end of a 2-hour ABA session.",
    "questionType": "multiple_choice",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Client engaged in 4 instances of crying lasting total 12 mins following task demand; completed 15/20 DTT trials independently.",
        "isCorrect": true,
        "explanation": "Objective notes state measurable data without subjective inferences."
      },
      {
        "id": "B",
        "text": "Client was angry and manipulation-seeking all session because he had a bad morning.",
        "isCorrect": false,
        "explanation": "Subjective mentalistic statements."
      },
      {
        "id": "C",
        "text": "Client felt sad and lazy today.",
        "isCorrect": false,
        "explanation": "Mentalistic assumptions."
      },
      {
        "id": "D",
        "text": "Client was rude to RBT.",
        "isCorrect": false,
        "explanation": "Non-behavioral subjective opinion."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "BACB documentation requires objective, measurable, behavioral descriptions free of mentalistic or subjective bias.",
    "clinicalExplanation": "BACB Item E-03: Session notes must contain clear behavioral descriptions and quantitative data metrics.",
    "references": "BACB RBT 3rd Edition TCO Item E-03",
    "category": "Documentation and Reporting",
    "subCategory": "Session Documentation",
    "keywords": [
      "Objective Notes",
      "Session Notes",
      "E-03"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-f02-1",
    "certification": "RBT",
    "question": "According to the BACB Ethics Code for RBTs, what is an RBT required to do if a client's parent offers a $50 gift card to a restaurant as a holiday thank-you?",
    "scenarioText": "Parent hands RBT a card containing $50 gift card at the end of session.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Politely decline the gift and explain BACB ethical guidelines regarding gifts.",
        "isCorrect": true,
        "explanation": "RBTs may not accept gifts exceeding $10 (or monetary gifts/gift cards) to prevent dual relationships."
      },
      {
        "id": "B",
        "text": "Accept the gift card if it is under $100.",
        "isCorrect": false,
        "explanation": "Violates gift policy."
      },
      {
        "id": "C",
        "text": "Accept gift card but share it with BCBA.",
        "isCorrect": false,
        "explanation": "Still violates gift rules."
      },
      {
        "id": "D",
        "text": "Keep gift card secret.",
        "isCorrect": false,
        "explanation": "Unethical."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Under BACB RBT Ethics Code 2.0 (Item 1.10), RBTs do not accept gifts, cash, or gift cards from clients or families.",
    "clinicalExplanation": "BACB Item F-02: Maintaining professional boundaries protects therapeutic integrity.",
    "references": "BACB RBT 3rd Edition TCO Item F-02",
    "category": "Ethics",
    "subCategory": "Professional Boundaries",
    "keywords": [
      "Ethics",
      "Gift Policy",
      "Multiple Relationships",
      "F-02"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-f04-1",
    "certification": "RBT",
    "question": "What is the minimum number of supervised ABA hours an RBT must receive each calendar month under BACB supervision rules?",
    "scenarioText": "An RBT works 100 hours in a calendar month providing direct ABA services to clients.",
    "questionType": "multiple_choice",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "5% of total direct ABA service hours",
        "isCorrect": true,
        "explanation": "BACB requires at least 5% of monthly direct service hours to be supervised by a BCBA/BCaBA."
      },
      {
        "id": "B",
        "text": "10% of total hours",
        "isCorrect": false,
        "explanation": "Exceeds minimum requirement."
      },
      {
        "id": "C",
        "text": "1 hour per week fixed",
        "isCorrect": false,
        "explanation": "Supervision is calculated as percentage of direct service hours."
      },
      {
        "id": "D",
        "text": "2 hours total per year",
        "isCorrect": false,
        "explanation": "Incorrect."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "RBT supervision regulations require a minimum of 5% of direct client service hours to be supervised monthly across at least 2 meetings.",
    "clinicalExplanation": "BACB Item F-04: Ongoing BCBA supervision compliance is mandatory to maintain active RBT certification.",
    "references": "BACB RBT 3rd Edition TCO Item F-04",
    "category": "Ethics",
    "subCategory": "Supervision Requirements",
    "keywords": [
      "Supervision",
      "5 Percent",
      "BACB Requirements",
      "F-04"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-01T10:00:00.000Z",
    "updatedAt": "2026-08-01T10:00:00.000Z",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ]
  },
  {
    "id": "q-f-gen-100",
    "certification": "RBT",
    "question": "[Domain F High-Yield Item 4] Clinical Scenario: An RBT is implementing target protocols for Ethics according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 4: The learner demonstrates target behavior during a structured therapy trial in Domain F.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Ethics task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item F-04."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item F-04.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain F: Ethics.",
    "references": "BACB RBT 3rd Edition TCO Item F-04",
    "category": "Ethics",
    "subCategory": "Domain F Core Skills",
    "keywords": [
      "Ethics",
      "Domain F",
      "Item F-04"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.881Z",
    "updatedAt": "2026-08-09T06:44:44.882Z"
  },
  {
    "id": "q-a-gen-101",
    "certification": "RBT",
    "question": "[Domain A High-Yield Item 5] Clinical Scenario: An RBT is implementing target protocols for Data Collection and Graphing according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 5: The learner demonstrates target behavior during a structured therapy trial in Domain A.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Data Collection and Graphing task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item A-05."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item A-05.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain A: Data Collection and Graphing.",
    "references": "BACB RBT 3rd Edition TCO Item A-05",
    "category": "Data Collection and Graphing",
    "subCategory": "Domain A Core Skills",
    "keywords": [
      "Data Collection and Graphing",
      "Domain A",
      "Item A-05"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.882Z",
    "updatedAt": "2026-08-09T06:44:44.882Z"
  },
  {
    "id": "q-b-gen-102",
    "certification": "RBT",
    "question": "[Domain B High-Yield Item 6] Clinical Scenario: An RBT is implementing target protocols for Behavior Assessment according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 6: The learner demonstrates target behavior during a structured therapy trial in Domain B.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Assessment task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item B-06."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item B-06.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain B: Behavior Assessment.",
    "references": "BACB RBT 3rd Edition TCO Item B-06",
    "category": "Behavior Assessment",
    "subCategory": "Domain B Core Skills",
    "keywords": [
      "Behavior Assessment",
      "Domain B",
      "Item B-06"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.882Z",
    "updatedAt": "2026-08-09T06:44:44.882Z"
  },
  {
    "id": "q-c-gen-103",
    "certification": "RBT",
    "question": "[Domain C High-Yield Item 7] Clinical Scenario: An RBT is implementing target protocols for Behavior Acquisition according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 7: The learner demonstrates target behavior during a structured therapy trial in Domain C.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Acquisition task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item C-07."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item C-07.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain C: Behavior Acquisition.",
    "references": "BACB RBT 3rd Edition TCO Item C-07",
    "category": "Behavior Acquisition",
    "subCategory": "Domain C Core Skills",
    "keywords": [
      "Behavior Acquisition",
      "Domain C",
      "Item C-07"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.882Z",
    "updatedAt": "2026-08-09T06:44:44.882Z"
  },
  {
    "id": "q-d-gen-104",
    "certification": "RBT",
    "question": "[Domain D High-Yield Item 8] Clinical Scenario: An RBT is implementing target protocols for Behavior Reduction according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 8: The learner demonstrates target behavior during a structured therapy trial in Domain D.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Reduction task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item D-08."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item D-08.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain D: Behavior Reduction.",
    "references": "BACB RBT 3rd Edition TCO Item D-08",
    "category": "Behavior Reduction",
    "subCategory": "Domain D Core Skills",
    "keywords": [
      "Behavior Reduction",
      "Domain D",
      "Item D-08"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.882Z",
    "updatedAt": "2026-08-09T06:44:44.882Z"
  },
  {
    "id": "q-e-gen-105",
    "certification": "RBT",
    "question": "[Domain E High-Yield Item 9] Clinical Scenario: An RBT is implementing target protocols for Documentation and Reporting according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 9: The learner demonstrates target behavior during a structured therapy trial in Domain E.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Documentation and Reporting task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item E-09."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item E-09.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain E: Documentation and Reporting.",
    "references": "BACB RBT 3rd Edition TCO Item E-09",
    "category": "Documentation and Reporting",
    "subCategory": "Domain E Core Skills",
    "keywords": [
      "Documentation and Reporting",
      "Domain E",
      "Item E-09"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.882Z",
    "updatedAt": "2026-08-09T06:44:44.882Z"
  },
  {
    "id": "q-f-gen-106",
    "certification": "RBT",
    "question": "[Domain F High-Yield Item 10] Clinical Scenario: An RBT is implementing target protocols for Ethics according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 10: The learner demonstrates target behavior during a structured therapy trial in Domain F.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Ethics task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item F-010."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item F-010.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain F: Ethics.",
    "references": "BACB RBT 3rd Edition TCO Item F-010",
    "category": "Ethics",
    "subCategory": "Domain F Core Skills",
    "keywords": [
      "Ethics",
      "Domain F",
      "Item F-010"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.882Z",
    "updatedAt": "2026-08-09T06:44:44.882Z"
  },
  {
    "id": "q-a-gen-107",
    "certification": "RBT",
    "question": "[Domain A High-Yield Item 1] Clinical Scenario: An RBT is implementing target protocols for Data Collection and Graphing according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 1: The learner demonstrates target behavior during a structured therapy trial in Domain A.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Data Collection and Graphing task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item A-01."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item A-01.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain A: Data Collection and Graphing.",
    "references": "BACB RBT 3rd Edition TCO Item A-01",
    "category": "Data Collection and Graphing",
    "subCategory": "Domain A Core Skills",
    "keywords": [
      "Data Collection and Graphing",
      "Domain A",
      "Item A-01"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-b-gen-108",
    "certification": "RBT",
    "question": "[Domain B High-Yield Item 2] Clinical Scenario: An RBT is implementing target protocols for Behavior Assessment according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 2: The learner demonstrates target behavior during a structured therapy trial in Domain B.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Assessment task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item B-02."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item B-02.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain B: Behavior Assessment.",
    "references": "BACB RBT 3rd Edition TCO Item B-02",
    "category": "Behavior Assessment",
    "subCategory": "Domain B Core Skills",
    "keywords": [
      "Behavior Assessment",
      "Domain B",
      "Item B-02"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-c-gen-109",
    "certification": "RBT",
    "question": "[Domain C High-Yield Item 3] Clinical Scenario: An RBT is implementing target protocols for Behavior Acquisition according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 3: The learner demonstrates target behavior during a structured therapy trial in Domain C.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Acquisition task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item C-03."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item C-03.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain C: Behavior Acquisition.",
    "references": "BACB RBT 3rd Edition TCO Item C-03",
    "category": "Behavior Acquisition",
    "subCategory": "Domain C Core Skills",
    "keywords": [
      "Behavior Acquisition",
      "Domain C",
      "Item C-03"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-d-gen-110",
    "certification": "RBT",
    "question": "[Domain D High-Yield Item 4] Clinical Scenario: An RBT is implementing target protocols for Behavior Reduction according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 4: The learner demonstrates target behavior during a structured therapy trial in Domain D.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Reduction task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item D-04."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item D-04.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain D: Behavior Reduction.",
    "references": "BACB RBT 3rd Edition TCO Item D-04",
    "category": "Behavior Reduction",
    "subCategory": "Domain D Core Skills",
    "keywords": [
      "Behavior Reduction",
      "Domain D",
      "Item D-04"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-e-gen-111",
    "certification": "RBT",
    "question": "[Domain E High-Yield Item 5] Clinical Scenario: An RBT is implementing target protocols for Documentation and Reporting according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 5: The learner demonstrates target behavior during a structured therapy trial in Domain E.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Documentation and Reporting task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item E-05."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item E-05.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain E: Documentation and Reporting.",
    "references": "BACB RBT 3rd Edition TCO Item E-05",
    "category": "Documentation and Reporting",
    "subCategory": "Domain E Core Skills",
    "keywords": [
      "Documentation and Reporting",
      "Domain E",
      "Item E-05"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-f-gen-112",
    "certification": "RBT",
    "question": "[Domain F High-Yield Item 6] Clinical Scenario: An RBT is implementing target protocols for Ethics according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 6: The learner demonstrates target behavior during a structured therapy trial in Domain F.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Ethics task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item F-06."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item F-06.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain F: Ethics.",
    "references": "BACB RBT 3rd Edition TCO Item F-06",
    "category": "Ethics",
    "subCategory": "Domain F Core Skills",
    "keywords": [
      "Ethics",
      "Domain F",
      "Item F-06"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-a-gen-113",
    "certification": "RBT",
    "question": "[Domain A High-Yield Item 7] Clinical Scenario: An RBT is implementing target protocols for Data Collection and Graphing according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 7: The learner demonstrates target behavior during a structured therapy trial in Domain A.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Data Collection and Graphing task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item A-07."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item A-07.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain A: Data Collection and Graphing.",
    "references": "BACB RBT 3rd Edition TCO Item A-07",
    "category": "Data Collection and Graphing",
    "subCategory": "Domain A Core Skills",
    "keywords": [
      "Data Collection and Graphing",
      "Domain A",
      "Item A-07"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-b-gen-114",
    "certification": "RBT",
    "question": "[Domain B High-Yield Item 8] Clinical Scenario: An RBT is implementing target protocols for Behavior Assessment according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 8: The learner demonstrates target behavior during a structured therapy trial in Domain B.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Assessment task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item B-08."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item B-08.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain B: Behavior Assessment.",
    "references": "BACB RBT 3rd Edition TCO Item B-08",
    "category": "Behavior Assessment",
    "subCategory": "Domain B Core Skills",
    "keywords": [
      "Behavior Assessment",
      "Domain B",
      "Item B-08"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-c-gen-115",
    "certification": "RBT",
    "question": "[Domain C High-Yield Item 9] Clinical Scenario: An RBT is implementing target protocols for Behavior Acquisition according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 9: The learner demonstrates target behavior during a structured therapy trial in Domain C.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Acquisition task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item C-09."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item C-09.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain C: Behavior Acquisition.",
    "references": "BACB RBT 3rd Edition TCO Item C-09",
    "category": "Behavior Acquisition",
    "subCategory": "Domain C Core Skills",
    "keywords": [
      "Behavior Acquisition",
      "Domain C",
      "Item C-09"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-d-gen-116",
    "certification": "RBT",
    "question": "[Domain D High-Yield Item 10] Clinical Scenario: An RBT is implementing target protocols for Behavior Reduction according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 10: The learner demonstrates target behavior during a structured therapy trial in Domain D.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Reduction task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item D-010."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item D-010.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain D: Behavior Reduction.",
    "references": "BACB RBT 3rd Edition TCO Item D-010",
    "category": "Behavior Reduction",
    "subCategory": "Domain D Core Skills",
    "keywords": [
      "Behavior Reduction",
      "Domain D",
      "Item D-010"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-e-gen-117",
    "certification": "RBT",
    "question": "[Domain E High-Yield Item 1] Clinical Scenario: An RBT is implementing target protocols for Documentation and Reporting according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 1: The learner demonstrates target behavior during a structured therapy trial in Domain E.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Documentation and Reporting task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item E-01."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item E-01.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain E: Documentation and Reporting.",
    "references": "BACB RBT 3rd Edition TCO Item E-01",
    "category": "Documentation and Reporting",
    "subCategory": "Domain E Core Skills",
    "keywords": [
      "Documentation and Reporting",
      "Domain E",
      "Item E-01"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-f-gen-118",
    "certification": "RBT",
    "question": "[Domain F High-Yield Item 2] Clinical Scenario: An RBT is implementing target protocols for Ethics according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 2: The learner demonstrates target behavior during a structured therapy trial in Domain F.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Ethics task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item F-02."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item F-02.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain F: Ethics.",
    "references": "BACB RBT 3rd Edition TCO Item F-02",
    "category": "Ethics",
    "subCategory": "Domain F Core Skills",
    "keywords": [
      "Ethics",
      "Domain F",
      "Item F-02"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-a-gen-119",
    "certification": "RBT",
    "question": "[Domain A High-Yield Item 3] Clinical Scenario: An RBT is implementing target protocols for Data Collection and Graphing according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 3: The learner demonstrates target behavior during a structured therapy trial in Domain A.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Data Collection and Graphing task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item A-03."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item A-03.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain A: Data Collection and Graphing.",
    "references": "BACB RBT 3rd Edition TCO Item A-03",
    "category": "Data Collection and Graphing",
    "subCategory": "Domain A Core Skills",
    "keywords": [
      "Data Collection and Graphing",
      "Domain A",
      "Item A-03"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-b-gen-120",
    "certification": "RBT",
    "question": "[Domain B High-Yield Item 4] Clinical Scenario: An RBT is implementing target protocols for Behavior Assessment according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 4: The learner demonstrates target behavior during a structured therapy trial in Domain B.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Assessment task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item B-04."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item B-04.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain B: Behavior Assessment.",
    "references": "BACB RBT 3rd Edition TCO Item B-04",
    "category": "Behavior Assessment",
    "subCategory": "Domain B Core Skills",
    "keywords": [
      "Behavior Assessment",
      "Domain B",
      "Item B-04"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-c-gen-121",
    "certification": "RBT",
    "question": "[Domain C High-Yield Item 5] Clinical Scenario: An RBT is implementing target protocols for Behavior Acquisition according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 5: The learner demonstrates target behavior during a structured therapy trial in Domain C.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Acquisition task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item C-05."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item C-05.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain C: Behavior Acquisition.",
    "references": "BACB RBT 3rd Edition TCO Item C-05",
    "category": "Behavior Acquisition",
    "subCategory": "Domain C Core Skills",
    "keywords": [
      "Behavior Acquisition",
      "Domain C",
      "Item C-05"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-d-gen-122",
    "certification": "RBT",
    "question": "[Domain D High-Yield Item 6] Clinical Scenario: An RBT is implementing target protocols for Behavior Reduction according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 6: The learner demonstrates target behavior during a structured therapy trial in Domain D.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Reduction task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item D-06."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item D-06.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain D: Behavior Reduction.",
    "references": "BACB RBT 3rd Edition TCO Item D-06",
    "category": "Behavior Reduction",
    "subCategory": "Domain D Core Skills",
    "keywords": [
      "Behavior Reduction",
      "Domain D",
      "Item D-06"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-e-gen-123",
    "certification": "RBT",
    "question": "[Domain E High-Yield Item 7] Clinical Scenario: An RBT is implementing target protocols for Documentation and Reporting according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 7: The learner demonstrates target behavior during a structured therapy trial in Domain E.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Documentation and Reporting task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item E-07."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item E-07.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain E: Documentation and Reporting.",
    "references": "BACB RBT 3rd Edition TCO Item E-07",
    "category": "Documentation and Reporting",
    "subCategory": "Domain E Core Skills",
    "keywords": [
      "Documentation and Reporting",
      "Domain E",
      "Item E-07"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-f-gen-124",
    "certification": "RBT",
    "question": "[Domain F High-Yield Item 8] Clinical Scenario: An RBT is implementing target protocols for Ethics according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 8: The learner demonstrates target behavior during a structured therapy trial in Domain F.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Ethics task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item F-08."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item F-08.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain F: Ethics.",
    "references": "BACB RBT 3rd Edition TCO Item F-08",
    "category": "Ethics",
    "subCategory": "Domain F Core Skills",
    "keywords": [
      "Ethics",
      "Domain F",
      "Item F-08"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-a-gen-125",
    "certification": "RBT",
    "question": "[Domain A High-Yield Item 9] Clinical Scenario: An RBT is implementing target protocols for Data Collection and Graphing according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 9: The learner demonstrates target behavior during a structured therapy trial in Domain A.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Data Collection and Graphing task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item A-09."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item A-09.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain A: Data Collection and Graphing.",
    "references": "BACB RBT 3rd Edition TCO Item A-09",
    "category": "Data Collection and Graphing",
    "subCategory": "Domain A Core Skills",
    "keywords": [
      "Data Collection and Graphing",
      "Domain A",
      "Item A-09"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-b-gen-126",
    "certification": "RBT",
    "question": "[Domain B High-Yield Item 10] Clinical Scenario: An RBT is implementing target protocols for Behavior Assessment according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 10: The learner demonstrates target behavior during a structured therapy trial in Domain B.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Assessment task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item B-010."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item B-010.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain B: Behavior Assessment.",
    "references": "BACB RBT 3rd Edition TCO Item B-010",
    "category": "Behavior Assessment",
    "subCategory": "Domain B Core Skills",
    "keywords": [
      "Behavior Assessment",
      "Domain B",
      "Item B-010"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-c-gen-127",
    "certification": "RBT",
    "question": "[Domain C High-Yield Item 1] Clinical Scenario: An RBT is implementing target protocols for Behavior Acquisition according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 1: The learner demonstrates target behavior during a structured therapy trial in Domain C.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Acquisition task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item C-01."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item C-01.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain C: Behavior Acquisition.",
    "references": "BACB RBT 3rd Edition TCO Item C-01",
    "category": "Behavior Acquisition",
    "subCategory": "Domain C Core Skills",
    "keywords": [
      "Behavior Acquisition",
      "Domain C",
      "Item C-01"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-d-gen-128",
    "certification": "RBT",
    "question": "[Domain D High-Yield Item 2] Clinical Scenario: An RBT is implementing target protocols for Behavior Reduction according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 2: The learner demonstrates target behavior during a structured therapy trial in Domain D.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Reduction task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item D-02."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item D-02.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain D: Behavior Reduction.",
    "references": "BACB RBT 3rd Edition TCO Item D-02",
    "category": "Behavior Reduction",
    "subCategory": "Domain D Core Skills",
    "keywords": [
      "Behavior Reduction",
      "Domain D",
      "Item D-02"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-e-gen-129",
    "certification": "RBT",
    "question": "[Domain E High-Yield Item 3] Clinical Scenario: An RBT is implementing target protocols for Documentation and Reporting according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 3: The learner demonstrates target behavior during a structured therapy trial in Domain E.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Documentation and Reporting task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item E-03."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item E-03.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain E: Documentation and Reporting.",
    "references": "BACB RBT 3rd Edition TCO Item E-03",
    "category": "Documentation and Reporting",
    "subCategory": "Domain E Core Skills",
    "keywords": [
      "Documentation and Reporting",
      "Domain E",
      "Item E-03"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-f-gen-130",
    "certification": "RBT",
    "question": "[Domain F High-Yield Item 4] Clinical Scenario: An RBT is implementing target protocols for Ethics according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 4: The learner demonstrates target behavior during a structured therapy trial in Domain F.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Ethics task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item F-04."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item F-04.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain F: Ethics.",
    "references": "BACB RBT 3rd Edition TCO Item F-04",
    "category": "Ethics",
    "subCategory": "Domain F Core Skills",
    "keywords": [
      "Ethics",
      "Domain F",
      "Item F-04"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-a-gen-131",
    "certification": "RBT",
    "question": "[Domain A High-Yield Item 5] Clinical Scenario: An RBT is implementing target protocols for Data Collection and Graphing according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 5: The learner demonstrates target behavior during a structured therapy trial in Domain A.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Data Collection and Graphing task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item A-05."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item A-05.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain A: Data Collection and Graphing.",
    "references": "BACB RBT 3rd Edition TCO Item A-05",
    "category": "Data Collection and Graphing",
    "subCategory": "Domain A Core Skills",
    "keywords": [
      "Data Collection and Graphing",
      "Domain A",
      "Item A-05"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-b-gen-132",
    "certification": "RBT",
    "question": "[Domain B High-Yield Item 6] Clinical Scenario: An RBT is implementing target protocols for Behavior Assessment according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 6: The learner demonstrates target behavior during a structured therapy trial in Domain B.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Assessment task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item B-06."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item B-06.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain B: Behavior Assessment.",
    "references": "BACB RBT 3rd Edition TCO Item B-06",
    "category": "Behavior Assessment",
    "subCategory": "Domain B Core Skills",
    "keywords": [
      "Behavior Assessment",
      "Domain B",
      "Item B-06"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-c-gen-133",
    "certification": "RBT",
    "question": "[Domain C High-Yield Item 7] Clinical Scenario: An RBT is implementing target protocols for Behavior Acquisition according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 7: The learner demonstrates target behavior during a structured therapy trial in Domain C.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Acquisition task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item C-07."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item C-07.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain C: Behavior Acquisition.",
    "references": "BACB RBT 3rd Edition TCO Item C-07",
    "category": "Behavior Acquisition",
    "subCategory": "Domain C Core Skills",
    "keywords": [
      "Behavior Acquisition",
      "Domain C",
      "Item C-07"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-d-gen-134",
    "certification": "RBT",
    "question": "[Domain D High-Yield Item 8] Clinical Scenario: An RBT is implementing target protocols for Behavior Reduction according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 8: The learner demonstrates target behavior during a structured therapy trial in Domain D.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Reduction task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item D-08."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item D-08.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain D: Behavior Reduction.",
    "references": "BACB RBT 3rd Edition TCO Item D-08",
    "category": "Behavior Reduction",
    "subCategory": "Domain D Core Skills",
    "keywords": [
      "Behavior Reduction",
      "Domain D",
      "Item D-08"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-e-gen-135",
    "certification": "RBT",
    "question": "[Domain E High-Yield Item 9] Clinical Scenario: An RBT is implementing target protocols for Documentation and Reporting according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 9: The learner demonstrates target behavior during a structured therapy trial in Domain E.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Documentation and Reporting task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item E-09."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item E-09.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain E: Documentation and Reporting.",
    "references": "BACB RBT 3rd Edition TCO Item E-09",
    "category": "Documentation and Reporting",
    "subCategory": "Domain E Core Skills",
    "keywords": [
      "Documentation and Reporting",
      "Domain E",
      "Item E-09"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-f-gen-136",
    "certification": "RBT",
    "question": "[Domain F High-Yield Item 10] Clinical Scenario: An RBT is implementing target protocols for Ethics according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 10: The learner demonstrates target behavior during a structured therapy trial in Domain F.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Ethics task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item F-010."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item F-010.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain F: Ethics.",
    "references": "BACB RBT 3rd Edition TCO Item F-010",
    "category": "Ethics",
    "subCategory": "Domain F Core Skills",
    "keywords": [
      "Ethics",
      "Domain F",
      "Item F-010"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-a-gen-137",
    "certification": "RBT",
    "question": "[Domain A High-Yield Item 1] Clinical Scenario: An RBT is implementing target protocols for Data Collection and Graphing according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 1: The learner demonstrates target behavior during a structured therapy trial in Domain A.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Data Collection and Graphing task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item A-01."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item A-01.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain A: Data Collection and Graphing.",
    "references": "BACB RBT 3rd Edition TCO Item A-01",
    "category": "Data Collection and Graphing",
    "subCategory": "Domain A Core Skills",
    "keywords": [
      "Data Collection and Graphing",
      "Domain A",
      "Item A-01"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-b-gen-138",
    "certification": "RBT",
    "question": "[Domain B High-Yield Item 2] Clinical Scenario: An RBT is implementing target protocols for Behavior Assessment according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 2: The learner demonstrates target behavior during a structured therapy trial in Domain B.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Assessment task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item B-02."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item B-02.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain B: Behavior Assessment.",
    "references": "BACB RBT 3rd Edition TCO Item B-02",
    "category": "Behavior Assessment",
    "subCategory": "Domain B Core Skills",
    "keywords": [
      "Behavior Assessment",
      "Domain B",
      "Item B-02"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-c-gen-139",
    "certification": "RBT",
    "question": "[Domain C High-Yield Item 3] Clinical Scenario: An RBT is implementing target protocols for Behavior Acquisition according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 3: The learner demonstrates target behavior during a structured therapy trial in Domain C.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Acquisition task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item C-03."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item C-03.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain C: Behavior Acquisition.",
    "references": "BACB RBT 3rd Edition TCO Item C-03",
    "category": "Behavior Acquisition",
    "subCategory": "Domain C Core Skills",
    "keywords": [
      "Behavior Acquisition",
      "Domain C",
      "Item C-03"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-d-gen-140",
    "certification": "RBT",
    "question": "[Domain D High-Yield Item 4] Clinical Scenario: An RBT is implementing target protocols for Behavior Reduction according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 4: The learner demonstrates target behavior during a structured therapy trial in Domain D.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Reduction task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item D-04."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item D-04.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain D: Behavior Reduction.",
    "references": "BACB RBT 3rd Edition TCO Item D-04",
    "category": "Behavior Reduction",
    "subCategory": "Domain D Core Skills",
    "keywords": [
      "Behavior Reduction",
      "Domain D",
      "Item D-04"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-e-gen-141",
    "certification": "RBT",
    "question": "[Domain E High-Yield Item 5] Clinical Scenario: An RBT is implementing target protocols for Documentation and Reporting according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 5: The learner demonstrates target behavior during a structured therapy trial in Domain E.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Documentation and Reporting task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item E-05."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item E-05.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain E: Documentation and Reporting.",
    "references": "BACB RBT 3rd Edition TCO Item E-05",
    "category": "Documentation and Reporting",
    "subCategory": "Domain E Core Skills",
    "keywords": [
      "Documentation and Reporting",
      "Domain E",
      "Item E-05"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-f-gen-142",
    "certification": "RBT",
    "question": "[Domain F High-Yield Item 6] Clinical Scenario: An RBT is implementing target protocols for Ethics according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 6: The learner demonstrates target behavior during a structured therapy trial in Domain F.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Ethics task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item F-06."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item F-06.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain F: Ethics.",
    "references": "BACB RBT 3rd Edition TCO Item F-06",
    "category": "Ethics",
    "subCategory": "Domain F Core Skills",
    "keywords": [
      "Ethics",
      "Domain F",
      "Item F-06"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-a-gen-143",
    "certification": "RBT",
    "question": "[Domain A High-Yield Item 7] Clinical Scenario: An RBT is implementing target protocols for Data Collection and Graphing according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 7: The learner demonstrates target behavior during a structured therapy trial in Domain A.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Data Collection and Graphing task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item A-07."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item A-07.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain A: Data Collection and Graphing.",
    "references": "BACB RBT 3rd Edition TCO Item A-07",
    "category": "Data Collection and Graphing",
    "subCategory": "Domain A Core Skills",
    "keywords": [
      "Data Collection and Graphing",
      "Domain A",
      "Item A-07"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-b-gen-144",
    "certification": "RBT",
    "question": "[Domain B High-Yield Item 8] Clinical Scenario: An RBT is implementing target protocols for Behavior Assessment according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 8: The learner demonstrates target behavior during a structured therapy trial in Domain B.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Assessment task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item B-08."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item B-08.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain B: Behavior Assessment.",
    "references": "BACB RBT 3rd Edition TCO Item B-08",
    "category": "Behavior Assessment",
    "subCategory": "Domain B Core Skills",
    "keywords": [
      "Behavior Assessment",
      "Domain B",
      "Item B-08"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-c-gen-145",
    "certification": "RBT",
    "question": "[Domain C High-Yield Item 9] Clinical Scenario: An RBT is implementing target protocols for Behavior Acquisition according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 9: The learner demonstrates target behavior during a structured therapy trial in Domain C.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Acquisition task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item C-09."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item C-09.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain C: Behavior Acquisition.",
    "references": "BACB RBT 3rd Edition TCO Item C-09",
    "category": "Behavior Acquisition",
    "subCategory": "Domain C Core Skills",
    "keywords": [
      "Behavior Acquisition",
      "Domain C",
      "Item C-09"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-d-gen-146",
    "certification": "RBT",
    "question": "[Domain D High-Yield Item 10] Clinical Scenario: An RBT is implementing target protocols for Behavior Reduction according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 10: The learner demonstrates target behavior during a structured therapy trial in Domain D.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Reduction task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item D-010."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item D-010.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain D: Behavior Reduction.",
    "references": "BACB RBT 3rd Edition TCO Item D-010",
    "category": "Behavior Reduction",
    "subCategory": "Domain D Core Skills",
    "keywords": [
      "Behavior Reduction",
      "Domain D",
      "Item D-010"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-e-gen-147",
    "certification": "RBT",
    "question": "[Domain E High-Yield Item 1] Clinical Scenario: An RBT is implementing target protocols for Documentation and Reporting according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 1: The learner demonstrates target behavior during a structured therapy trial in Domain E.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Documentation and Reporting task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item E-01."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item E-01.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain E: Documentation and Reporting.",
    "references": "BACB RBT 3rd Edition TCO Item E-01",
    "category": "Documentation and Reporting",
    "subCategory": "Domain E Core Skills",
    "keywords": [
      "Documentation and Reporting",
      "Domain E",
      "Item E-01"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-f-gen-148",
    "certification": "RBT",
    "question": "[Domain F High-Yield Item 2] Clinical Scenario: An RBT is implementing target protocols for Ethics according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 2: The learner demonstrates target behavior during a structured therapy trial in Domain F.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Ethics task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item F-02."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item F-02.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain F: Ethics.",
    "references": "BACB RBT 3rd Edition TCO Item F-02",
    "category": "Ethics",
    "subCategory": "Domain F Core Skills",
    "keywords": [
      "Ethics",
      "Domain F",
      "Item F-02"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-a-gen-149",
    "certification": "RBT",
    "question": "[Domain A High-Yield Item 3] Clinical Scenario: An RBT is implementing target protocols for Data Collection and Graphing according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 3: The learner demonstrates target behavior during a structured therapy trial in Domain A.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Data Collection and Graphing task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item A-03."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item A-03.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain A: Data Collection and Graphing.",
    "references": "BACB RBT 3rd Edition TCO Item A-03",
    "category": "Data Collection and Graphing",
    "subCategory": "Domain A Core Skills",
    "keywords": [
      "Data Collection and Graphing",
      "Domain A",
      "Item A-03"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-b-gen-150",
    "certification": "RBT",
    "question": "[Domain B High-Yield Item 4] Clinical Scenario: An RBT is implementing target protocols for Behavior Assessment according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 4: The learner demonstrates target behavior during a structured therapy trial in Domain B.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Assessment task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item B-04."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item B-04.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain B: Behavior Assessment.",
    "references": "BACB RBT 3rd Edition TCO Item B-04",
    "category": "Behavior Assessment",
    "subCategory": "Domain B Core Skills",
    "keywords": [
      "Behavior Assessment",
      "Domain B",
      "Item B-04"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-c-gen-151",
    "certification": "RBT",
    "question": "[Domain C High-Yield Item 5] Clinical Scenario: An RBT is implementing target protocols for Behavior Acquisition according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 5: The learner demonstrates target behavior during a structured therapy trial in Domain C.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Acquisition task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item C-05."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item C-05.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain C: Behavior Acquisition.",
    "references": "BACB RBT 3rd Edition TCO Item C-05",
    "category": "Behavior Acquisition",
    "subCategory": "Domain C Core Skills",
    "keywords": [
      "Behavior Acquisition",
      "Domain C",
      "Item C-05"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-d-gen-152",
    "certification": "RBT",
    "question": "[Domain D High-Yield Item 6] Clinical Scenario: An RBT is implementing target protocols for Behavior Reduction according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 6: The learner demonstrates target behavior during a structured therapy trial in Domain D.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Reduction task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item D-06."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item D-06.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain D: Behavior Reduction.",
    "references": "BACB RBT 3rd Edition TCO Item D-06",
    "category": "Behavior Reduction",
    "subCategory": "Domain D Core Skills",
    "keywords": [
      "Behavior Reduction",
      "Domain D",
      "Item D-06"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-e-gen-153",
    "certification": "RBT",
    "question": "[Domain E High-Yield Item 7] Clinical Scenario: An RBT is implementing target protocols for Documentation and Reporting according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 7: The learner demonstrates target behavior during a structured therapy trial in Domain E.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Documentation and Reporting task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item E-07."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item E-07.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain E: Documentation and Reporting.",
    "references": "BACB RBT 3rd Edition TCO Item E-07",
    "category": "Documentation and Reporting",
    "subCategory": "Domain E Core Skills",
    "keywords": [
      "Documentation and Reporting",
      "Domain E",
      "Item E-07"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-f-gen-154",
    "certification": "RBT",
    "question": "[Domain F High-Yield Item 8] Clinical Scenario: An RBT is implementing target protocols for Ethics according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 8: The learner demonstrates target behavior during a structured therapy trial in Domain F.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Ethics task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item F-08."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item F-08.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain F: Ethics.",
    "references": "BACB RBT 3rd Edition TCO Item F-08",
    "category": "Ethics",
    "subCategory": "Domain F Core Skills",
    "keywords": [
      "Ethics",
      "Domain F",
      "Item F-08"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-a-gen-155",
    "certification": "RBT",
    "question": "[Domain A High-Yield Item 9] Clinical Scenario: An RBT is implementing target protocols for Data Collection and Graphing according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 9: The learner demonstrates target behavior during a structured therapy trial in Domain A.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Data Collection and Graphing task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item A-09."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item A-09.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain A: Data Collection and Graphing.",
    "references": "BACB RBT 3rd Edition TCO Item A-09",
    "category": "Data Collection and Graphing",
    "subCategory": "Domain A Core Skills",
    "keywords": [
      "Data Collection and Graphing",
      "Domain A",
      "Item A-09"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-b-gen-156",
    "certification": "RBT",
    "question": "[Domain B High-Yield Item 10] Clinical Scenario: An RBT is implementing target protocols for Behavior Assessment according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 10: The learner demonstrates target behavior during a structured therapy trial in Domain B.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Assessment task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item B-010."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item B-010.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain B: Behavior Assessment.",
    "references": "BACB RBT 3rd Edition TCO Item B-010",
    "category": "Behavior Assessment",
    "subCategory": "Domain B Core Skills",
    "keywords": [
      "Behavior Assessment",
      "Domain B",
      "Item B-010"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-c-gen-157",
    "certification": "RBT",
    "question": "[Domain C High-Yield Item 1] Clinical Scenario: An RBT is implementing target protocols for Behavior Acquisition according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 1: The learner demonstrates target behavior during a structured therapy trial in Domain C.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Acquisition task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item C-01."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item C-01.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain C: Behavior Acquisition.",
    "references": "BACB RBT 3rd Edition TCO Item C-01",
    "category": "Behavior Acquisition",
    "subCategory": "Domain C Core Skills",
    "keywords": [
      "Behavior Acquisition",
      "Domain C",
      "Item C-01"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-d-gen-158",
    "certification": "RBT",
    "question": "[Domain D High-Yield Item 2] Clinical Scenario: An RBT is implementing target protocols for Behavior Reduction according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 2: The learner demonstrates target behavior during a structured therapy trial in Domain D.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Behavior Reduction task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item D-02."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item D-02.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain D: Behavior Reduction.",
    "references": "BACB RBT 3rd Edition TCO Item D-02",
    "category": "Behavior Reduction",
    "subCategory": "Domain D Core Skills",
    "keywords": [
      "Behavior Reduction",
      "Domain D",
      "Item D-02"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-e-gen-159",
    "certification": "RBT",
    "question": "[Domain E High-Yield Item 3] Clinical Scenario: An RBT is implementing target protocols for Documentation and Reporting according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 3: The learner demonstrates target behavior during a structured therapy trial in Domain E.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Documentation and Reporting task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item E-03."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item E-03.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain E: Documentation and Reporting.",
    "references": "BACB RBT 3rd Edition TCO Item E-03",
    "category": "Documentation and Reporting",
    "subCategory": "Domain E Core Skills",
    "keywords": [
      "Documentation and Reporting",
      "Domain E",
      "Item E-03"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-f-gen-160",
    "certification": "RBT",
    "question": "[Domain F High-Yield Item 4] Clinical Scenario: An RBT is implementing target protocols for Ethics according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 4: The learner demonstrates target behavior during a structured therapy trial in Domain F.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Ethics task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item F-04."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item F-04.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain F: Ethics.",
    "references": "BACB RBT 3rd Edition TCO Item F-04",
    "category": "Ethics",
    "subCategory": "Domain F Core Skills",
    "keywords": [
      "Ethics",
      "Domain F",
      "Item F-04"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  },
  {
    "id": "q-a-gen-161",
    "certification": "RBT",
    "question": "[Domain A High-Yield Item 5] Clinical Scenario: An RBT is implementing target protocols for Data Collection and Graphing according to BACB 3rd Edition TCO standards. What is the correct clinical action?",
    "scenarioText": "Scenario 5: The learner demonstrates target behavior during a structured therapy trial in Domain A.",
    "questionType": "scenario_based",
    "difficulty": "hard",
    "options": [
      {
        "id": "A",
        "text": "Implement designated protocol step according to Data Collection and Graphing task list guidelines.",
        "isCorrect": true,
        "explanation": "Correct response following BACB 3rd Edition Task List Item A-05."
      },
      {
        "id": "B",
        "text": "Modify BCBA intervention plan independently without supervisor sign-off.",
        "isCorrect": false,
        "explanation": "RBTs may never alter behavior plans without BCBA authorization."
      },
      {
        "id": "C",
        "text": "Ignore behavior data collection and continue session.",
        "isCorrect": false,
        "explanation": "Data collection is mandatory."
      },
      {
        "id": "D",
        "text": "Use unapproved punishment procedure.",
        "isCorrect": false,
        "explanation": "Unapproved procedures violate BACB ethics."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Correct rationale according to official BACB 3rd Edition Task List Item A-05.",
    "clinicalExplanation": "Clinical BCBA supervision rationale for Domain A: Data Collection and Graphing.",
    "references": "BACB RBT 3rd Edition TCO Item A-05",
    "category": "Data Collection and Graphing",
    "subCategory": "Domain A Core Skills",
    "keywords": [
      "Data Collection and Graphing",
      "Domain A",
      "Item A-05"
    ],
    "taskListVersion": "3rd_edition",
    "estimatedTimeSeconds": 60,
    "tags": [
      "RBT Core"
    ],
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys",
    "createdAt": "2026-08-09T06:44:44.883Z",
    "updatedAt": "2026-08-09T06:44:44.883Z"
  }
];
