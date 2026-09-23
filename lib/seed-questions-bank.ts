import { MasterQuestion } from '@/types/master-question';

/**
 * High-Yield BACB RBT 3rd Edition Master Practice Questions
 * 
 * 100% Aligned with the official BACB RBT Test Content Outline (3rd Edition).
 * Covers all 6 Domains and 43 Tasks:
 *   - Domain A: Data Collection and Graphing (Tasks A.1 - A.8)
 *   - Domain B: Behavior Assessment (Tasks B.1 - B.3)
 *   - Domain C: Behavior Acquisition (Tasks C.1 - C.11)
 *   - Domain D: Behavior Reduction (Tasks D.1 - D.7)
 *   - Domain E: Documentation and Reporting (Tasks E.1 - E.4)
 *   - Domain F: Ethics (Tasks F.1 - F.10)
 * 
 * Total: 85 Questions (75 Scored + 10 Pilot Questions)
 * Answer distribution is evenly balanced across options A, B, C, and D with clinical rationales.
 */
export const FULL_BACB_SEED_QUESTIONS: MasterQuestion[] = [
  {
    "id": "q-a01-1",
    "certification": "RBT",
    "question": "An RBT tracks how many times a client slaps their own leg during a 30-minute session using a tally counter. What continuous measurement procedure is being implemented?",
    "scenarioText": "The RBT clicks the handheld tally counter once each time the client slaps their leg from session start to finish.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Frequency (Count)",
        "isCorrect": true,
        "explanation": "Frequency is a continuous measure recording the total count of discrete behavior occurrences."
      },
      {
        "id": "B",
        "text": "Duration",
        "isCorrect": false,
        "explanation": "Duration measures the total elapsed time from behavior onset to offset."
      },
      {
        "id": "C",
        "text": "Latency",
        "isCorrect": false,
        "explanation": "Latency measures elapsed time from the presentation of a stimulus to the onset of the response."
      },
      {
        "id": "D",
        "text": "Interresponse Time (IRT)",
        "isCorrect": false,
        "explanation": "IRT measures elapsed time between the offset of one response and the onset of the next response."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Frequency (Count) directly tallies the total number of discrete behavioral instances during an observation period.",
    "clinicalExplanation": "BACB TCO Item A.1: Frequency recording is ideal for behaviors with discrete beginnings and endings and relatively constant durations.",
    "references": "BACB RBT 3rd Edition TCO Item A.1",
    "category": "Data Collection and Graphing",
    "subCategory": "Continuous Measurement - Frequency",
    "keywords": [
      "Data Collection and Graphing",
      "Continuous Measurement - Frequency",
      "A.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a01-2",
    "certification": "RBT",
    "question": "A supervisor instructs the RBT to measure how long it takes between saying 'Clean up your blocks' and the client picking up the first block. Which continuous measurement procedure should be used?",
    "scenarioText": "The RBT starts the stopwatch when delivering the verbal instruction and stops it the moment the child touches the block.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Duration",
        "isCorrect": false,
        "explanation": "Duration would measure how long the child spent cleaning up, not how long before they started."
      },
      {
        "id": "B",
        "text": "Latency",
        "isCorrect": true,
        "explanation": "Latency measures the temporal interval between the presentation of a stimulus and the initiation of the response."
      },
      {
        "id": "C",
        "text": "Interresponse Time (IRT)",
        "isCorrect": false,
        "explanation": "IRT measures the time between consecutive responses of the same class."
      },
      {
        "id": "D",
        "text": "Whole Interval Recording",
        "isCorrect": false,
        "explanation": "Whole interval is a discontinuous procedure, not a continuous latency measure."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Latency measures the elapsed time from the delivery of the discriminative stimulus (SD) to the initiation of the target behavior.",
    "clinicalExplanation": "BACB TCO Item A.1: Latency data collection helps determine processing speed or compliance delay following instructions.",
    "references": "BACB RBT 3rd Edition TCO Item A.1",
    "category": "Data Collection and Graphing",
    "subCategory": "Continuous Measurement - Latency",
    "keywords": [
      "Data Collection and Graphing",
      "Continuous Measurement - Latency",
      "A.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a01-3",
    "certification": "RBT",
    "question": "An RBT records the elapsed time between the end of one bite of food and the beginning of the next bite of food. What metric is being gathered?",
    "scenarioText": "A client eats lunch too rapidly, choking on food. The RBT records the time between bites to support a pacing intervention.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Duration",
        "isCorrect": false,
        "explanation": "Duration measures how long an entire meal lasts, not the interval between bites."
      },
      {
        "id": "B",
        "text": "Momentary Time Sampling",
        "isCorrect": false,
        "explanation": "Momentary time sampling checks behavior occurrence only at interval endpoints."
      },
      {
        "id": "C",
        "text": "Interresponse Time (IRT)",
        "isCorrect": true,
        "explanation": "IRT is the elapsed time between two successive instances of the same response class."
      },
      {
        "id": "D",
        "text": "Trial-to-criterion",
        "isCorrect": false,
        "explanation": "Trial-to-criterion measures the number of trials needed to master a target skill."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Interresponse Time (IRT) is the time elapsed between the offset of one instance of behavior and the onset of the following instance.",
    "clinicalExplanation": "BACB TCO Item A.1: Increasing IRT is a common clinical objective for rapid eating or repetitive vocalizations.",
    "references": "BACB RBT 3rd Edition TCO Item A.1",
    "category": "Data Collection and Graphing",
    "subCategory": "Continuous Measurement - IRT",
    "keywords": [
      "Data Collection and Graphing",
      "Continuous Measurement - IRT",
      "A.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a02-1",
    "certification": "RBT",
    "question": "An RBT divides a 10-minute session into 30-second intervals and marks (+) if out-of-seat behavior occurred at ANY point during the 30 seconds. What procedure was used?",
    "scenarioText": "The student stood up from the desk for 3 seconds during interval 4. The RBT marked interval 4 as (+).",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Whole Interval Recording",
        "isCorrect": false,
        "explanation": "Whole interval recording requires behavior to occur throughout the entire interval duration."
      },
      {
        "id": "B",
        "text": "Momentary Time Sampling",
        "isCorrect": false,
        "explanation": "Momentary time sampling only records occurrence if the behavior occurs at the exact moment the timer expires."
      },
      {
        "id": "C",
        "text": "Permanent Product Recording",
        "isCorrect": false,
        "explanation": "Permanent product measures physical results left in the environment."
      },
      {
        "id": "D",
        "text": "Partial Interval Recording",
        "isCorrect": true,
        "explanation": "Partial interval records occurrence if the behavior occurs at any point during the interval."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Partial Interval Recording records whether a target behavior occurred at any time during an interval, which tends to overestimate the true overall duration.",
    "clinicalExplanation": "BACB TCO Item A.2: Partial interval is commonly used for behaviors targeted for reduction because it captures brief occurrences.",
    "references": "BACB RBT 3rd Edition TCO Item A.2",
    "category": "Data Collection and Graphing",
    "subCategory": "Discontinuous Measurement - Partial Interval",
    "keywords": [
      "Data Collection and Graphing",
      "Discontinuous Measurement - Partial Interval",
      "A.2"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a02-2",
    "certification": "RBT",
    "question": "Which discontinuous measurement system requires the behavior to persist continuously from the start to the finish of the interval to be scored as an occurrence?",
    "scenarioText": "An RBT is tracking on-task study behavior in 1-minute intervals. If the learner looks away for 2 seconds, the interval is scored (-).",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Whole Interval Recording",
        "isCorrect": true,
        "explanation": "Whole interval recording requires the behavior to occur for the entire duration of the interval."
      },
      {
        "id": "B",
        "text": "Partial Interval Recording",
        "isCorrect": false,
        "explanation": "Partial interval only requires occurrence at any brief moment during the interval."
      },
      {
        "id": "C",
        "text": "Momentary Time Sampling",
        "isCorrect": false,
        "explanation": "Momentary time sampling checks behavior only at the end of the interval."
      },
      {
        "id": "D",
        "text": "Rate Recording",
        "isCorrect": false,
        "explanation": "Rate is a continuous count per unit of time, not an interval system."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Whole Interval Recording requires the behavior to be emitted throughout the entire interval. It tends to underestimate overall occurrence.",
    "clinicalExplanation": "BACB TCO Item A.2: Whole interval is appropriate when the goal is to increase continuous engagement or sustained attention.",
    "references": "BACB RBT 3rd Edition TCO Item A.2",
    "category": "Data Collection and Graphing",
    "subCategory": "Discontinuous Measurement - Whole Interval",
    "keywords": [
      "Data Collection and Graphing",
      "Discontinuous Measurement - Whole Interval",
      "A.2"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a02-3",
    "certification": "RBT",
    "question": "An RBT sets a vibrating timer for every 3 minutes. When the timer vibrates, the RBT immediately looks up and scores (+) if the student is writing in their workbook at that exact second. What is this?",
    "scenarioText": "The student wrote for 2.5 minutes but stopped to stretch right when the timer vibrated. The RBT recorded (-).",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Partial Interval Recording",
        "isCorrect": false,
        "explanation": "Partial interval would score (+) because writing occurred during the interval."
      },
      {
        "id": "B",
        "text": "Momentary Time Sampling",
        "isCorrect": true,
        "explanation": "Momentary time sampling records behavior presence at the precise conclusion of each predetermined interval."
      },
      {
        "id": "C",
        "text": "Whole Interval Recording",
        "isCorrect": false,
        "explanation": "Whole interval requires continuous writing for all 3 minutes."
      },
      {
        "id": "D",
        "text": "Permanent Product Recording",
        "isCorrect": false,
        "explanation": "Permanent product measures workbook pages completed, not momentary presence."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Momentary Time Sampling measures whether the target behavior is occurring at the specific moment each interval ends.",
    "clinicalExplanation": "BACB TCO Item A.2: MTS is practical when continuous observation is impossible, such as in group classrooms.",
    "references": "BACB RBT 3rd Edition TCO Item A.2",
    "category": "Data Collection and Graphing",
    "subCategory": "Discontinuous Measurement - MTS",
    "keywords": [
      "Data Collection and Graphing",
      "Discontinuous Measurement - MTS",
      "A.2"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a03-1",
    "certification": "RBT",
    "question": "Which of the following is the best example of a permanent product recording procedure?",
    "scenarioText": "An RBT needs to assess how many math problems a client completed without sitting directly next to the client during the work period.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Measuring the duration of homework completion with a stopwatch",
        "isCorrect": false,
        "explanation": "Stopwatch timing is continuous duration measurement, not permanent product."
      },
      {
        "id": "B",
        "text": "Using a 10-second momentary time sampling sheet to record pencil-holding",
        "isCorrect": false,
        "explanation": "Momentary time sampling is a discontinuous observation method."
      },
      {
        "id": "C",
        "text": "Counting the number of correctly solved math problems on the turned-in test sheet",
        "isCorrect": true,
        "explanation": "Permanent product measures tangible outcomes that remain in the environment without direct real-time observation."
      },
      {
        "id": "D",
        "text": "Recording tally clicks every time the client writes a number",
        "isCorrect": false,
        "explanation": "Tallying clicks is continuous frequency recording."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Permanent product recording measures the concrete, durable outcome produced by a behavior rather than the behavior itself as it occurs.",
    "clinicalExplanation": "BACB TCO Item A.3: Permanent product recording does not require the observer to be present during the response emission.",
    "references": "BACB RBT 3rd Edition TCO Item A.3",
    "category": "Data Collection and Graphing",
    "subCategory": "Permanent Product",
    "keywords": [
      "Data Collection and Graphing",
      "Permanent Product",
      "A.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a04-1",
    "certification": "RBT",
    "question": "When entering data on a standard behavior line graph, what information is traditionally plotted along the horizontal X-axis?",
    "scenarioText": "An RBT is updating a client's daily aggression graph following a 2-hour clinical session.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "The target behavior count or percentage",
        "isCorrect": false,
        "explanation": "The target behavior metric is plotted on the vertical Y-axis (ordinate)."
      },
      {
        "id": "B",
        "text": "The client's name and supervisor's credentials",
        "isCorrect": false,
        "explanation": "Client and supervisor info is located in the graph title/header, not on an axis."
      },
      {
        "id": "C",
        "text": "The phase change condition label only",
        "isCorrect": false,
        "explanation": "Phase labels are written above data paths across vertical phase lines."
      },
      {
        "id": "D",
        "text": "The sessions or passage of time",
        "isCorrect": true,
        "explanation": "The horizontal X-axis (abscissa) represents time units such as days, sessions, or weeks."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "In standard visual analysis, the horizontal X-axis (abscissa) depicts successive time periods (sessions, days), while the vertical Y-axis (ordinate) depicts behavior quantity.",
    "clinicalExplanation": "BACB TCO Item A.4: RBTs must maintain accurate, up-to-date line graphs to facilitate visual data analysis by BCBA supervisors.",
    "references": "BACB RBT 3rd Edition TCO Item A.4",
    "category": "Data Collection and Graphing",
    "subCategory": "Graphing - X-Axis",
    "keywords": [
      "Data Collection and Graphing",
      "Graphing - X-Axis",
      "A.4"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a04-2",
    "certification": "RBT",
    "question": "What is the primary function of a solid vertical line drawn on an ABA behavior graph?",
    "scenarioText": "A BCBA implements an extinction intervention following two weeks of baseline observation.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "To separate different experimental or treatment phases",
        "isCorrect": true,
        "explanation": "Vertical phase lines separate distinct conditions, such as Baseline and Intervention."
      },
      {
        "id": "B",
        "text": "To connect data points from consecutive days",
        "isCorrect": false,
        "explanation": "Data points are connected with data path lines."
      },
      {
        "id": "C",
        "text": "To mark where the RBT had a substitute therapist",
        "isCorrect": false,
        "explanation": "Therapist substitutions do not represent experimental condition changes."
      },
      {
        "id": "D",
        "text": "To identify the average score of the client",
        "isCorrect": false,
        "explanation": "Average lines are drawn horizontally across phases."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "A solid vertical phase change line signals a major change in treatment or environmental conditions, allowing comparison of behavior across phases.",
    "clinicalExplanation": "BACB TCO Item A.4: Clear phase change lines are necessary for evaluating the functional relation between interventions and behavior.",
    "references": "BACB RBT 3rd Edition TCO Item A.4",
    "category": "Data Collection and Graphing",
    "subCategory": "Graphing - Phase Lines",
    "keywords": [
      "Data Collection and Graphing",
      "Graphing - Phase Lines",
      "A.4"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a05-1",
    "certification": "RBT",
    "question": "Which of the following descriptions describes behavior in objective, observable, and measurable terms compliant with BACB standards?",
    "scenarioText": "An RBT is drafting a session note describing an incident of property destruction.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Client felt frustrated and acted out defensively because of anger.",
        "isCorrect": false,
        "explanation": "Feelings and internal emotional states are unobservable hypothetical constructs."
      },
      {
        "id": "B",
        "text": "Client slammed both open hands onto the wooden desk surface with enough force to produce a sound audible from 10 feet away.",
        "isCorrect": true,
        "explanation": "This clearly describes observable topography, physical action, and measurable acoustic impact."
      },
      {
        "id": "C",
        "text": "Client became sensory-overloaded and suffered an emotional crisis.",
        "isCorrect": false,
        "explanation": "Sensory overloaded and emotional crisis are explanatory fictions without operational specificity."
      },
      {
        "id": "D",
        "text": "Client demonstrated bad intentions and was non-compliant with therapist commands.",
        "isCorrect": false,
        "explanation": "Bad intentions is a subjective, non-measurable judgment."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Operational definitions must describe the observable topography and measurable physical parameters of behavior without subjective speculation.",
    "clinicalExplanation": "BACB TCO Item A.5: Describing behavior in measurable terms ensures inter-observer agreement across the clinical treatment team.",
    "references": "BACB RBT 3rd Edition TCO Item A.5",
    "category": "Data Collection and Graphing",
    "subCategory": "Observable & Measurable Terms",
    "keywords": [
      "Data Collection and Graphing",
      "Observable & Measurable Terms",
      "A.5"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a06-1",
    "certification": "RBT",
    "question": "A learner engages in 18 instances of hand-biting during a 3-hour session. What is the calculated rate of hand-biting?",
    "scenarioText": "The RBT needs to calculate the rate of behavior per hour for supervisor reporting.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "54 instances per hour",
        "isCorrect": false,
        "explanation": "This incorrectly multiplies count by hours instead of dividing."
      },
      {
        "id": "B",
        "text": "15 instances per hour",
        "isCorrect": false,
        "explanation": "Incorrect subtraction."
      },
      {
        "id": "C",
        "text": "6 instances per hour",
        "isCorrect": true,
        "explanation": "18 instances divided by 3 hours equals 6 instances per hour."
      },
      {
        "id": "D",
        "text": "0.5 instances per minute",
        "isCorrect": false,
        "explanation": "18 instances / 180 minutes equals 0.1 instances per minute, not 0.5."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Rate is calculated as total count divided by total observation time: 18 occurrences / 3 hours = 6 occurrences per hour.",
    "clinicalExplanation": "BACB TCO Item A.6: Rate allows meaningful comparisons of behavior frequency across sessions of unequal lengths.",
    "references": "BACB RBT 3rd Edition TCO Item A.6",
    "category": "Data Collection and Graphing",
    "subCategory": "Rate Calculation",
    "keywords": [
      "Data Collection and Graphing",
      "Rate Calculation",
      "A.6"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a06-2",
    "certification": "RBT",
    "question": "During a discrete trial session, a client responds correctly on 16 out of 20 opportunities. What is the client's percentage of correct responses?",
    "scenarioText": "The RBT conducts 20 distinct expressive label trials across the morning.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "70%",
        "isCorrect": false,
        "explanation": "14/20 is 70%."
      },
      {
        "id": "B",
        "text": "75%",
        "isCorrect": false,
        "explanation": "15/20 is 75%."
      },
      {
        "id": "C",
        "text": "85%",
        "isCorrect": false,
        "explanation": "17/20 is 85%."
      },
      {
        "id": "D",
        "text": "80%",
        "isCorrect": true,
        "explanation": "16 divided by 20 equals 0.80, or 80%."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Percentage is calculated by dividing correct responses by total opportunities and multiplying by 100: (16 / 20) * 100 = 80%.",
    "clinicalExplanation": "BACB TCO Item A.6: Mastery criteria in skill acquisition plans are frequently expressed as percentage of independent trials.",
    "references": "BACB RBT 3rd Edition TCO Item A.6",
    "category": "Data Collection and Graphing",
    "subCategory": "Percentage Calculation",
    "keywords": [
      "Data Collection and Graphing",
      "Percentage Calculation",
      "A.6"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a07-1",
    "certification": "RBT",
    "question": "When examining a client's daily graph of tantrum frequency across 10 consecutive sessions, the data points consistently slope downward from left to right. How is this trend described?",
    "scenarioText": "Session counts were 14, 12, 11, 9, 8, 7, 5, 4, 3, 2.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Descending trend",
        "isCorrect": true,
        "explanation": "A systematic downward slope from left to right represents a descending trend."
      },
      {
        "id": "B",
        "text": "Ascending trend",
        "isCorrect": false,
        "explanation": "Ascending trend indicates an upward slope in data."
      },
      {
        "id": "C",
        "text": "Zero trend",
        "isCorrect": false,
        "explanation": "Zero trend indicates horizontal data points with no directional tilt."
      },
      {
        "id": "D",
        "text": "Variable trend",
        "isCorrect": false,
        "explanation": "Consistently downward slopes show clear directionality rather than high variability."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Trend refers to the overall directional orientation of data points on a graph (ascending, descending, or zero/neutral).",
    "clinicalExplanation": "BACB TCO Item A.7: Recognizing trends allows clinical supervisors to assess whether intervention strategies are producing desired change.",
    "references": "BACB RBT 3rd Edition TCO Item A.7",
    "category": "Data Collection and Graphing",
    "subCategory": "Visual Analysis - Trend",
    "keywords": [
      "Data Collection and Graphing",
      "Visual Analysis - Trend",
      "A.7"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a07-2",
    "certification": "RBT",
    "question": "In visual analysis of graphed behavior, what does the term 'level' refer to?",
    "scenarioText": "A supervisor asks an RBT to describe the shift in level between the baseline phase and the intervention phase.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "The directional tilt of the line from left to right",
        "isCorrect": false,
        "explanation": "Directional tilt is the trend of the data."
      },
      {
        "id": "B",
        "text": "The mean or median value of the data set along the vertical axis within a given condition",
        "isCorrect": true,
        "explanation": "Level refers to the value on the vertical axis around which a series of data points converges."
      },
      {
        "id": "C",
        "text": "The variability or bounce among individual consecutive data points",
        "isCorrect": false,
        "explanation": "Bounce and spread around the trend line is variability."
      },
      {
        "id": "D",
        "text": "The total number of sessions conducted during the study",
        "isCorrect": false,
        "explanation": "Total sessions represents the abscissa scale length."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Level represents the position of the data set on the Y-axis relative to a mean or median value within an experimental phase.",
    "clinicalExplanation": "BACB TCO Item A.7: Changes in level between baseline and intervention indicate the immediate magnitude of behavior change.",
    "references": "BACB RBT 3rd Edition TCO Item A.7",
    "category": "Data Collection and Graphing",
    "subCategory": "Visual Analysis - Level",
    "keywords": [
      "Data Collection and Graphing",
      "Visual Analysis - Level",
      "A.7"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-a08-1",
    "certification": "RBT",
    "question": "What is the primary clinical risk if an RBT fails to collect data accurately or implements measurement procedures with poor procedural fidelity?",
    "scenarioText": "An RBT occasionally forgets to track interval data during busy clinic transitions and estimates scores at the end of the day.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "The client will become physically immune to ABA reinforcers.",
        "isCorrect": false,
        "explanation": "Biological reinforcement mechanisms do not disappear due to measurement error."
      },
      {
        "id": "B",
        "text": "The client will automatically lose their insurance coverage within 24 hours.",
        "isCorrect": false,
        "explanation": "Insurance reviews take time, but the immediate direct danger is clinical misdirection."
      },
      {
        "id": "C",
        "text": "The BCBA supervisor may make incorrect clinical decisions regarding intervention effectiveness or prematurely discontinue necessary treatment.",
        "isCorrect": true,
        "explanation": "Inaccurate data distorts clinical reality, risking harmful modifications or retention of ineffective procedures."
      },
      {
        "id": "D",
        "text": "The RBT will be legally required to take the BACB exam again immediately.",
        "isCorrect": false,
        "explanation": "Exam re-examination is not an automated administrative penalty for recording error."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Unreliable data collection skews visual analysis, causing BCBAs to make flawed clinical decisions about whether treatments work.",
    "clinicalExplanation": "BACB TCO Item A.8: Procedural fidelity and measurement accuracy protect client welfare and ensure evidence-based intervention.",
    "references": "BACB RBT 3rd Edition TCO Item A.8",
    "category": "Data Collection and Graphing",
    "subCategory": "Data Reliability Risks",
    "keywords": [
      "Data Collection and Graphing",
      "Data Reliability Risks",
      "A.8"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-b01-1",
    "certification": "RBT",
    "question": "An RBT lays out an array of 5 preferred snacks. The client selects a pretzel and eats it. For the next trial, the RBT rearranges the remaining 4 snacks without returning the pretzel to the array. What preference assessment is this?",
    "scenarioText": "The RBT repeats this process until no items remain, establishing a preference hierarchy.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Free Operant Preference Assessment",
        "isCorrect": false,
        "explanation": "Free operant allows unrestricted access without trials or item removal."
      },
      {
        "id": "B",
        "text": "Multiple Stimulus with Replacement (MSW)",
        "isCorrect": false,
        "explanation": "MSW returns the chosen item to the array before the next trial."
      },
      {
        "id": "C",
        "text": "Paired Stimulus Preference Assessment",
        "isCorrect": false,
        "explanation": "Paired stimulus presents items strictly in pairs of two."
      },
      {
        "id": "D",
        "text": "Multiple Stimulus without Replacement (MSWO)",
        "isCorrect": true,
        "explanation": "MSWO leaves out chosen items on subsequent trials to create a ranked hierarchy."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "In an MSWO assessment, chosen items are not replaced in subsequent arrays, allowing rapid establishment of a ranked hierarchy.",
    "clinicalExplanation": "BACB TCO Item B.1: MSWO is an efficient preference assessment method for learners who can scan multi-item arrays.",
    "references": "BACB RBT 3rd Edition TCO Item B.1",
    "category": "Behavior Assessment",
    "subCategory": "Preference Assessment - MSWO",
    "keywords": [
      "Behavior Assessment",
      "Preference Assessment - MSWO",
      "B.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-b01-2",
    "certification": "RBT",
    "question": "An RBT places two toys in front of a child and says, 'Pick one.' The RBT pairs every item with every other item across systematic trials. What assessment is this?",
    "scenarioText": "Six items are evaluated, yielding 15 pairwise comparison trials.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Paired Choice (Forced Choice) Assessment",
        "isCorrect": true,
        "explanation": "Paired choice presents items in pairs and calculates the percentage of trials each item was chosen."
      },
      {
        "id": "B",
        "text": "Free Operant Assessment",
        "isCorrect": false,
        "explanation": "Free operant involves unrestricted exploration in an enriched setting."
      },
      {
        "id": "C",
        "text": "Single Item Presentation",
        "isCorrect": false,
        "explanation": "Single item presents one item at a time."
      },
      {
        "id": "D",
        "text": "Multiple Stimulus without Replacement (MSWO)",
        "isCorrect": false,
        "explanation": "MSWO uses arrays of 3 or more items simultaneously."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Paired stimulus (forced choice) preference assessment presents two items simultaneously, counterbalancing positions across all possible pairs.",
    "clinicalExplanation": "BACB TCO Item B.1: Paired choice provides clear preference hierarchies, though it takes longer to administer than MSWO.",
    "references": "BACB RBT 3rd Edition TCO Item B.1",
    "category": "Behavior Assessment",
    "subCategory": "Preference Assessment - Paired Choice",
    "keywords": [
      "Behavior Assessment",
      "Preference Assessment - Paired Choice",
      "B.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-b01-3",
    "certification": "RBT",
    "question": "An RBT observes a learner in a playroom with various toys available and records the total duration of time the child engages with each toy without delivering prompts or removing items. What type of assessment is this?",
    "scenarioText": "The child spends 8 minutes with trains, 4 minutes with blocks, and 30 seconds with puzzles.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Paired Choice Preference Assessment",
        "isCorrect": false,
        "explanation": "Paired choice requires structured trials with two items presented at a time."
      },
      {
        "id": "B",
        "text": "Free Operant Preference Assessment",
        "isCorrect": true,
        "explanation": "Free operant allows non-contingent access to items and measures total engagement duration."
      },
      {
        "id": "C",
        "text": "Functional Analysis",
        "isCorrect": false,
        "explanation": "Functional analysis manipulates antecedents and consequences to test behavior function."
      },
      {
        "id": "D",
        "text": "Functional Communication Training",
        "isCorrect": false,
        "explanation": "FCT is an intervention procedure, not a preference assessment."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "A Free Operant preference assessment measures engagement duration with freely accessible toys without structured trial prompts or item removal.",
    "clinicalExplanation": "BACB TCO Item B.1: Free operant assessments avoid triggering problem behavior that might occur when preferred items are removed.",
    "references": "BACB RBT 3rd Edition TCO Item B.1",
    "category": "Behavior Assessment",
    "subCategory": "Preference Assessment - Free Operant",
    "keywords": [
      "Behavior Assessment",
      "Preference Assessment - Free Operant",
      "B.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-b01-4",
    "certification": "RBT",
    "question": "What is the key difference between a preference assessment and a reinforcer assessment?",
    "scenarioText": "An RBT notes that a child always selects a green bouncy ball during MSWO trials, but when offered the ball for completing math, math completion does not increase.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Preference assessments are only done with food, while reinforcers are always toys",
        "isCorrect": false,
        "explanation": "Preferences and reinforcers encompass both edibles and tangible/social items."
      },
      {
        "id": "B",
        "text": "There is no difference; the terms are completely identical in ABA",
        "isCorrect": false,
        "explanation": "They are distinct conceptual terms with different clinical definitions."
      },
      {
        "id": "C",
        "text": "A preference assessment identifies stimuli a client likes, but only a reinforcer assessment verifies whether delivering the stimulus increases behavior",
        "isCorrect": true,
        "explanation": "Preference indicates interest; reinforcement is defined by whether it actually increases future behavior frequency."
      },
      {
        "id": "D",
        "text": "Reinforcer assessments are illegal under the RBT Ethics Code 2.0",
        "isCorrect": false,
        "explanation": "Reinforcer assessments are standard evidence-based behavior-analytic procedures."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "A preference assessment identifies potential reinforcers, but a reinforcer assessment experimentally confirms that delivery increases the future frequency of the target behavior.",
    "clinicalExplanation": "BACB TCO Item B.1: Just because an item is highly preferred does not guarantee it will function as an effective reinforcer for difficult demands.",
    "references": "BACB RBT 3rd Edition TCO Item B.1",
    "category": "Behavior Assessment",
    "subCategory": "Preference vs Reinforcer",
    "keywords": [
      "Behavior Assessment",
      "Preference vs Reinforcer",
      "B.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-b02-1",
    "certification": "RBT",
    "question": "What is the primary role of an RBT when assisting a BCBA with curriculum-based skill assessments (e.g., VB-MAPP, ABLLS-R)?",
    "scenarioText": "A BCBA instructs an RBT to probe receptive identification of 10 common household objects prior to beginning a new program.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Interpret psychological diagnosis and prescribe developmental therapies",
        "isCorrect": false,
        "explanation": "RBTs do not formulate diagnoses or prescribe medical treatment."
      },
      {
        "id": "B",
        "text": "Teach the skills immediately by providing full physical hand-over-hand assistance",
        "isCorrect": false,
        "explanation": "Providing assistance invalidates baseline measurement of independent skill levels."
      },
      {
        "id": "C",
        "text": "Modify the assessment criteria whenever the learner becomes frustrated",
        "isCorrect": false,
        "explanation": "Assessment criteria must remain standardized and cannot be altered independently by an RBT."
      },
      {
        "id": "D",
        "text": "Probe baseline skills without prompting and record learner responses accurately",
        "isCorrect": true,
        "explanation": "RBTs assist by probing target skills objectively according to the assessment protocol."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "When assisting with skill assessments, RBTs probe independent responses without teaching prompts to establish a true baseline of learner competency.",
    "clinicalExplanation": "BACB TCO Item B.2: Baseline skill probes provide the BCBA with accurate data to design tailored curriculum milestones.",
    "references": "BACB RBT 3rd Edition TCO Item B.2",
    "category": "Behavior Assessment",
    "subCategory": "Skill Assessment - Baseline Probing",
    "keywords": [
      "Behavior Assessment",
      "Skill Assessment - Baseline Probing",
      "B.2"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-b02-2",
    "certification": "RBT",
    "question": "An RBT is asked to assist with assessing peer play skills in a clinic preschool room. How should the RBT participate?",
    "scenarioText": "The BCBA provides a standardized social interaction checklist.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Collect objective observational data on peer proximity, sharing, and verbal initiations as directed",
        "isCorrect": true,
        "explanation": "Observing and recording defined social behaviors under supervisor guidance is the core RBT role."
      },
      {
        "id": "B",
        "text": "Force the peer to play with the client regardless of peer consent",
        "isCorrect": false,
        "explanation": "Forcing interaction violates ethical dignity guidelines."
      },
      {
        "id": "C",
        "text": "Diagnose the peer with communication deficits",
        "isCorrect": false,
        "explanation": "RBTs do not evaluate or diagnose non-client peers."
      },
      {
        "id": "D",
        "text": "Replace the client's behavioral plan with an unapproved social game",
        "isCorrect": false,
        "explanation": "RBTs must adhere strictly to approved BCBA behavior protocols."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "RBTs assist with developmental and social assessments by collecting objective behavioral observations designated by their supervisor.",
    "clinicalExplanation": "BACB TCO Item B.2: Participating in developmental assessments ensures multi-setting clinical validity.",
    "references": "BACB RBT 3rd Edition TCO Item B.2",
    "category": "Behavior Assessment",
    "subCategory": "Skill Assessment - Social Skills",
    "keywords": [
      "Behavior Assessment",
      "Skill Assessment - Social Skills",
      "B.2"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-b03-1",
    "certification": "RBT",
    "question": "An RBT records what occurs immediately before a tantrum (teacher asks student to write name), the behavior (child throws pencil and screams), and what occurs immediately after (teacher removes worksheet). What assessment procedure is this?",
    "scenarioText": "This 3-term contingency logging is performed throughout the day.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Experimental Functional Analysis",
        "isCorrect": false,
        "explanation": "Functional analysis requires systematic experimental manipulation of environmental contingencies."
      },
      {
        "id": "B",
        "text": "ABC (Antecedent-Behavior-Consequence) Data Collection",
        "isCorrect": true,
        "explanation": "ABC recording documents events immediately preceding and following behavior during descriptive assessment."
      },
      {
        "id": "C",
        "text": "Trial-by-Trial Reinforcement Schedule",
        "isCorrect": false,
        "explanation": "This is an instructional procedure, not a functional assessment log."
      },
      {
        "id": "D",
        "text": "Preference Assessment",
        "isCorrect": false,
        "explanation": "Preference assessments identify reinforcers, not antecedents and consequences."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "ABC data collection records the antecedent event preceding behavior and the consequence following it to identify potential maintaining variables.",
    "clinicalExplanation": "BACB TCO Item B.3: ABC narrative and structured recording are standard descriptive functional assessment methods.",
    "references": "BACB RBT 3rd Edition TCO Item B.3",
    "category": "Behavior Assessment",
    "subCategory": "Functional Assessment - ABC Data",
    "keywords": [
      "Behavior Assessment",
      "Functional Assessment - ABC Data",
      "B.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-b03-2",
    "certification": "RBT",
    "question": "During descriptive functional assessments, why is it critical that an RBT avoids writing assumptions like 'client wanted to annoy staff' in the consequence column?",
    "scenarioText": "An RBT is recording ABC data during a challenging session.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Because the client can read the clipboard and might feel offended",
        "isCorrect": false,
        "explanation": "Client clipboard visibility does not define behavior-analytic operational standards."
      },
      {
        "id": "B",
        "text": "Because annoy staff is technically a DSM-5 clinical condition",
        "isCorrect": false,
        "explanation": "Annoy staff is not a psychiatric condition."
      },
      {
        "id": "C",
        "text": "Because consequences must record observable environmental actions, such as staff attention, item delivery, or task removal",
        "isCorrect": true,
        "explanation": "Descriptive data must document physical events to help BCBAs identify the environmental function."
      },
      {
        "id": "D",
        "text": "Because RBTs are only allowed to write one word per note",
        "isCorrect": false,
        "explanation": "Documentation length must be complete and informative."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Consequences in ABC data must describe concrete environmental events (e.g., verbal reprimand, iPad removed) rather than internal motives.",
    "clinicalExplanation": "BACB TCO Item B.3: Clear consequence descriptions reveal whether behaviors produce social attention, tangible access, or escape.",
    "references": "BACB RBT 3rd Edition TCO Item B.3",
    "category": "Behavior Assessment",
    "subCategory": "Functional Assessment - Objective Consequences",
    "keywords": [
      "Behavior Assessment",
      "Functional Assessment - Objective Consequences",
      "B.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-b03-3",
    "certification": "RBT",
    "question": "Can an RBT independently design and conduct an analogue Functional Analysis (FA) involving systematically triggering severe self-injury?",
    "scenarioText": "A parent asks the RBT to test whether loud noises make the client hit themselves.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Yes, as long as the RBT has worked with the client for at least 1 month",
        "isCorrect": false,
        "explanation": "RBTs are never permitted to design or independently conduct functional analyses."
      },
      {
        "id": "B",
        "text": "Yes, if the parent signs a paper waiver",
        "isCorrect": false,
        "explanation": "Parent waivers do not override BACB scope of practice boundaries."
      },
      {
        "id": "C",
        "text": "Yes, provided the RBT uses a padded helmet",
        "isCorrect": false,
        "explanation": "Protective equipment does not grant clinical license to conduct experimental analyses."
      },
      {
        "id": "D",
        "text": "No, functional analyses involve experimental risk and must be designed and directly supervised by a qualified BCBA",
        "isCorrect": true,
        "explanation": "FA procedures require advanced behavioral expertise to ensure safety and clinical validity."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "RBTs may assist with functional analysis procedures only under the direct direction and supervision of a BCBA; they cannot conduct them independently.",
    "clinicalExplanation": "BACB TCO Item B.3: Experimental functional analysis requires advanced clinical training and ethical risk analysis.",
    "references": "BACB RBT 3rd Edition TCO Item B.3",
    "category": "Behavior Assessment",
    "subCategory": "Functional Analysis Role Boundaries",
    "keywords": [
      "Behavior Assessment",
      "Functional Analysis Role Boundaries",
      "B.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c01-1",
    "certification": "RBT",
    "question": "Immediately following a child handing a picture card to request a cracker, the RBT provides a cracker, and cracker requesting increases in the future. What principle has been applied?",
    "scenarioText": "The RBT delivers the requested item within 2 seconds of the communication response.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Positive Reinforcement",
        "isCorrect": true,
        "explanation": "Positive reinforcement involves presenting a stimulus immediately after a response that increases the future probability of that response."
      },
      {
        "id": "B",
        "text": "Negative Reinforcement",
        "isCorrect": false,
        "explanation": "Negative reinforcement involves removing an aversive stimulus to increase behavior."
      },
      {
        "id": "C",
        "text": "Positive Punishment",
        "isCorrect": false,
        "explanation": "Positive punishment presents an aversive stimulus to decrease behavior."
      },
      {
        "id": "D",
        "text": "Stimulus Fading",
        "isCorrect": false,
        "explanation": "Stimulus fading is an antecedent modification technique."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Positive reinforcement occurs when a stimulus is added contingently following a behavior, resulting in an increased future frequency of that behavior.",
    "clinicalExplanation": "BACB TCO Item C.1: Immediate and contingent reinforcement delivery is essential for effective behavior acquisition.",
    "references": "BACB RBT 3rd Edition TCO Item C.1",
    "category": "Behavior Acquisition",
    "subCategory": "Positive Reinforcement",
    "keywords": [
      "Behavior Acquisition",
      "Positive Reinforcement",
      "C.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c01-2",
    "certification": "RBT",
    "question": "When a student feels a headache from loud classroom chatter, putting on noise-cancelling headphones removes the unpleasant sound, and headphone wearing increases during loud periods. What is this?",
    "scenarioText": "The noise stops immediately when headphones are placed over the ears.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Positive Punishment",
        "isCorrect": false,
        "explanation": "Positive punishment adds an aversive stimulus to reduce behavior."
      },
      {
        "id": "B",
        "text": "Negative Reinforcement",
        "isCorrect": true,
        "explanation": "Negative reinforcement occurs when the removal or termination of an aversive stimulus strengthens a behavior."
      },
      {
        "id": "C",
        "text": "Negative Punishment",
        "isCorrect": false,
        "explanation": "Negative punishment removes a preferred item to decrease behavior."
      },
      {
        "id": "D",
        "text": "Extinction",
        "isCorrect": false,
        "explanation": "Extinction withholds reinforcement for previously reinforced behavior."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Negative reinforcement increases behavior frequency through the contingent removal, termination, or reduction of an aversive stimulus.",
    "clinicalExplanation": "BACB TCO Item C.1: Understanding negative reinforcement is vital for identifying functional escape behaviors and designing replacement skills.",
    "references": "BACB RBT 3rd Edition TCO Item C.1",
    "category": "Behavior Acquisition",
    "subCategory": "Negative Reinforcement",
    "keywords": [
      "Behavior Acquisition",
      "Negative Reinforcement",
      "C.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c01-3",
    "certification": "RBT",
    "question": "An RBT delivers reinforcement after an average of every 5 independent vocal responses (e.g., after 3, then 7, then 5). Which schedule of reinforcement is in effect?",
    "scenarioText": "The learner does not know exactly which trial will yield the reinforcer, producing steady, high response rates.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Fixed Ratio 5 (FR5)",
        "isCorrect": false,
        "explanation": "FR5 reinforces strictly after every 5th response, not on a variable average."
      },
      {
        "id": "B",
        "text": "Fixed Interval 5 (FI5)",
        "isCorrect": false,
        "explanation": "FI5 reinforces the first response after 5 minutes has elapsed."
      },
      {
        "id": "C",
        "text": "Variable Ratio 5 (VR5)",
        "isCorrect": true,
        "explanation": "VR5 delivers reinforcement after an average number of responses, creating high, consistent responding with minimal pauses."
      },
      {
        "id": "D",
        "text": "Continuous Reinforcement (CRF)",
        "isCorrect": false,
        "explanation": "CRF delivers reinforcement after every single response."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "A Variable Ratio (VR) schedule delivers reinforcement after an unpredictable, variable number of responses centered around an average value.",
    "clinicalExplanation": "BACB TCO Item C.1: VR schedules produce the highest and most steady rates of responding and are highly resistant to extinction.",
    "references": "BACB RBT 3rd Edition TCO Item C.1",
    "category": "Behavior Acquisition",
    "subCategory": "Schedules of Reinforcement - VR",
    "keywords": [
      "Behavior Acquisition",
      "Schedules of Reinforcement - VR",
      "C.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c02-1",
    "certification": "RBT",
    "question": "How does an RBT establish a neutral stimulus (such as verbal praise or a token) as a conditioned reinforcer?",
    "scenarioText": "A child initially does not care about praise or stickers, caring only for potato chips.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "By withholding all food reinforcers until the child complies with praise",
        "isCorrect": false,
        "explanation": "Depriving clients of basic biological needs violates ethical codes."
      },
      {
        "id": "B",
        "text": "By punishing the child when they do not smile after hearing praise",
        "isCorrect": false,
        "explanation": "Punishment cannot establish conditioned reinforcement."
      },
      {
        "id": "C",
        "text": "By asking the parent to explain the definition of praise to the child",
        "isCorrect": false,
        "explanation": "Verbal rule explanations are ineffective without stimulus pairing in early learners."
      },
      {
        "id": "D",
        "text": "By systematically pairing the neutral stimulus with established unconditioned or backup reinforcers",
        "isCorrect": true,
        "explanation": "Stimulus-stimulus pairing allows neutral stimuli to acquire reinforcing value through association."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Conditioned reinforcers are established when a neutral stimulus is repeatedly paired with established primary (unconditioned) or secondary reinforcers.",
    "clinicalExplanation": "BACB TCO Item C.2: Pairing praise and social attention with preferred tangibles is fundamental for expanding naturalistic reinforcers.",
    "references": "BACB RBT 3rd Edition TCO Item C.2",
    "category": "Behavior Acquisition",
    "subCategory": "Conditioned Reinforcers - Pairing",
    "keywords": [
      "Behavior Acquisition",
      "Conditioned Reinforcers - Pairing",
      "C.2"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c03-1",
    "certification": "RBT",
    "question": "What are the essential sequential components of a single Discrete Trial Teaching (DTT) trial?",
    "scenarioText": "An RBT sits across from a learner at a therapy table conducting structured language trials.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Antecedent (SD) -> Prompt (if needed) -> Learner Response -> Consequence -> Inter-Trial Interval (ITI)",
        "isCorrect": true,
        "explanation": "This represents the exact 5-step operational anatomy of a discrete trial."
      },
      {
        "id": "B",
        "text": "Data entry -> Parent update -> Client break -> Goal revision",
        "isCorrect": false,
        "explanation": "These are administrative and planning steps, not the trial anatomy."
      },
      {
        "id": "C",
        "text": "Reinforcement -> Punishment -> Extinction -> Generalization",
        "isCorrect": false,
        "explanation": "These are behavioral principles, not the discrete trial sequence."
      },
      {
        "id": "D",
        "text": "Assessment -> Baseline -> Functional Analysis -> Graphing",
        "isCorrect": false,
        "explanation": "These are assessment stages, not trial components."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "A discrete trial consists of: 1) Discriminative Stimulus (SD), 2) Prompt, 3) Response, 4) Consequence, and 5) Inter-Trial Interval.",
    "clinicalExplanation": "BACB TCO Item C.3: Crisp presentation of the SD and an appropriate inter-trial interval prevent trial blurring.",
    "references": "BACB RBT 3rd Edition TCO Item C.3",
    "category": "Behavior Acquisition",
    "subCategory": "DTT - Trial Structure",
    "keywords": [
      "Behavior Acquisition",
      "DTT - Trial Structure",
      "C.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c03-2",
    "certification": "RBT",
    "question": "What is the primary characteristic of the Inter-Trial Interval (ITI) in discrete trial training?",
    "scenarioText": "An RBT pauses after delivering praise before presenting the next stimulus card.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "It must last at least 15 minutes to allow the child to take a full nap",
        "isCorrect": false,
        "explanation": "A 15-minute gap disrupts instructional momentum."
      },
      {
        "id": "B",
        "text": "It should be a brief pause of approximately 1 to 5 seconds to record data and clearly separate trials",
        "isCorrect": true,
        "explanation": "A brief ITI allows data logging while preventing fatigue and keeping the learner engaged."
      },
      {
        "id": "C",
        "text": "It should only occur if the client answered incorrectly",
        "isCorrect": false,
        "explanation": "ITIs occur after every trial regardless of correctness."
      },
      {
        "id": "D",
        "text": "It requires the RBT to leave the therapy room completely",
        "isCorrect": false,
        "explanation": "Therapists remain present to manage table stimuli."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "The Inter-Trial Interval is the brief period (typically 1-5 seconds) between consequence delivery and the next trial SD, used for data entry.",
    "clinicalExplanation": "BACB TCO Item C.3: Consistent ITI timing maintains clear trial boundaries.",
    "references": "BACB RBT 3rd Edition TCO Item C.3",
    "category": "Behavior Acquisition",
    "subCategory": "DTT - Inter-Trial Interval",
    "keywords": [
      "Behavior Acquisition",
      "DTT - Inter-Trial Interval",
      "C.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c04-1",
    "certification": "RBT",
    "question": "An RBT observes a child reaching for bubbles placed on a high shelf. Instead of immediately handing over the bubbles, the RBT models the word 'Bubbles!' and waits for an echoic mand. What procedure is being used?",
    "scenarioText": "The learning opportunity is embedded directly in the child's natural play interest.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Discrete Trial Teaching at the table",
        "isCorrect": false,
        "explanation": "This is embedded in spontaneous play rather than structured table trials."
      },
      {
        "id": "B",
        "text": "Backward Chaining with Total Task",
        "isCorrect": false,
        "explanation": "Chaining teaches multi-step tasks, not single mand trials in play."
      },
      {
        "id": "C",
        "text": "Naturalistic Teaching (Incidental Teaching)",
        "isCorrect": true,
        "explanation": "Incidental teaching capitalizes on child motivation within the natural environment to teach target skills."
      },
      {
        "id": "D",
        "text": "Extinction Procedure",
        "isCorrect": false,
        "explanation": "Extinction withholds reinforcement; here reinforcement was delivered after the target mand."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Incidental teaching (a naturalistic procedure) utilizes child-initiated interactions and current establishing operations to prompt target skills.",
    "clinicalExplanation": "BACB TCO Item C.4: NET fosters spontaneous communication and reduces prompt dependency.",
    "references": "BACB RBT 3rd Edition TCO Item C.4",
    "category": "Behavior Acquisition",
    "subCategory": "Naturalistic Teaching - NET",
    "keywords": [
      "Behavior Acquisition",
      "Naturalistic Teaching - NET",
      "C.4"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c05-1",
    "certification": "RBT",
    "question": "An RBT teaches a 5-step handwashing sequence by reinforcing independent completion of Step 1 (turning on water) while prompting all remaining steps. Once Step 1 is mastered, the RBT teaches Step 2. What chaining procedure is this?",
    "scenarioText": "Teaching proceeds in the chronological sequence of the task analysis from start to finish.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Backward Chaining",
        "isCorrect": false,
        "explanation": "Backward chaining teaches the final step first."
      },
      {
        "id": "B",
        "text": "Total Task Chaining",
        "isCorrect": false,
        "explanation": "Total task prompts every step during every trial."
      },
      {
        "id": "C",
        "text": "Shaping",
        "isCorrect": false,
        "explanation": "Shaping reinforces successive approximations of a single topography, not a chain of distinct behaviors."
      },
      {
        "id": "D",
        "text": "Forward Chaining",
        "isCorrect": true,
        "explanation": "Forward chaining reinforces the first step of the chain first, then requires step 1 and 2, moving chronologically forward."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Forward chaining teaches behaviors in their chronological order, requiring mastery of initial steps before adding subsequent links.",
    "clinicalExplanation": "BACB TCO Item C.5: Forward chaining is helpful for learners who easily learn starting steps or tasks with clear beginning cues.",
    "references": "BACB RBT 3rd Edition TCO Item C.5",
    "category": "Behavior Acquisition",
    "subCategory": "Chaining - Forward",
    "keywords": [
      "Behavior Acquisition",
      "Chaining - Forward",
      "C.5"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c05-2",
    "certification": "RBT",
    "question": "When teaching a client to put on a jacket, the RBT completes steps 1 through 4 (arms in sleeves, collar up) and prompts the child only on Step 5 (zipping up), immediately delivering enthusiastic reinforcement. What is this?",
    "scenarioText": "The learner experiences the natural terminal reinforcer immediately upon completing the final step.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Backward Chaining",
        "isCorrect": true,
        "explanation": "Backward chaining completes initial steps for the client and reinforces independent completion of the final step first."
      },
      {
        "id": "B",
        "text": "Forward Chaining",
        "isCorrect": false,
        "explanation": "Forward chaining starts with the first step."
      },
      {
        "id": "C",
        "text": "Errorless Discrimination",
        "isCorrect": false,
        "explanation": "This is chaining a multi-step motor response, not stimulus discrimination."
      },
      {
        "id": "D",
        "text": "Free Operant Assessment",
        "isCorrect": false,
        "explanation": "Free operant is a preference measurement tool."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Backward chaining prompts all initial steps and teaches the final step first, ensuring immediate access to the terminal reinforcer.",
    "clinicalExplanation": "BACB TCO Item C.5: Backward chaining is especially powerful for clients who benefit from quick reinforcement contact.",
    "references": "BACB RBT 3rd Edition TCO Item C.5",
    "category": "Behavior Acquisition",
    "subCategory": "Chaining - Backward",
    "keywords": [
      "Behavior Acquisition",
      "Chaining - Backward",
      "C.5"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c06-1",
    "certification": "RBT",
    "question": "An RBT places a picture of a dog (SD) and a picture of a cat (S-delta) on the table and says, 'Touch dog.' When the child touches the dog, the RBT provides a sticker. When the child touches the cat, the RBT provides no reinforcement. What procedure is this?",
    "scenarioText": "Through differential reinforcement, the child learns to respond only to the designated stimulus.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Generalization Training",
        "isCorrect": false,
        "explanation": "Generalization promotes responding across diverse untaught stimuli."
      },
      {
        "id": "B",
        "text": "Discrimination Training",
        "isCorrect": true,
        "explanation": "Discrimination training reinforces responses in the presence of the SD while withholding reinforcement in the presence of S-delta stimuli."
      },
      {
        "id": "C",
        "text": "Non-contingent Reinforcement",
        "isCorrect": false,
        "explanation": "NCR delivers reinforcement on a time-based schedule without response requirements."
      },
      {
        "id": "D",
        "text": "Task Analysis",
        "isCorrect": false,
        "explanation": "Task analysis breaks complex tasks into behavioral chains."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Stimulus discrimination training involves reinforcing a behavior in the presence of one stimulus (SD) and not in the presence of others (S-delta).",
    "clinicalExplanation": "BACB TCO Item C.6: Discrimination training is fundamental for receptive language, reading, and object identification.",
    "references": "BACB RBT 3rd Edition TCO Item C.6",
    "category": "Behavior Acquisition",
    "subCategory": "Discrimination Training",
    "keywords": [
      "Behavior Acquisition",
      "Discrimination Training",
      "C.6"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c07-1",
    "certification": "RBT",
    "question": "An RBT begins a new cutting-with-scissors program by providing Full Physical hand-over-hand guidance. Over successive trials, the RBT fades to Partial Physical, then Modeling, and finally Gestural pointing. What prompt hierarchy is being implemented?",
    "scenarioText": "The prompt intensity decreases as the learner demonstrates mastery.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Least-to-Most Prompting",
        "isCorrect": false,
        "explanation": "Least-to-most starts with independent opportunity and increases prompt level only if errors occur."
      },
      {
        "id": "B",
        "text": "Stimulus Shaping",
        "isCorrect": false,
        "explanation": "Stimulus shaping alters the physical dimensions of the antecedent stimulus."
      },
      {
        "id": "C",
        "text": "Most-to-Least (MTL) Prompting",
        "isCorrect": true,
        "explanation": "Most-to-least begins with the highest level of assistance and systematically fades to less intrusive prompts."
      },
      {
        "id": "D",
        "text": "Spontaneous Recovery",
        "isCorrect": false,
        "explanation": "Spontaneous recovery is the reappearance of an extinguished behavior."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Most-to-Least prompting begins with maximum assistance to ensure correct responding and gradually fades intrusive support to promote independence.",
    "clinicalExplanation": "BACB TCO Item C.7: Most-to-least is commonly used in errorless learning when introducing novel or complex motor skills.",
    "references": "BACB RBT 3rd Edition TCO Item C.7",
    "category": "Behavior Acquisition",
    "subCategory": "Prompting - Most-to-Least",
    "keywords": [
      "Behavior Acquisition",
      "Prompting - Most-to-Least",
      "C.7"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c07-2",
    "certification": "RBT",
    "question": "When teaching a client to name flashcards, the RBT initially presents the card and immediately states the word (0-second delay). Across subsequent sessions, the RBT waits 3 seconds before providing the verbal prompt. What fading procedure is this?",
    "scenarioText": "The delay provides the learner a window of opportunity to respond independently before the prompt is delivered.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Graduated Guidance",
        "isCorrect": false,
        "explanation": "Graduated guidance adjusts physical guidance moment-by-moment during motor tasks."
      },
      {
        "id": "B",
        "text": "Stimulus Fading",
        "isCorrect": false,
        "explanation": "Stimulus fading alters the physical size, color, or shape of the stimulus."
      },
      {
        "id": "C",
        "text": "Overcorrection",
        "isCorrect": false,
        "explanation": "Overcorrection is a punishment procedure."
      },
      {
        "id": "D",
        "text": "Constant or Progressive Time Delay",
        "isCorrect": true,
        "explanation": "Time delay inserts a systematic temporal interval between the SD and prompt presentation."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Time delay systematically increases the elapsed time between the presentation of the SD and the delivery of the prompt.",
    "clinicalExplanation": "BACB TCO Item C.7: Time delay transfers stimulus control from the prompt to the natural SD.",
    "references": "BACB RBT 3rd Edition TCO Item C.7",
    "category": "Behavior Acquisition",
    "subCategory": "Prompting - Time Delay",
    "keywords": [
      "Behavior Acquisition",
      "Prompting - Time Delay",
      "C.7"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c08-1",
    "certification": "RBT",
    "question": "A client learns to label a cartoon picture of a car in the clinic. To ensure stimulus generalization, what should the RBT do?",
    "scenarioText": "The client must recognize cars in real life and across various visual representations.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Present photographs of sedans, trucks, toy cars, and actual vehicles parked in the parking lot",
        "isCorrect": true,
        "explanation": "Teaching across multiple exemplars and diverse stimulus variants ensures true stimulus generalization."
      },
      {
        "id": "B",
        "text": "Test the child exclusively using the exact same cartoon card for the rest of the year",
        "isCorrect": false,
        "explanation": "Using only one card prevents stimulus generalization."
      },
      {
        "id": "C",
        "text": "Discontinue all car programs immediately without testing",
        "isCorrect": false,
        "explanation": "Discontinuing without verification risks skill loss."
      },
      {
        "id": "D",
        "text": "Only allow the child to say 'car' when at home",
        "isCorrect": false,
        "explanation": "Restricting settings restricts generalization."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Stimulus generalization occurs when a response is emitted in the presence of stimuli that share characteristics with the training stimulus.",
    "clinicalExplanation": "BACB TCO Item C.8: Training with multiple exemplars ensures functional skill application in natural environments.",
    "references": "BACB RBT 3rd Edition TCO Item C.8",
    "category": "Behavior Acquisition",
    "subCategory": "Generalization Across Stimuli",
    "keywords": [
      "Behavior Acquisition",
      "Generalization Across Stimuli",
      "C.8"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c08-2",
    "certification": "RBT",
    "question": "A learner responds to greetings ('Hi!') only when the primary RBT enters the room, but remains silent when parents or teachers say hello. What generalization deficit is present?",
    "scenarioText": "The response is under narrow stimulus control of a single person.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Setting generalization deficit",
        "isCorrect": false,
        "explanation": "The issue relates to people, not physical environments."
      },
      {
        "id": "B",
        "text": "Generalization across people (instructors/peers)",
        "isCorrect": true,
        "explanation": "The learner fails to emit the mastered social response across different individuals."
      },
      {
        "id": "C",
        "text": "Response generalization deficit",
        "isCorrect": false,
        "explanation": "Response generalization involves emitting different topographies of behavior."
      },
      {
        "id": "D",
        "text": "Overgeneralization",
        "isCorrect": false,
        "explanation": "Overgeneralization occurs when behavior is emitted in inappropriate stimulus contexts."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Generalization across people requires that the learner demonstrates the target behavior across multiple therapists, parents, and community members.",
    "clinicalExplanation": "BACB TCO Item C.8: Involving parents and peers during acquisition prevents single-therapist prompt dependency.",
    "references": "BACB RBT 3rd Edition TCO Item C.8",
    "category": "Behavior Acquisition",
    "subCategory": "Generalization Across People",
    "keywords": [
      "Behavior Acquisition",
      "Generalization Across People",
      "C.8"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c09-1",
    "certification": "RBT",
    "question": "What is the primary difference between a skill acquisition procedure and a skill maintenance procedure?",
    "scenarioText": "An RBT reviews mastered programs during weekly sessions.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Acquisition uses food, while maintenance only uses physical restraint",
        "isCorrect": false,
        "explanation": "Restraint is never a maintenance procedure."
      },
      {
        "id": "B",
        "text": "Maintenance is conducted only by parents, never by RBTs",
        "isCorrect": false,
        "explanation": "RBTs systematically run maintenance probes during sessions."
      },
      {
        "id": "C",
        "text": "Acquisition focuses on teaching a novel skill through frequent reinforcement; maintenance checks and reinforces previously mastered skills intermittently over time",
        "isCorrect": true,
        "explanation": "Acquisition targets novel behaviors with rich schedules; maintenance preserves mastered repertoires using thin schedules."
      },
      {
        "id": "D",
        "text": "There is no difference; once a skill is mastered it never needs to be practiced again",
        "isCorrect": false,
        "explanation": "Without maintenance programming, mastered skills frequently deteriorate."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Acquisition procedures teach new, unmastered skills, whereas maintenance procedures periodically probe and reinforce already mastered skills.",
    "clinicalExplanation": "BACB TCO Item C.9: Regular maintenance probes prevent skill regression.",
    "references": "BACB RBT 3rd Edition TCO Item C.9",
    "category": "Behavior Acquisition",
    "subCategory": "Maintenance",
    "keywords": [
      "Behavior Acquisition",
      "Maintenance",
      "C.9"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c10-1",
    "certification": "RBT",
    "question": "When teaching a non-verbal child to say 'Ball', an RBT first reinforces 'Buh'. Once 'Buh' is consistent, the RBT only reinforces 'Bah'. Finally, reinforcement is provided only for 'Ball'. What procedure is being implemented?",
    "scenarioText": "The RBT reinforces successive approximations while placing previous approximations on extinction.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Task Analysis",
        "isCorrect": false,
        "explanation": "Task analysis breaks chains into steps, while shaping modifies a single behavior's topography."
      },
      {
        "id": "B",
        "text": "Backward Chaining",
        "isCorrect": false,
        "explanation": "Chaining links distinct behavioral responses together."
      },
      {
        "id": "C",
        "text": "Non-contingent Reinforcement",
        "isCorrect": false,
        "explanation": "NCR delivers reinforcement on time, not contingent on closer approximations."
      },
      {
        "id": "D",
        "text": "Shaping",
        "isCorrect": true,
        "explanation": "Shaping differentially reinforces successive approximations toward a terminal target behavior."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Shaping is the differential reinforcement of successive approximations to a desired terminal behavior while extinguishing earlier steps.",
    "clinicalExplanation": "BACB TCO Item C.10: Shaping is ideal for teaching novel vocal sounds, fine motor grips, or exercise duration.",
    "references": "BACB RBT 3rd Edition TCO Item C.10",
    "category": "Behavior Acquisition",
    "subCategory": "Shaping",
    "keywords": [
      "Behavior Acquisition",
      "Shaping",
      "C.10"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c11-1",
    "certification": "RBT",
    "question": "In a token economy system, what is the role of the tokens earned by the client?",
    "scenarioText": "A student earns plastic stars for completing math worksheets, which are later exchanged for 10 minutes of iPad time.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Tokens function as conditioned generalized reinforcers that can be exchanged for backup reinforcers",
        "isCorrect": true,
        "explanation": "Tokens have acquired value because they are paired with and exchangeable for diverse backup items."
      },
      {
        "id": "B",
        "text": "Tokens are unconditioned primary reinforcers necessary for biological survival",
        "isCorrect": false,
        "explanation": "Primary reinforcers are biological (food, water), not plastic tokens."
      },
      {
        "id": "C",
        "text": "Tokens are antecedents that force compliance through physical intimidation",
        "isCorrect": false,
        "explanation": "Tokens are positive conditioned consequence reinforcers."
      },
      {
        "id": "D",
        "text": "Tokens must be permanently confiscated if the student blinks",
        "isCorrect": false,
        "explanation": "Arbitrary confiscation violates behavior plan guidelines."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Tokens serve as conditioned generalized reinforcers that bridge the delay between behavior and the exchange for backup reinforcers.",
    "clinicalExplanation": "BACB TCO Item C.11: Token economies teach delayed gratification and provide portable reinforcement across settings.",
    "references": "BACB RBT 3rd Edition TCO Item C.11",
    "category": "Behavior Acquisition",
    "subCategory": "Token Economy",
    "keywords": [
      "Behavior Acquisition",
      "Token Economy",
      "C.11"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c11-2",
    "certification": "RBT",
    "question": "If a client earns 5 tokens on a token board but the RBT has no preferred backup reinforcers available for exchange, what is the expected clinical consequence?",
    "scenarioText": "The token board was filled, but the toy chest is locked and empty.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "The tokens will maintain their reinforcing power forever without backup items",
        "isCorrect": false,
        "explanation": "Conditioned reinforcers lose their effectiveness if not backed up by valuable stimuli."
      },
      {
        "id": "B",
        "text": "The tokens will lose their reinforcing value over time through extinction of the conditioned relation",
        "isCorrect": true,
        "explanation": "Without backup exchange pairing, tokens lose their motivating properties."
      },
      {
        "id": "C",
        "text": "The client will automatically become a BCBA",
        "isCorrect": false,
        "explanation": "This is nonsensical."
      },
      {
        "id": "D",
        "text": "The RBT should fabricate replacement money",
        "isCorrect": false,
        "explanation": "Token systems require planned, accessible backup rewards."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Tokens only retain conditioned reinforcing efficacy when they can be reliably exchanged for meaningful backup reinforcers.",
    "clinicalExplanation": "BACB TCO Item C.11: Ensuring backup reinforcers align with current establishing operations is vital.",
    "references": "BACB RBT 3rd Edition TCO Item C.11",
    "category": "Behavior Acquisition",
    "subCategory": "Token Economy - Backups",
    "keywords": [
      "Behavior Acquisition",
      "Token Economy - Backups",
      "C.11"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c01-4",
    "certification": "RBT",
    "question": "When is a Continuous Reinforcement (CRF / FR1) schedule most appropriately utilized in ABA programming?",
    "scenarioText": "An RBT is starting an entirely new hand-signing program with a 4-year-old.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "During the maintenance phase to prevent extinction",
        "isCorrect": false,
        "explanation": "Intermittent schedules (VR/VI) are used for maintenance, not CRF."
      },
      {
        "id": "B",
        "text": "Only when punishing target problem behavior",
        "isCorrect": false,
        "explanation": "CRF is a reinforcement schedule, not a punishment protocol."
      },
      {
        "id": "C",
        "text": "During the initial acquisition phase of teaching a novel behavior",
        "isCorrect": true,
        "explanation": "CRF reinforces every single correct response, which is crucial when first establishing a new skill."
      },
      {
        "id": "D",
        "text": "During standardized baseline testing probes",
        "isCorrect": false,
        "explanation": "Reinforcement is withheld during baseline probes."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Continuous reinforcement (FR1) is optimal during the initial acquisition of novel skills to strengthen the stimulus-response association rapidly.",
    "clinicalExplanation": "BACB TCO Item C.1: Once acquisition is demonstrated, technicians fade to intermittent schedules.",
    "references": "BACB RBT 3rd Edition TCO Item C.1",
    "category": "Behavior Acquisition",
    "subCategory": "Continuous Reinforcement",
    "keywords": [
      "Behavior Acquisition",
      "Continuous Reinforcement",
      "C.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c07-3",
    "certification": "RBT",
    "question": "An RBT teaches sight word reading by initially highlighting the word 'CAT' in bold red font while distractor words are pale gray. Across sessions, the red highlighting is gradually lightened until all words appear in identical black text. What is this?",
    "scenarioText": "A physical dimension of the stimulus is systematically altered.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Response prompt fading",
        "isCorrect": false,
        "explanation": "Response prompt fading alters therapist assistance (e.g., hand-over-hand), not the stimulus itself."
      },
      {
        "id": "B",
        "text": "Extinction Burst",
        "isCorrect": false,
        "explanation": "Extinction burst is a behavior reduction phenomenon."
      },
      {
        "id": "C",
        "text": "Differential Reinforcement of Incompatible Behavior",
        "isCorrect": false,
        "explanation": "DRI reinforces physically incompatible alternative behavior."
      },
      {
        "id": "D",
        "text": "Stimulus Fading",
        "isCorrect": true,
        "explanation": "Stimulus fading systematically alters an exaggerated physical feature of the stimulus to transfer control to the natural stimulus."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Stimulus fading involves systematically modifying a physical dimension (size, color, intensity) of the stimulus to transfer control to the natural SD.",
    "clinicalExplanation": "BACB TCO Item C.7: Stimulus fading is an effective antecedent technique for teaching academic discriminations.",
    "references": "BACB RBT 3rd Edition TCO Item C.7",
    "category": "Behavior Acquisition",
    "subCategory": "Prompt Fading - Stimulus Fading",
    "keywords": [
      "Behavior Acquisition",
      "Prompt Fading - Stimulus Fading",
      "C.7"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c04-2",
    "certification": "RBT",
    "question": "What is the primary defining characteristic of a mand in Verbal Behavior?",
    "scenarioText": "A child says 'Juice' because they are thirsty and have been without fluids for 2 hours.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "It is evoked by an establishing operation (EO) of deprivation and maintained by access to the specific requested reinforcer",
        "isCorrect": true,
        "explanation": "A mand is the only verbal operant that directly benefits the speaker by obtaining the specific item requested under an active EO."
      },
      {
        "id": "B",
        "text": "It is evoked by seeing an object and reinforced by generic praise",
        "isCorrect": false,
        "explanation": "Labeling an object seen is a tact, not a mand."
      },
      {
        "id": "C",
        "text": "It has point-to-point correspondence with a spoken model",
        "isCorrect": false,
        "explanation": "Repeating what is heard is an echoic."
      },
      {
        "id": "D",
        "text": "It occurs only during written spelling tests",
        "isCorrect": false,
        "explanation": "Mands can be spoken, signed, gestural, or pictorial."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "A mand is a verbal operant evoked by a motivating operation (deprivation/satiation) and followed by the specific item or event requested.",
    "clinicalExplanation": "BACB TCO Item C.4: Functional mand training is the top priority for non-verbal learners with challenging behavior.",
    "references": "BACB RBT 3rd Edition TCO Item C.4",
    "category": "Behavior Acquisition",
    "subCategory": "Mand Training",
    "keywords": [
      "Behavior Acquisition",
      "Mand Training",
      "C.4"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-c03-3",
    "certification": "RBT",
    "question": "During a discrete trial, an RBT presents the SD 'Touch blue'. The learner touches the red card instead. According to standard DTT error correction protocols, what should the RBT do?",
    "scenarioText": "The learner made an incorrect motor selection during an expressive identification trial.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Scold the learner and remove their lunch for the rest of the day",
        "isCorrect": false,
        "explanation": "Verbal abuse and food deprivation violate ethical and procedural standards."
      },
      {
        "id": "B",
        "text": "Withhold reinforcement, immediately prompt the correct response (e.g., model or physical prompt), and re-present the trial for independent responding",
        "isCorrect": true,
        "explanation": "Standard error correction interrupts errors, provides an immediate corrective prompt, and re-presents the SD."
      },
      {
        "id": "C",
        "text": "Praise the learner enthusiastically and deliver candy anyway",
        "isCorrect": false,
        "explanation": "Reinforcing incorrect responses strengthens errors."
      },
      {
        "id": "D",
        "text": "Tell the learner to sit in the hallway for 4 hours",
        "isCorrect": false,
        "explanation": "Excessive isolation is an unapproved, harmful punishment."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Standard DTT error correction involves withholding reinforcement, providing an immediate prompt to demonstrate the correct response, and re-presenting the SD to ensure a correct transfer trial.",
    "clinicalExplanation": "BACB TCO Item C.3: Clean error correction prevents error patterns from becoming habitual.",
    "references": "BACB RBT 3rd Edition TCO Item C.3",
    "category": "Behavior Acquisition",
    "subCategory": "DTT - Error Correction",
    "keywords": [
      "Behavior Acquisition",
      "DTT - Error Correction",
      "C.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d01-1",
    "certification": "RBT",
    "question": "Every time an RBT presents a math worksheet, the client screams and flips the table, after which the client is sent to the quiet corner for 10 minutes. The behavior continues to occur. What is the likely function of this behavior?",
    "scenarioText": "Table-flipping consistently results in the removal of the academic task demand.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Attention",
        "isCorrect": false,
        "explanation": "The behavior does not primarily seek social interaction; it removes the task."
      },
      {
        "id": "B",
        "text": "Access to Tangibles",
        "isCorrect": false,
        "explanation": "The child is not gaining a toy or edible item."
      },
      {
        "id": "C",
        "text": "Escape / Avoidance",
        "isCorrect": true,
        "explanation": "The behavior is maintained by the removal of the aversive academic task demand (socially mediated negative reinforcement)."
      },
      {
        "id": "D",
        "text": "Automatic Reinforcement",
        "isCorrect": false,
        "explanation": "The behavior is dependent on the presentation and removal of the social task demand, not internal stimulation."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Behaviors maintained by escape or avoidance serve to delay, terminate, or reduce the intensity of an aversive stimulus or demand.",
    "clinicalExplanation": "BACB TCO Item D.1: Identifying behavior function (SEAT) is the prerequisite for designing functional replacement behaviors.",
    "references": "BACB RBT 3rd Edition TCO Item D.1",
    "category": "Behavior Reduction",
    "subCategory": "Functions of Behavior - Escape",
    "keywords": [
      "Behavior Reduction",
      "Functions of Behavior - Escape",
      "D.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d01-2",
    "certification": "RBT",
    "question": "A learner engages in repetitive body rocking while alone in a dark, empty room without any demands or people present. What is the most probable function?",
    "scenarioText": "The behavior occurs at high rates across all environments regardless of social consequences.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Social Attention",
        "isCorrect": false,
        "explanation": "No people are present to provide social attention."
      },
      {
        "id": "B",
        "text": "Escape from Demands",
        "isCorrect": false,
        "explanation": "No demands or tasks are placed in the empty room."
      },
      {
        "id": "C",
        "text": "Access to Edibles",
        "isCorrect": false,
        "explanation": "No food is delivered contingent upon body rocking."
      },
      {
        "id": "D",
        "text": "Automatic / Sensory Reinforcement",
        "isCorrect": true,
        "explanation": "Behaviors that produce their own physical or sensory reinforcement independent of social mediation have an automatic function."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Automatic reinforcement occurs when the physical sensation produced by the behavior itself serves as the maintaining reinforcer.",
    "clinicalExplanation": "BACB TCO Item D.1: Automatic behaviors require sensory-based replacement interventions.",
    "references": "BACB RBT 3rd Edition TCO Item D.1",
    "category": "Behavior Reduction",
    "subCategory": "Functions of Behavior - Automatic",
    "keywords": [
      "Behavior Reduction",
      "Functions of Behavior - Automatic",
      "D.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d02-1",
    "certification": "RBT",
    "question": "A client screams to access attention from the RBT. The BCBA instructs the RBT to provide high-quality verbal attention and enthusiasm every 3 minutes non-contingently, regardless of whether the client screams. What antecedent intervention is this?",
    "scenarioText": "Attention is delivered on a fixed-time schedule to eliminate the establishing operation for screaming.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Non-Contingent Reinforcement (NCR)",
        "isCorrect": true,
        "explanation": "NCR delivers the maintaining reinforcer on a time-based schedule independent of behavior to abolish motivation for problem behavior."
      },
      {
        "id": "B",
        "text": "Response Blocking",
        "isCorrect": false,
        "explanation": "Response blocking physically prevents behavior completion."
      },
      {
        "id": "C",
        "text": "Overcorrection",
        "isCorrect": false,
        "explanation": "Overcorrection is a consequence-based punishment procedure."
      },
      {
        "id": "D",
        "text": "Extinction Burst",
        "isCorrect": false,
        "explanation": "Extinction burst is an increase in behavior frequency, not an antecedent intervention."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Non-Contingent Reinforcement (NCR) is an antecedent strategy that delivers reinforcement on a time-based schedule to reduce the motivating operation for problem behavior.",
    "clinicalExplanation": "BACB TCO Item D.2: NCR acts as an abolishing operation (AO), making problem behavior unnecessary.",
    "references": "BACB RBT 3rd Edition TCO Item D.2",
    "category": "Behavior Reduction",
    "subCategory": "Antecedent - NCR",
    "keywords": [
      "Behavior Reduction",
      "Antecedent - NCR",
      "D.2"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d02-2",
    "certification": "RBT",
    "question": "Prior to asking a client to write their name (a low-probability task associated with tantrums), the RBT asks the client to 'Give me five!', 'Touch your nose!', and 'Clap your hands!', praising each compliance rapidly before delivering the writing demand. What is this?",
    "scenarioText": "Three easy requests precede the difficult instructional request.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Functional Communication Training",
        "isCorrect": false,
        "explanation": "FCT teaches an alternative communication response."
      },
      {
        "id": "B",
        "text": "High-Probability (High-P) Request Sequence / Behavioral Momentum",
        "isCorrect": true,
        "explanation": "High-P sequences present 2-5 easy tasks with high compliance before presenting the low-P target demand."
      },
      {
        "id": "C",
        "text": "Time-out from Reinforcement",
        "isCorrect": false,
        "explanation": "Time-out is a negative punishment procedure."
      },
      {
        "id": "D",
        "text": "Task Chaining",
        "isCorrect": false,
        "explanation": "Task chaining links multi-step behavior sequences."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "The High-Probability Request Sequence builds behavioral momentum through rapid reinforcement of compliant responses before presenting a low-probability request.",
    "clinicalExplanation": "BACB TCO Item D.2: High-P request sequences decrease task resistance and instructional latency.",
    "references": "BACB RBT 3rd Edition TCO Item D.2",
    "category": "Behavior Reduction",
    "subCategory": "Antecedent - High-P Sequence",
    "keywords": [
      "Behavior Reduction",
      "Antecedent - High-P Sequence",
      "D.2"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d03-1",
    "certification": "RBT",
    "question": "A student screams to access the teacher's attention. Under a new behavior plan, the RBT reinforces the student ONLY when they quietly raise their hand (an alternative behavior), while ignoring all instances of screaming. What procedure is this?",
    "scenarioText": "Hand-raising serves the same attention function while screaming is extinguished.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Differential Reinforcement of Other Behavior (DRO)",
        "isCorrect": false,
        "explanation": "DRO reinforces the absence of behavior over time, not a specific alternative behavior."
      },
      {
        "id": "B",
        "text": "Differential Reinforcement of Low Rates (DRL)",
        "isCorrect": false,
        "explanation": "DRL reinforces lower rates of behavior."
      },
      {
        "id": "C",
        "text": "Differential Reinforcement of Alternative Behavior (DRA)",
        "isCorrect": true,
        "explanation": "DRA reinforces a desirable functional alternative behavior while placing the problem behavior on extinction."
      },
      {
        "id": "D",
        "text": "Response Cost",
        "isCorrect": false,
        "explanation": "Response cost fines or removes earned tokens."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "DRA reinforces an appropriate alternative behavior that provides the same or similar reinforcer as the challenging behavior.",
    "clinicalExplanation": "BACB TCO Item D.3: DRA is the gold standard for reducing problem behavior while building functional repertoires.",
    "references": "BACB RBT 3rd Edition TCO Item D.3",
    "category": "Behavior Reduction",
    "subCategory": "Differential Reinforcement - DRA",
    "keywords": [
      "Behavior Reduction",
      "Differential Reinforcement - DRA",
      "D.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d03-2",
    "certification": "RBT",
    "question": "An RBT sets a timer for 5 minutes. If a client does NOT engage in skin-picking during the entire 5-minute interval, the RBT delivers praise and a token. If skin-picking occurs at any point, the timer resets. What procedure is this?",
    "scenarioText": "Reinforcement is contingent on zero occurrences of the target behavior across the interval.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Differential Reinforcement of Incompatible Behavior (DRI)",
        "isCorrect": false,
        "explanation": "DRI requires a specific physically incompatible motor response (e.g., sitting on hands)."
      },
      {
        "id": "B",
        "text": "Functional Communication Training (FCT)",
        "isCorrect": false,
        "explanation": "FCT requires a specific communication response, not mere omission of behavior."
      },
      {
        "id": "C",
        "text": "Continuous Reinforcement (CRF)",
        "isCorrect": false,
        "explanation": "CRF reinforces instances of an emitted response, not its omission."
      },
      {
        "id": "D",
        "text": "Differential Reinforcement of Other Behavior (DRO / Zero Responding)",
        "isCorrect": true,
        "explanation": "DRO delivers reinforcement contingent on the complete absence (zero rate) of the target behavior for a specified duration."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Differential Reinforcement of Other Behavior (DRO) provides reinforcement contingent on the non-occurrence of the target behavior throughout a designated time interval.",
    "clinicalExplanation": "BACB TCO Item D.3: DRO is effective for rapid behavior suppression, but does not explicitly teach a new replacement skill.",
    "references": "BACB RBT 3rd Edition TCO Item D.3",
    "category": "Behavior Reduction",
    "subCategory": "Differential Reinforcement - DRO",
    "keywords": [
      "Behavior Reduction",
      "Differential Reinforcement - DRO",
      "D.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d03-3",
    "certification": "RBT",
    "question": "To reduce out-of-seat behavior during table work, the RBT provides praise and tokens every 2 minutes that the learner remains seated with feet flat on the floor. Because a student cannot sit and stand simultaneously, what procedure is this?",
    "scenarioText": "The reinforced behavior cannot physically occur at the same time as the problem behavior.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Differential Reinforcement of Incompatible Behavior (DRI)",
        "isCorrect": true,
        "explanation": "DRI reinforces a behavior that is topographically and physically incompatible with the target problem behavior."
      },
      {
        "id": "B",
        "text": "Differential Reinforcement of Alternative Behavior (DRA)",
        "isCorrect": false,
        "explanation": "DRA reinforces an alternative behavior that is not necessarily physically impossible to emit simultaneously."
      },
      {
        "id": "C",
        "text": "Negative Reinforcement",
        "isCorrect": false,
        "explanation": "Negative reinforcement removes an aversive stimulus to increase behavior."
      },
      {
        "id": "D",
        "text": "Extinction Burst",
        "isCorrect": false,
        "explanation": "Extinction burst is an initial temporary increase in behavior."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "DRI reinforces a behavior that cannot physically occur at the same time as the targeted problem behavior.",
    "clinicalExplanation": "BACB TCO Item D.3: Incompatibility guarantees that emitting the reinforced behavior prevents the occurrence of the problem response.",
    "references": "BACB RBT 3rd Edition TCO Item D.3",
    "category": "Behavior Reduction",
    "subCategory": "Differential Reinforcement - DRI",
    "keywords": [
      "Behavior Reduction",
      "Differential Reinforcement - DRI",
      "D.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d03-4",
    "certification": "RBT",
    "question": "A non-verbal child bites their own wrist when presented with difficult puzzle tasks to escape the demand. The BCBA programs Functional Communication Training (FCT). What response should the RBT prompt and reinforce?",
    "scenarioText": "The new communication response must serve the same escape function.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Sitting quietly with arms crossed for 45 minutes",
        "isCorrect": false,
        "explanation": "This does not teach communication and is developmentally inappropriate."
      },
      {
        "id": "B",
        "text": "Handing a 'Break Please' visual icon to the RBT",
        "isCorrect": true,
        "explanation": "Handing a break card provides an immediate, functional, communicative replacement for escape-maintained behavior."
      },
      {
        "id": "C",
        "text": "Completing 100 math problems without water",
        "isCorrect": false,
        "explanation": "This increases aversive demands without providing a communication channel."
      },
      {
        "id": "D",
        "text": "Writing a formal essay explaining why puzzles are difficult",
        "isCorrect": false,
        "explanation": "The non-verbal learner cannot execute written essays."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Functional Communication Training (FCT) is a DRA variation that teaches a functionally equivalent communicative response (mand) to replace challenging behavior.",
    "clinicalExplanation": "BACB TCO Item D.3: FCT directly eliminates the functional necessity of problem behavior.",
    "references": "BACB RBT 3rd Edition TCO Item D.3",
    "category": "Behavior Reduction",
    "subCategory": "Differential Reinforcement - FCT",
    "keywords": [
      "Behavior Reduction",
      "Differential Reinforcement - FCT",
      "D.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d04-1",
    "certification": "RBT",
    "question": "When a child engages in attention-maintained cursing, the RBT maintains a neutral facial expression, withholds verbal reprimands, and continues with session activities without looking at the client. What procedure is being applied?",
    "scenarioText": "The functional reinforcer (social attention) is withheld.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Positive Punishment",
        "isCorrect": false,
        "explanation": "Positive punishment delivers an aversive consequence; extinction withholds the maintaining reinforcer."
      },
      {
        "id": "B",
        "text": "Escape Extinction",
        "isCorrect": false,
        "explanation": "Escape extinction prevents avoidance of tasks."
      },
      {
        "id": "C",
        "text": "Planned Ignoring / Attention Extinction",
        "isCorrect": true,
        "explanation": "Extinction for attention-maintained behavior withholds all social and verbal reactions contingent on the response."
      },
      {
        "id": "D",
        "text": "Sensory Extinction",
        "isCorrect": false,
        "explanation": "Sensory extinction blocks automatic physical feedback."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Attention extinction (planned ignoring) involves completely withholding social interaction and verbal reactions that previously maintained the problem behavior.",
    "clinicalExplanation": "BACB TCO Item D.4: Extinction must be strictly matched to the verified behavior function.",
    "references": "BACB RBT 3rd Edition TCO Item D.4",
    "category": "Behavior Reduction",
    "subCategory": "Extinction - Attention",
    "keywords": [
      "Behavior Reduction",
      "Extinction - Attention",
      "D.4"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d04-2",
    "certification": "RBT",
    "question": "When a student throws materials to escape putting on shoes, the RBT calmly retrieves the shoes, represents the demand, and guides the student to complete the task without allowing them to leave the area. What type of extinction is this?",
    "scenarioText": "The client is not permitted to avoid or escape the instruction.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Planned Ignoring",
        "isCorrect": false,
        "explanation": "Planned ignoring addresses attention-maintained behaviors, not escape."
      },
      {
        "id": "B",
        "text": "Time-Out from Reinforcement",
        "isCorrect": false,
        "explanation": "Time-out removes access to positive reinforcement, not demand completion."
      },
      {
        "id": "C",
        "text": "High-Probability Request Sequence",
        "isCorrect": false,
        "explanation": "High-P is an antecedent intervention, not an extinction procedure."
      },
      {
        "id": "D",
        "text": "Escape Extinction",
        "isCorrect": true,
        "explanation": "Escape extinction prevents the learner from escaping the instructional demand contingent upon problem behavior."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Escape extinction involves not allowing problem behavior to terminate or delay instructional demands.",
    "clinicalExplanation": "BACB TCO Item D.4: Escape extinction must be combined with proactive breaks and functional communication.",
    "references": "BACB RBT 3rd Edition TCO Item D.4",
    "category": "Behavior Reduction",
    "subCategory": "Extinction - Escape",
    "keywords": [
      "Behavior Reduction",
      "Extinction - Escape",
      "D.4"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d05-1",
    "certification": "RBT",
    "question": "In a classroom token system, whenever a student engages in physical aggression toward a peer, the RBT removes one previously earned token from the student's board per the BIP, and aggression decreases. What procedure is this?",
    "scenarioText": "A specific amount of earned reinforcers is lost following problem behavior.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Response Cost (Negative Punishment)",
        "isCorrect": true,
        "explanation": "Response cost is the contingent loss of a specific amount of positive reinforcers, decreasing future behavior frequency."
      },
      {
        "id": "B",
        "text": "Positive Punishment",
        "isCorrect": false,
        "explanation": "Positive punishment presents an aversive stimulus; response cost removes a preferred item."
      },
      {
        "id": "C",
        "text": "Extinction",
        "isCorrect": false,
        "explanation": "Extinction withholds future reinforcement; response cost removes already earned reinforcers."
      },
      {
        "id": "D",
        "text": "Non-Contingent Reinforcement",
        "isCorrect": false,
        "explanation": "NCR delivers reinforcement on time, not contingent on punishment."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Response cost is a negative punishment procedure where a specific quantity of earned positive reinforcement is removed contingent on problem behavior.",
    "clinicalExplanation": "BACB TCO Item D.5: Punishment procedures must be explicitly written in the BIP by a BCBA with prior consent.",
    "references": "BACB RBT 3rd Edition TCO Item D.5",
    "category": "Behavior Reduction",
    "subCategory": "Negative Punishment - Response Cost",
    "keywords": [
      "Behavior Reduction",
      "Negative Punishment - Response Cost",
      "D.5"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d05-2",
    "certification": "RBT",
    "question": "What is the defining mechanism of 'Time-Out from Positive Reinforcement' in behavior analysis?",
    "scenarioText": "An RBT moves a child 5 feet away from an active video game group following pushing behavior.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Locking a child alone in a dark storage closet for hours",
        "isCorrect": false,
        "explanation": "Solitary confinement in locked rooms is illegal and violates BACB ethical codes."
      },
      {
        "id": "B",
        "text": "The contingent loss of access to positive reinforcement for a specified period of time",
        "isCorrect": true,
        "explanation": "Time-out is clinically effective only if the time-in environment is rich in positive reinforcement that is temporarily lost."
      },
      {
        "id": "C",
        "text": "Giving the child a candy bar so they calm down",
        "isCorrect": false,
        "explanation": "Giving candy reinforces the problem behavior."
      },
      {
        "id": "D",
        "text": "An antecedent strategy implemented before behavior occurs",
        "isCorrect": false,
        "explanation": "Time-out is a consequence procedure following behavior."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Time-out from positive reinforcement is a negative punishment procedure that temporarily removes the opportunity to earn positive reinforcement.",
    "clinicalExplanation": "BACB TCO Item D.5: Time-out is only effective if 'time-in' is reinforcing. It is contraindicated for escape-maintained behavior.",
    "references": "BACB RBT 3rd Edition TCO Item D.5",
    "category": "Behavior Reduction",
    "subCategory": "Negative Punishment - Time-Out",
    "keywords": [
      "Behavior Reduction",
      "Negative Punishment - Time-Out",
      "D.5"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d06-1",
    "certification": "RBT",
    "question": "On the second day of implementing an extinction procedure for screaming, the child's screaming suddenly increases dramatically in frequency, volume, and duration. How should the RBT interpret this?",
    "scenarioText": "The parent is worried the intervention is failing and wants to give in.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "The intervention is flawed and must be immediately discontinued without supervisor knowledge",
        "isCorrect": false,
        "explanation": "Changing protocols independently violates BACB standards."
      },
      {
        "id": "B",
        "text": "The child has acquired a new medical disease",
        "isCorrect": false,
        "explanation": "Sudden behavioral spikes following reinforcer removal are behavioral extinction bursts."
      },
      {
        "id": "C",
        "text": "This is an expected Extinction Burst, representing a temporary increase in frequency, intensity, and variability before behavior decreases",
        "isCorrect": true,
        "explanation": "An extinction burst is a normal, predictable phenomenon indicating that extinction is taking effect."
      },
      {
        "id": "D",
        "text": "The RBT should yell at the child to suppress the scream",
        "isCorrect": false,
        "explanation": "Yelling delivers attention and provides an unapproved punishment."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "An extinction burst is an immediate, temporary increase in the frequency, intensity, or variability of the behavior when reinforcement is first withheld.",
    "clinicalExplanation": "BACB TCO Item D.6: Educating caregivers and staff on extinction bursts prevents premature treatment termination.",
    "references": "BACB RBT 3rd Edition TCO Item D.6",
    "category": "Behavior Reduction",
    "subCategory": "Secondary Effects - Extinction Burst",
    "keywords": [
      "Behavior Reduction",
      "Secondary Effects - Extinction Burst",
      "D.6"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d06-2",
    "certification": "RBT",
    "question": "Three weeks after a problem behavior has been successfully reduced to near-zero levels through extinction, the behavior suddenly reappears during a routine session without any obvious trigger. What phenomenon is this?",
    "scenarioText": "The RBT continues to withhold reinforcement consistently as trained.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Extinction Burst",
        "isCorrect": false,
        "explanation": "Extinction burst occurs immediately after extinction begins, not weeks later."
      },
      {
        "id": "B",
        "text": "Behavioral Momentum",
        "isCorrect": false,
        "explanation": "Behavioral momentum describes response persistence."
      },
      {
        "id": "C",
        "text": "Negative Reinforcement",
        "isCorrect": false,
        "explanation": "This is an extinction phenomenon, not negative reinforcement."
      },
      {
        "id": "D",
        "text": "Spontaneous Recovery",
        "isCorrect": true,
        "explanation": "Spontaneous recovery is the typical reappearance of an extinguished behavior after a period of non-occurrence."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Spontaneous recovery is the temporary reappearance of a previously extinguished behavior after a period of absence.",
    "clinicalExplanation": "BACB TCO Item D.6: RBTs must maintain extinction fidelity during spontaneous recovery so the behavior extinguishes quickly again.",
    "references": "BACB RBT 3rd Edition TCO Item D.6",
    "category": "Behavior Reduction",
    "subCategory": "Secondary Effects - Spontaneous Recovery",
    "keywords": [
      "Behavior Reduction",
      "Secondary Effects - Spontaneous Recovery",
      "D.6"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d06-3",
    "certification": "RBT",
    "question": "Which of the following is a recognized secondary risk or undesirable side effect associated with the use of punishment procedures?",
    "scenarioText": "A clinic team reviews potential ethical and emotional risks before implementing a response cost procedure.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Emotional responding, aggressive counter-control, and escape/avoidance of the person delivering punishment",
        "isCorrect": true,
        "explanation": "Punishment frequently produces undesirable emotional reactions and social avoidance of the clinician."
      },
      {
        "id": "B",
        "text": "Immediate long-term skill acquisition of complex language targets",
        "isCorrect": false,
        "explanation": "Punishment suppresses behavior; it does not teach novel replacement skills."
      },
      {
        "id": "C",
        "text": "Automatic increase in client happiness and self-esteem",
        "isCorrect": false,
        "explanation": "Punishment does not automatically elevate self-esteem."
      },
      {
        "id": "D",
        "text": "Elimination of all future sensory needs",
        "isCorrect": false,
        "explanation": "Sensory biological functions cannot be eliminated through punishment."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Side effects of punishment include emotional responding, aggressive retaliatory behavior, and escape/avoidance of the therapist.",
    "clinicalExplanation": "BACB TCO Item D.6: Due to potential side effects, BACB standards mandate exhausting positive reinforcement alternatives before punishment.",
    "references": "BACB RBT 3rd Edition TCO Item D.6",
    "category": "Behavior Reduction",
    "subCategory": "Secondary Effects - Punishment Side Effects",
    "keywords": [
      "Behavior Reduction",
      "Secondary Effects - Punishment Side Effects",
      "D.6"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-d07-1",
    "certification": "RBT",
    "question": "During a severe crisis event where a client begins smashing window glass and presenting immediate danger of serious physical harm to self and others, what is the RBT's primary duty?",
    "scenarioText": "The RBT follows clinic emergency protocols.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Debate the client on the economic cost of replacing glass windows",
        "isCorrect": false,
        "explanation": "Verbal debates during crisis escalate physical danger."
      },
      {
        "id": "B",
        "text": "Implement authorized safety protocols, remove other clients from danger, protect client dignity, and immediately contact emergency support/supervision",
        "isCorrect": true,
        "explanation": "Ensuring physical safety, utilizing certified de-escalation, and notifying leadership is paramount."
      },
      {
        "id": "C",
        "text": "Leave the clinic premises immediately and go home",
        "isCorrect": false,
        "explanation": "Abandoning clients during physical emergencies is severe ethical neglect."
      },
      {
        "id": "D",
        "text": "Administer unprescribed sedatives from the first-aid kit",
        "isCorrect": false,
        "explanation": "RBTs never prescribe or administer unapproved chemical restraints."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "During crisis situations, the RBT must prioritize physical safety, protect client dignity, follow agency crisis protocols, and contact supervision.",
    "clinicalExplanation": "BACB TCO Item D.7: Emergency interventions are restricted to preserving immediate safety and must be followed by formal incident documentation.",
    "references": "BACB RBT 3rd Edition TCO Item D.7",
    "category": "Behavior Reduction",
    "subCategory": "Crisis & Emergency Procedures",
    "keywords": [
      "Behavior Reduction",
      "Crisis & Emergency Procedures",
      "D.7"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-e01-1",
    "certification": "RBT",
    "question": "A client's general education teacher informs the RBT that the client has been falling asleep in class and suggests reducing the daily work requirement. How should the RBT handle this communication?",
    "scenarioText": "The teacher approaches the RBT during transition time with pedagogical concerns.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Immediately change the client's official BIP goals without consulting anyone",
        "isCorrect": false,
        "explanation": "RBTs do not modify intervention goals independently."
      },
      {
        "id": "B",
        "text": "Ignore the teacher and tell them behavior technicians do not talk to school staff",
        "isCorrect": false,
        "explanation": "Collaborative and respectful professional communication is mandatory."
      },
      {
        "id": "C",
        "text": "Communicate the teacher's concerns and suggestions to the BCBA supervisor in a timely manner",
        "isCorrect": true,
        "explanation": "RBTs act as communication conduits, escalating team input to the supervising BCBA."
      },
      {
        "id": "D",
        "text": "Promise the teacher that the client will be dismissed from all school tasks",
        "isCorrect": false,
        "explanation": "RBTs cannot make unilateral promises on school curriculum."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "RBTs must communicate relevant observations, concerns, and suggestions from stakeholders (caregivers, teachers) to the supervisor in a timely manner.",
    "clinicalExplanation": "BACB TCO Item E.1: Timely communication ensures the BCBA can coordinate care with multidisciplinary team members.",
    "references": "BACB RBT 3rd Edition TCO Item E.1",
    "category": "Documentation and Reporting",
    "subCategory": "Team Communication",
    "keywords": [
      "Documentation and Reporting",
      "Team Communication",
      "E.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-e01-2",
    "certification": "RBT",
    "question": "A parent mentions to the RBT at session drop-off that they started giving the client a new herbal supplement that seems to cause stomach pain. What is the RBT's responsibility?",
    "scenarioText": "The parent asks the RBT if they should discontinue the supplement.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Advise the parent to double the herbal dosage immediately",
        "isCorrect": false,
        "explanation": "RBTs do not give medical advice."
      },
      {
        "id": "B",
        "text": "Tell the parent that herbal supplements are forbidden under BACB rules",
        "isCorrect": false,
        "explanation": "RBTs do not provide medical judgments outside their scope."
      },
      {
        "id": "C",
        "text": "Keep the information secret from the clinical treatment team",
        "isCorrect": false,
        "explanation": "Concealing relevant clinical variables compromises client care."
      },
      {
        "id": "D",
        "text": "Listen respectfully, document the parent's report, advise consulting their physician, and immediately notify the BCBA supervisor",
        "isCorrect": true,
        "explanation": "RBTs communicate medical variables to supervisors while directing medical decisions to physicians."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Variables reported by caregivers that may affect client comfort and behavior must be escalated to the supervisor promptly.",
    "clinicalExplanation": "BACB TCO Item E.1: Medical and health concerns must always be referred to the client's primary medical providers.",
    "references": "BACB RBT 3rd Edition TCO Item E.1",
    "category": "Documentation and Reporting",
    "subCategory": "Caregiver Suggestions",
    "keywords": [
      "Documentation and Reporting",
      "Caregiver Suggestions",
      "E.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-e02-1",
    "certification": "RBT",
    "question": "An RBT notices that a client's aggressive behavior has suddenly doubled over three consecutive sessions, and the current BIP strategies are failing to keep staff safe. What should the RBT do?",
    "scenarioText": "The RBT is unsure how to handle the sudden escalation in behavior severity.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Actively seek and prioritize clinical direction from the supervising BCBA in a timely manner",
        "isCorrect": true,
        "explanation": "When data irregularities or safety concerns arise, RBTs must immediately seek supervisor guidance."
      },
      {
        "id": "B",
        "text": "Invent an emergency physical hold found on the internet",
        "isCorrect": false,
        "explanation": "Unapproved physical holds are dangerous and unethical."
      },
      {
        "id": "C",
        "text": "Cancel all future client sessions indefinitely without telling anyone",
        "isCorrect": false,
        "explanation": "Abandonment of services violates ethical rules."
      },
      {
        "id": "D",
        "text": "Tell the parents that the client is unteachable",
        "isCorrect": false,
        "explanation": "Unprofessional and defeatist remarks violate dignity standards."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "RBTs must actively seek guidance from their supervisor when data show marked irregularities or when safety is compromised.",
    "clinicalExplanation": "BACB TCO Item E.2: Proactively requesting supervision prevents clinical drift and ensures prompt protocol adjustments.",
    "references": "BACB RBT 3rd Edition TCO Item E.2",
    "category": "Documentation and Reporting",
    "subCategory": "Seeking Clinical Direction",
    "keywords": [
      "Documentation and Reporting",
      "Seeking Clinical Direction",
      "E.2"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-e02-2",
    "certification": "RBT",
    "question": "If an RBT has a disagreement with another behavior technician regarding how a prompt fading protocol is run, what is the appropriate professional channel to resolve the issue?",
    "scenarioText": "Both technicians believe their interpretation of the written protocol is correct.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Argue loudly in front of the client and family during session",
        "isCorrect": false,
        "explanation": "Public arguments compromise client dignity and professionalism."
      },
      {
        "id": "B",
        "text": "Bring the matter to the supervising BCBA for clarification and clinical guidance following the agency chain of command",
        "isCorrect": true,
        "explanation": "The supervising BCBA oversees all clinical programming and provides definitive protocol guidance."
      },
      {
        "id": "C",
        "text": "Post a video of the dispute on TikTok to ask for public votes",
        "isCorrect": false,
        "explanation": "Public social media posting violates HIPAA and BACB confidentiality standards."
      },
      {
        "id": "D",
        "text": "Refuse to work with any clients until the other technician is terminated",
        "isCorrect": false,
        "explanation": "Unreasonable ultimatums disrupt clinical care."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "Clinical ambiguities and procedural questions must be brought to the supervising BCBA following the organizational chain of command.",
    "clinicalExplanation": "BACB TCO Item E.2: The BCBA is responsible for clarifying protocol instructions and maintaining treatment fidelity.",
    "references": "BACB RBT 3rd Edition TCO Item E.2",
    "category": "Documentation and Reporting",
    "subCategory": "Chain of Command",
    "keywords": [
      "Documentation and Reporting",
      "Chain of Command",
      "E.2"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-e03-1",
    "certification": "RBT",
    "question": "A client arrives at the clinic with visible dark circles under their eyes, and the parent shares that the client had an ear infection and slept only 2 hours last night. Why is it vital for the RBT to document this variable?",
    "scenarioText": "During the session, the client exhibits unusually high rates of crying and lethargy.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "To blame the parent for poor parenting",
        "isCorrect": false,
        "explanation": "Documentation must never be punitive or accusatory."
      },
      {
        "id": "B",
        "text": "Because the BACB requires taking blood pressure every session",
        "isCorrect": false,
        "explanation": "RBTs do not conduct medical blood testing."
      },
      {
        "id": "C",
        "text": "Because biological setting events and illness alter motivating operations and directly affect learning performance and behavior rates",
        "isCorrect": true,
        "explanation": "Illness and sleep deprivation act as motivating operations that impact behavior, providing crucial context for data interpretation."
      },
      {
        "id": "D",
        "text": "So the insurance company can bill for pediatric nursing",
        "isCorrect": false,
        "explanation": "RBT documentation is specific to behavioral services, not nursing."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Setting events (e.g., illness, sleep disruption, medication changes) alter motivating operations and must be documented to explain behavioral fluctuations.",
    "clinicalExplanation": "BACB TCO Item E.3: Contextual variables prevent erroneous conclusions about treatment efficacy.",
    "references": "BACB RBT 3rd Edition TCO Item E.3",
    "category": "Documentation and Reporting",
    "subCategory": "Environmental Variables",
    "keywords": [
      "Documentation and Reporting",
      "Environmental Variables",
      "E.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-e03-2",
    "certification": "RBT",
    "question": "When a caregiver reports that a client was prescribed a new psychotropic medication that began yesterday, how should the RBT document and report this?",
    "scenarioText": "The medication may cause drowsiness or appetite changes.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Tell the caregiver to stop the medication immediately",
        "isCorrect": false,
        "explanation": "Giving medical advice violates the RBT scope of practice."
      },
      {
        "id": "B",
        "text": "Ignore the report unless the client physically vomits",
        "isCorrect": false,
        "explanation": "Medication changes must be tracked proactively."
      },
      {
        "id": "C",
        "text": "Alter the client's behavioral targets to match psychiatric goals",
        "isCorrect": false,
        "explanation": "Only BCBAs design and modify behavioral goals."
      },
      {
        "id": "D",
        "text": "Note the caregiver report objectively in the session notes and inform the BCBA supervisor immediately",
        "isCorrect": true,
        "explanation": "Documenting medication changes provides essential clinical context for subsequent behavioral trends."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "RBTs must document caregiver-reported medication changes objectively and notify the supervisor to monitor behavioral side effects.",
    "clinicalExplanation": "BACB TCO Item E.3: Documenting medication shifts helps distinguish behavioral intervention effects from pharmacological effects.",
    "references": "BACB RBT 3rd Edition TCO Item E.3",
    "category": "Documentation and Reporting",
    "subCategory": "Medication Changes",
    "keywords": [
      "Documentation and Reporting",
      "Medication Changes",
      "E.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-e04-1",
    "certification": "RBT",
    "question": "Which of the following session note entries represents the most objective, fact-based description compliant with BACB and regulatory standards?",
    "scenarioText": "An RBT is writing a clinical SOAP / progress note at the end of a 3-hour session.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Client engaged in 4 instances of crying and 2 instances of floor-dropping during academic transitions; manding for breaks was prompted across 8 trials with 75% accuracy.",
        "isCorrect": true,
        "explanation": "States exact counts, operational behaviors, environmental triggers, and measurable trial percentages objectively."
      },
      {
        "id": "B",
        "text": "Client was possessed by bad spirits and acted out spitefully against the therapist.",
        "isCorrect": false,
        "explanation": "Supernatural and emotional blame statements are completely unscientific."
      },
      {
        "id": "C",
        "text": "Client was angry all day, probably because mom did not give him his favorite iPad before session.",
        "isCorrect": false,
        "explanation": "Speculating on internal anger and maternal blame is subjective opinion."
      },
      {
        "id": "D",
        "text": "Client had an awful day and was miserable the whole morning.",
        "isCorrect": false,
        "explanation": "Awful and miserable are vague, non-measurable personal opinions."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Objective session notes state observable physical actions, specific data metrics, environmental triggers, and intervention responses without subjective speculation.",
    "clinicalExplanation": "BACB TCO Item E.4: Progress notes are legal medical records subject to audit by state agencies, insurance payers, and supervisors.",
    "references": "BACB RBT 3rd Edition TCO Item E.4",
    "category": "Documentation and Reporting",
    "subCategory": "Objective Session Notes",
    "keywords": [
      "Documentation and Reporting",
      "Objective Session Notes",
      "E.4"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-e04-2",
    "certification": "RBT",
    "question": "During a home-based session, an RBT observes unexplained severe linear bruising, burn marks, and extreme malnutrition on a minor client, and the child whispers that a relative caused the injuries. What is the RBT's mandatory legal obligation?",
    "scenarioText": "The RBT is a mandated reporter under state child protection laws.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Confront the family angrily and threaten them with physical violence",
        "isCorrect": false,
        "explanation": "Confrontation endangers the client and violates legal protocol."
      },
      {
        "id": "B",
        "text": "Immediately report the suspected abuse/neglect to the state child protection agency/authorities per mandated reporter laws, and notify their supervisor",
        "isCorrect": true,
        "explanation": "As mandated reporters, RBTs are legally obligated to report suspected child abuse immediately."
      },
      {
        "id": "C",
        "text": "Wait 6 months to see if the bruising fades naturally",
        "isCorrect": false,
        "explanation": "Delaying reports of abuse is illegal and endangers client life."
      },
      {
        "id": "D",
        "text": "Post photos of the injuries online to get legal advice from friends",
        "isCorrect": false,
        "explanation": "Posting client photos violates HIPAA and privacy laws."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "RBTs are mandated reporters who must immediately report suspected child abuse or neglect to child protective services and follow agency notification protocols.",
    "clinicalExplanation": "BACB TCO Item E.4: Legal reporting duties take precedence over confidentiality when client physical safety and abuse are at stake.",
    "references": "BACB RBT 3rd Edition TCO Item E.4",
    "category": "Documentation and Reporting",
    "subCategory": "Mandated Reporting Obligations",
    "keywords": [
      "Documentation and Reporting",
      "Mandated Reporting Obligations",
      "E.4"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-e04-3",
    "certification": "RBT",
    "question": "An RBT finishes an in-home session with a paper data binder containing the client's full name, diagnostic reports, and medical history. How must this binder be transported?",
    "scenarioText": "The RBT drives between multiple client homes throughout the day.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Leave the open binder face-up on the front passenger seat with windows rolled down",
        "isCorrect": false,
        "explanation": "Leaving records visible and accessible invites privacy breaches."
      },
      {
        "id": "B",
        "text": "Throw the papers away in a public park garbage can",
        "isCorrect": false,
        "explanation": "Discarding PHI in public bins is a severe federal HIPAA violation."
      },
      {
        "id": "C",
        "text": "Secure the records in a locked, concealed container or trunk in compliance with HIPAA privacy standards",
        "isCorrect": true,
        "explanation": "Protected Health Information (PHI) must be safeguarded against unauthorized access during transport."
      },
      {
        "id": "D",
        "text": "Hand the binder to a passing neighbor for safe keeping",
        "isCorrect": false,
        "explanation": "Sharing PHI with unauthorized individuals is illegal."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "HIPAA requires physical and electronic safeguards to protect confidential client records (PHI) during transit and storage.",
    "clinicalExplanation": "BACB TCO Item E.4: Secure data management protects client legal privacy rights.",
    "references": "BACB RBT 3rd Edition TCO Item E.4",
    "category": "Documentation and Reporting",
    "subCategory": "HIPAA & Data Privacy",
    "keywords": [
      "Documentation and Reporting",
      "HIPAA & Data Privacy",
      "E.4"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-e01-3",
    "certification": "RBT",
    "question": "An occupational therapist (OT) working with a shared client tells the RBT that brushing the client's skin with a brush reduces all tantrums. How should the RBT respond?",
    "scenarioText": "The sensory brushing technique is not in the client's approved BACB behavior plan.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Start brushing the client immediately without telling the BCBA",
        "isCorrect": false,
        "explanation": "Implementing unapproved non-behavioral techniques independently is unethical."
      },
      {
        "id": "B",
        "text": "Scream at the OT that occupational therapy is fake science",
        "isCorrect": false,
        "explanation": "Hostile and disrespectful conduct violates professional collaboration standards."
      },
      {
        "id": "C",
        "text": "Quit working with the client on the spot",
        "isCorrect": false,
        "explanation": "Unjustified service abandonment harms the client."
      },
      {
        "id": "D",
        "text": "Thank the OT for the suggestion and state that all intervention techniques must be evaluated and approved by the supervising BCBA before implementation",
        "isCorrect": true,
        "explanation": "Professional collaboration requires channeling intervention changes through the supervising BCBA."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "RBTs must politely inform multidisciplinary providers that any new interventions must be reviewed and authorized by the supervising BCBA.",
    "clinicalExplanation": "BACB TCO Item E.1: Upholding treatment fidelity ensures interventions remain strictly evidence-based and supervisor-approved.",
    "references": "BACB RBT 3rd Edition TCO Item E.1",
    "category": "Documentation and Reporting",
    "subCategory": "Team Communication",
    "keywords": [
      "Documentation and Reporting",
      "Team Communication",
      "E.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-e04-4",
    "certification": "RBT",
    "question": "Under BACB and clinical compliance guidelines, how long must behavioral client records and data typically be securely retained?",
    "scenarioText": "An agency is archiving closed client case files.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "For at least 7 years, or as mandated by applicable state and federal laws",
        "isCorrect": true,
        "explanation": "BACB and federal healthcare compliance standards mandate secure record retention for a minimum of 7 years."
      },
      {
        "id": "B",
        "text": "For 24 hours only, after which all records must be burned",
        "isCorrect": false,
        "explanation": "Immediate destruction destroys necessary clinical and audit history."
      },
      {
        "id": "C",
        "text": "Until the client turns 100 years old regardless of death",
        "isCorrect": false,
        "explanation": "Unrealistic duration."
      },
      {
        "id": "D",
        "text": "Data does not need to be saved once the session ends",
        "isCorrect": false,
        "explanation": "Records must be archived for clinical continuity and legal verification."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Behavioral records and clinical data must be maintained securely for at least 7 years in accordance with BACB and healthcare regulatory rules.",
    "clinicalExplanation": "BACB TCO Item E.4: Systematic data archiving protects both client history and provider clinical accountability.",
    "references": "BACB RBT 3rd Edition TCO Item E.4",
    "category": "Documentation and Reporting",
    "subCategory": "Data Storage Standards",
    "keywords": [
      "Documentation and Reporting",
      "Data Storage Standards",
      "E.4"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-f01-1",
    "certification": "RBT",
    "question": "Which of the following represents a foundational core principle of the BACB Ethics Code for RBTs?",
    "scenarioText": "An RBT reflects on ethical practice during clinical decision-making.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Maximize agency billing revenue above all other priorities",
        "isCorrect": false,
        "explanation": "Financial profit is never an ethical priority."
      },
      {
        "id": "B",
        "text": "Benefit others; treat others with compassion, dignity, and respect; behave with integrity; and ensure competence",
        "isCorrect": true,
        "explanation": "These four foundational principles underpin all specific standards in the BACB Ethics Code for RBTs."
      },
      {
        "id": "C",
        "text": "Avoid talking to parents to prevent awkward social situations",
        "isCorrect": false,
        "explanation": "Avoiding families harms clinical collaboration."
      },
      {
        "id": "D",
        "text": "Enforce strict physical discipline whenever a client makes a mistake",
        "isCorrect": false,
        "explanation": "Physical discipline violates dignity, safety, and ethics standards."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "The core ethical principles include benefiting others, treating people with compassion, dignity, and respect, behaving with integrity, and maintaining competence.",
    "clinicalExplanation": "BACB TCO Item F.1: Grounding daily work in core principles prevents ethical violations.",
    "references": "BACB RBT 3rd Edition TCO Item F.1",
    "category": "Ethics",
    "subCategory": "Core Ethical Principles",
    "keywords": [
      "Ethics",
      "Core Ethical Principles",
      "F.1"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-f02-1",
    "certification": "RBT",
    "question": "A supervisor assigns an RBT to implement a feeding protocol involving high choking risk for a child with severe dysphagia. The RBT has never received training or modeling on feeding interventions. What is the RBT's ethical obligation?",
    "scenarioText": "The RBT has only worked on basic table-top discrete trial programs previously.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Attempt the feeding intervention alone and guess how to clear the airway",
        "isCorrect": false,
        "explanation": "Attempting complex, high-risk procedures without training risks client life."
      },
      {
        "id": "B",
        "text": "Falsify feeding data sheets without feeding the child",
        "isCorrect": false,
        "explanation": "Falsifying clinical records is fraud and an egregious ethical breach."
      },
      {
        "id": "C",
        "text": "Inform the supervisor that they have not demonstrated competence in this protocol and request instruction, modeling, and observed rehearsal before implementation",
        "isCorrect": true,
        "explanation": "RBTs must provide services only after demonstrating competence under qualified supervision."
      },
      {
        "id": "D",
        "text": "Quit the profession immediately and abandon all clients",
        "isCorrect": false,
        "explanation": "Professionals request training rather than abandoning services."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Under Item F.2, RBTs must provide behavioral technician services only after demonstrating competence in the designated protocols.",
    "clinicalExplanation": "BACB TCO Item F.2: Acknowledging competency boundaries protects client safety in specialized clinical domains.",
    "references": "BACB RBT 3rd Edition TCO Item F.2",
    "category": "Ethics",
    "subCategory": "Competence Boundaries",
    "keywords": [
      "Ethics",
      "Competence Boundaries",
      "F.2"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-f03-1",
    "certification": "RBT",
    "question": "According to BACB requirements, what is the minimum percentage of monthly behavior-analytic service hours that an RBT must receive in direct supervision?",
    "scenarioText": "An RBT works 100 hours providing direct ABA therapy during the month of October.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "1% of monthly hours",
        "isCorrect": false,
        "explanation": "1% is insufficient under BACB standards."
      },
      {
        "id": "B",
        "text": "50% of monthly hours",
        "isCorrect": false,
        "explanation": "50% is required for practicum internships, not standard RBT maintenance."
      },
      {
        "id": "C",
        "text": "Supervision is only required once every 5 years",
        "isCorrect": false,
        "explanation": "Supervision is a strict monthly ongoing requirement."
      },
      {
        "id": "D",
        "text": "At least 5% of monthly hours providing behavior-analytic services across a minimum of 2 face-to-face contacts",
        "isCorrect": true,
        "explanation": "The BACB mandates at least 5% monthly supervision with at least 2 synchronous face-to-face meetings."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "RBTs must receive ongoing supervision for at least 5% of their monthly direct service hours, including at least 2 face-to-face synchronous contacts per month.",
    "clinicalExplanation": "BACB TCO Item F.3: Maintaining required supervision hours is mandatory to maintain active RBT certification.",
    "references": "BACB RBT 3rd Edition TCO Item F.3",
    "category": "Ethics",
    "subCategory": "Supervision Requirements",
    "keywords": [
      "Ethics",
      "Supervision Requirements",
      "F.3"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-f04-1",
    "certification": "RBT",
    "question": "What are the four recognized stages of Behavioral Skills Training (BST) used by supervisors to train RBTs on new clinical procedures?",
    "scenarioText": "A BCBA trains an RBT on a new natural environment manding procedure.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Instructions -> Modeling -> Rehearsal -> Feedback",
        "isCorrect": true,
        "explanation": "BST is the evidence-based gold standard training model consisting of instructions, modeling, roleplay rehearsal, and corrective feedback."
      },
      {
        "id": "B",
        "text": "Reading a book -> Taking an exam -> Signing a contract -> Working alone",
        "isCorrect": false,
        "explanation": "Didactic instruction alone without modeling and rehearsal is not BST."
      },
      {
        "id": "C",
        "text": "Lecture -> Scolding -> Isolation -> Retest",
        "isCorrect": false,
        "explanation": "Punitive feedback is unscientific and ineffective."
      },
      {
        "id": "D",
        "text": "Observation only without any verbal communication",
        "isCorrect": false,
        "explanation": "Effective training requires clear instruction and active practice."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Behavioral Skills Training (BST) consists of: 1) Instruction, 2) Modeling, 3) Rehearsal, and 4) Performance Feedback.",
    "clinicalExplanation": "BACB TCO Item F.4: BST ensures technicians achieve procedural fidelity before working independently with clients.",
    "references": "BACB RBT 3rd Edition TCO Item F.4",
    "category": "Ethics",
    "subCategory": "Behavioral Skills Training (BST)",
    "keywords": [
      "Ethics",
      "Behavioral Skills Training (BST)",
      "F.4"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-f05-1",
    "certification": "RBT",
    "question": "While having lunch at a public caf\u00e9, an RBT meets a friend and begins discussing a client's specific diagnosis, address, and behavioral tantrums using the client's full real name. What ethical standard has been violated?",
    "scenarioText": "Patrons at neighboring tables overhear the entire clinical conversation.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "The mandatory 5% supervision rule",
        "isCorrect": false,
        "explanation": "This is a confidentiality breach, not a supervision calculation issue."
      },
      {
        "id": "B",
        "text": "Complying with requirements for collecting, using, storing, and protecting confidential information",
        "isCorrect": true,
        "explanation": "Disclosing protected health information in public without authorization violates client confidentiality and HIPAA."
      },
      {
        "id": "C",
        "text": "Preference assessment standards",
        "isCorrect": false,
        "explanation": "This is unrelated to preference assessments."
      },
      {
        "id": "D",
        "text": "Token exchange ratios",
        "isCorrect": false,
        "explanation": "This is unrelated to token economies."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "RBTs must protect client confidentiality and never discuss protected client information in public or with unauthorized individuals.",
    "clinicalExplanation": "BACB TCO Item F.5: Protecting confidentiality preserves client dignity, trust, and federal legal rights.",
    "references": "BACB RBT 3rd Edition TCO Item F.5",
    "category": "Ethics",
    "subCategory": "Protecting Confidentiality",
    "keywords": [
      "Ethics",
      "Protecting Confidentiality",
      "F.5"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-f06-1",
    "certification": "RBT",
    "question": "An RBT takes an adorable photo of a client during a successful session and posts it on their personal Instagram account with the caption: 'My favorite autistic kiddo crushed his ABA goals today! #RBTLife'. The client's face is clearly visible. Is this acceptable?",
    "scenarioText": "The RBT has personal privacy settings on their social media page.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Yes, as long as the photo receives at least 100 likes",
        "isCorrect": false,
        "explanation": "Social media engagement does not justify ethical violations."
      },
      {
        "id": "B",
        "text": "Yes, provided the child was smiling in the picture",
        "isCorrect": false,
        "explanation": "A child's smile does not waive privacy protections."
      },
      {
        "id": "C",
        "text": "No, posting client images and diagnostic disclosures on personal social media violates BACB ethics and confidentiality requirements",
        "isCorrect": true,
        "explanation": "RBTs must not share client images or confidential details on personal social media platforms."
      },
      {
        "id": "D",
        "text": "Yes, because Instagram is not an official healthcare record",
        "isCorrect": false,
        "explanation": "HIPAA and BACB rules apply to all digital media platforms."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Posting client photos, names, or identifying clinical details on social media is a severe violation of BACB ethics and privacy laws.",
    "clinicalExplanation": "BACB TCO Item F.6: Maintaining strict social media boundaries protects vulnerable clients from public exposure.",
    "references": "BACB RBT 3rd Edition TCO Item F.6",
    "category": "Ethics",
    "subCategory": "Social Media Compliance",
    "keywords": [
      "Ethics",
      "Social Media Compliance",
      "F.6"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-f07-1",
    "certification": "RBT",
    "question": "A client's parent asks the RBT to babysit the client on weekends for paid cash, outside of their official clinic therapy hours. How should the RBT respond?",
    "scenarioText": "The parent explains that the child already knows and loves the RBT.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Accept the offer immediately to earn extra weekend cash",
        "isCorrect": false,
        "explanation": "Accepting private babysitting creates a multiple/dual relationship with conflicts of interest."
      },
      {
        "id": "B",
        "text": "Agree to babysit if the parent gives them a 5-star review online",
        "isCorrect": false,
        "explanation": "Soliciting reviews in exchange for favors is unethical."
      },
      {
        "id": "C",
        "text": "Move into the client's home permanently to provide 24/7 care",
        "isCorrect": false,
        "explanation": "Co-habitation represents an extreme boundary violation."
      },
      {
        "id": "D",
        "text": "Politely decline the offer, explain that BACB ethical guidelines prohibit multiple relationships, and inform the supervisor",
        "isCorrect": true,
        "explanation": "Declining protects clinical objectivity and maintains strict professional boundaries."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Multiple relationships (e.g., being a therapist and a babysitter/friend) impair clinical objectivity and create conflicts of interest.",
    "clinicalExplanation": "BACB TCO Item F.7: Avoiding dual relationships protects the integrity of therapeutic boundaries.",
    "references": "BACB RBT 3rd Edition TCO Item F.7",
    "category": "Ethics",
    "subCategory": "Multiple Relationships",
    "keywords": [
      "Ethics",
      "Multiple Relationships",
      "F.7"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-f08-1",
    "certification": "RBT",
    "question": "During the holiday season, a wealthy client family attempts to give the RBT a brand-new $500 designer handbag and a $200 cash gift card. How must the RBT handle this situation?",
    "scenarioText": "The family insists that refusing the gift would hurt their feelings.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Politely decline the expensive gifts, explain the BACB ethics code rules regarding gift limits, and notify the supervisor",
        "isCorrect": true,
        "explanation": "RBTs must not accept individual gifts that exceed established nominal thresholds or create conflicts of interest."
      },
      {
        "id": "B",
        "text": "Accept both gifts quietly without telling the supervisor",
        "isCorrect": false,
        "explanation": "Accepting expensive gifts violates BACB ethical standards and compromises professional objectivity."
      },
      {
        "id": "C",
        "text": "Demand $1,000 cash instead of the handbag",
        "isCorrect": false,
        "explanation": "Extorting clients is illegal and unethical."
      },
      {
        "id": "D",
        "text": "Accept the handbag but give the cash card to a coworker",
        "isCorrect": false,
        "explanation": "Redistributing improper gifts does not resolve the ethical breach."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Under the BACB Ethics Code, RBTs must adhere to gift restrictions (avoiding significant personal gifts) to prevent conflicts of interest and maintain professional boundaries.",
    "clinicalExplanation": "BACB TCO Item F.8: A polite, upfront explanation of certification ethics preserves rapport while maintaining compliance.",
    "references": "BACB RBT 3rd Edition TCO Item F.8",
    "category": "Ethics",
    "subCategory": "Gift Giving and Receiving",
    "keywords": [
      "Ethics",
      "Gift Giving and Receiving",
      "F.8"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-f09-1",
    "certification": "RBT",
    "question": "During an observation, a BCBA provides constructive feedback that the RBT is delivering reinforcers too slowly (5-second delay instead of immediate). How should the RBT respond professionally?",
    "scenarioText": "The RBT felt they were doing a good job and is surprised by the critique.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Yell at the BCBA and storm out of the clinic",
        "isCorrect": false,
        "explanation": "Unprofessional hostility impairs clinical collaboration."
      },
      {
        "id": "B",
        "text": "Listen actively, accept the constructive feedback non-defensively, ask clarifying questions, and implement the immediate delivery timing on the next trial",
        "isCorrect": true,
        "explanation": "Accepting supervisor feedback non-defensively and implementing corrective changes immediately is a core professional competency."
      },
      {
        "id": "C",
        "text": "Complain about the BCBA to the client's parents",
        "isCorrect": false,
        "explanation": "Triangulating parents into supervisor disputes violates professional standards."
      },
      {
        "id": "D",
        "text": "Intentionally delay reinforcement by 20 seconds to spite the supervisor",
        "isCorrect": false,
        "explanation": "Deliberately sabotaging client protocols harms the learner."
      }
    ],
    "correctAnswerId": "B",
    "answerExplanation": "RBTs must receive corrective feedback non-defensively, communicate professionally, and implement recommendations with fidelity.",
    "clinicalExplanation": "BACB TCO Item F.9: Constructive feedback is the primary mechanism through which technicians develop clinical mastery.",
    "references": "BACB RBT 3rd Edition TCO Item F.9",
    "category": "Ethics",
    "subCategory": "Accepting Feedback",
    "keywords": [
      "Ethics",
      "Accepting Feedback",
      "F.9"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-f10-1",
    "certification": "RBT",
    "question": "An RBT is assigned to provide in-home ABA services to a family whose cultural and religious customs require removing shoes at the entrance and observing specific dietary prayer rituals before eating. What should the RBT do?",
    "scenarioText": "The RBT has never encountered these customs in their own personal life.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Demand that the family abandon their religious customs during ABA hours",
        "isCorrect": false,
        "explanation": "Imposing personal values onto clients violates cultural humility and dignity."
      },
      {
        "id": "B",
        "text": "Make jokes about the family's traditions in session notes",
        "isCorrect": false,
        "explanation": "Disrespectful remarks violate ethical dignity standards."
      },
      {
        "id": "C",
        "text": "Engage in cultural humility, respect the family's home traditions, remove shoes as requested, and coordinate with the BCBA to integrate family values into programming",
        "isCorrect": true,
        "explanation": "Cultural responsiveness requires respecting client cultural backgrounds and adapting service delivery respectfully."
      },
      {
        "id": "D",
        "text": "Report the family to child protective services for observing religious prayers",
        "isCorrect": false,
        "explanation": "Religious observance is a constitutionally protected right, not abuse."
      }
    ],
    "correctAnswerId": "C",
    "answerExplanation": "Cultural humility requires technicians to recognize personal biases, respect client cultural practices, and provide culturally responsive service.",
    "clinicalExplanation": "BACB TCO Item F.10: Responsive care honors family values and strengthens treatment adherence.",
    "references": "BACB RBT 3rd Edition TCO Item F.10",
    "category": "Ethics",
    "subCategory": "Cultural Humility",
    "keywords": [
      "Ethics",
      "Cultural Humility",
      "F.10"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-f07-2",
    "certification": "RBT",
    "question": "A client's older sibling invites the RBT to attend their personal 21st birthday party at a local nightclub. Can the RBT attend as a personal friend?",
    "scenarioText": "The RBT and sibling get along well during clinic drop-offs.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "Yes, because the sibling is an adult and not the direct client",
        "isCorrect": false,
        "explanation": "Socializing outside therapy hours with client family members compromises clinical boundaries."
      },
      {
        "id": "B",
        "text": "Yes, as long as the RBT brings the client along",
        "isCorrect": false,
        "explanation": "Bringing a client to a nightclub is hazardous and inappropriate."
      },
      {
        "id": "C",
        "text": "Yes, if the RBT acts as the designated driver",
        "isCorrect": false,
        "explanation": "Acting as a personal driver still violates boundary rules."
      },
      {
        "id": "D",
        "text": "No, attending private social parties with client family members creates a dual relationship and blurs therapeutic boundaries",
        "isCorrect": true,
        "explanation": "Maintaining strict professional distance preserves therapeutic objectivity."
      }
    ],
    "correctAnswerId": "D",
    "answerExplanation": "Socializing privately with clients or immediate family members establishes multiple relationships that compromise professional objectivity.",
    "clinicalExplanation": "BACB TCO Item F.7: Firm personal-professional boundaries protect both the practitioner and the client family.",
    "references": "BACB RBT 3rd Edition TCO Item F.7",
    "category": "Ethics",
    "subCategory": "Multiple Relationships - Socializing",
    "keywords": [
      "Ethics",
      "Multiple Relationships - Socializing",
      "F.7"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  },
  {
    "id": "q-f05-2",
    "certification": "RBT",
    "question": "An RBT wants to draft session notes on their personal laptop. They upload unencrypted documents with client names and home addresses to an unsecure personal cloud account. Is this compliant with BACB and HIPAA rules?",
    "scenarioText": "The RBT thinks personal cloud storage is private enough.",
    "questionType": "scenario_based",
    "difficulty": "medium",
    "options": [
      {
        "id": "A",
        "text": "No, storing unencrypted protected health information on unauthorized personal devices violates federal confidentiality regulations",
        "isCorrect": true,
        "explanation": "Only clinic-authorized, encrypted, HIPAA-compliant platforms may store protected health data."
      },
      {
        "id": "B",
        "text": "Yes, because personal accounts cannot be hacked",
        "isCorrect": false,
        "explanation": "Personal consumer cloud accounts lack necessary HIPAA encryption agreements (BAAs)."
      },
      {
        "id": "C",
        "text": "Yes, if the RBT sets a 4-digit PIN",
        "isCorrect": false,
        "explanation": "A simple PIN on consumer accounts does not meet enterprise healthcare security standards."
      },
      {
        "id": "D",
        "text": "Yes, provided the notes are written in Spanish",
        "isCorrect": false,
        "explanation": "Language does not alter confidentiality and data protection laws."
      }
    ],
    "correctAnswerId": "A",
    "answerExplanation": "Storing client PHI on unauthorized, unencrypted personal cloud drives violates HIPAA security rules and BACB confidentiality standards.",
    "clinicalExplanation": "BACB TCO Item F.5: Technicians must use only agency-approved, encrypted systems for client records.",
    "references": "BACB RBT 3rd Edition TCO Item F.5",
    "category": "Ethics",
    "subCategory": "Confidentiality - Cloud Sharing",
    "keywords": [
      "Ethics",
      "Confidentiality - Cloud Sharing",
      "F.5"
    ],
    "taskListVersion": "3rd_edition",
    "status": "published",
    "isPremium": false,
    "isFeatured": true,
    "version": 1,
    "createdBy": "admin_sys",
    "updatedBy": "admin_sys"
  }
];
