INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a01-1', 'q-a01-1', 'RBT', 'An RBT tracks how many times a client slaps their own leg during a 30-minute session using a tally counter. What continuous measurement procedure is being implemented?', 'The RBT clicks the handheld tally counter once each time the client slaps their leg from session start to finish.',
        'scenario_based', 'medium', '[{"id":"A","text":"Frequency (Count)","isCorrect":true,"explanation":"Frequency is a continuous measure recording the total count of discrete behavior occurrences."},{"id":"B","text":"Duration","isCorrect":false,"explanation":"Duration measures the total elapsed time from behavior onset to offset."},{"id":"C","text":"Latency","isCorrect":false,"explanation":"Latency measures elapsed time from the presentation of a stimulus to the onset of the response."},{"id":"D","text":"Interresponse Time (IRT)","isCorrect":false,"explanation":"IRT measures elapsed time between the offset of one response and the onset of the next response."}]', 'A', 'Frequency (Count) directly tallies the total number of discrete behavioral instances during an observation period.',
        'BACB TCO Item A.1: Frequency recording is ideal for behaviors with discrete beginnings and endings and relatively constant durations.', 'BACB RBT 3rd Edition TCO Item A.1', NULL, NULL, 'Data Collection and Graphing',
        'Continuous Measurement - Frequency', '["Data Collection and Graphing","Continuous Measurement - Frequency","A.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a01-2', 'q-a01-2', 'RBT', 'A supervisor instructs the RBT to measure how long it takes between saying ''Clean up your blocks'' and the client picking up the first block. Which continuous measurement procedure should be used?', 'The RBT starts the stopwatch when delivering the verbal instruction and stops it the moment the child touches the block.',
        'scenario_based', 'medium', '[{"id":"A","text":"Duration","isCorrect":false,"explanation":"Duration would measure how long the child spent cleaning up, not how long before they started."},{"id":"B","text":"Latency","isCorrect":true,"explanation":"Latency measures the temporal interval between the presentation of a stimulus and the initiation of the response."},{"id":"C","text":"Interresponse Time (IRT)","isCorrect":false,"explanation":"IRT measures the time between consecutive responses of the same class."},{"id":"D","text":"Whole Interval Recording","isCorrect":false,"explanation":"Whole interval is a discontinuous procedure, not a continuous latency measure."}]', 'B', 'Latency measures the elapsed time from the delivery of the discriminative stimulus (SD) to the initiation of the target behavior.',
        'BACB TCO Item A.1: Latency data collection helps determine processing speed or compliance delay following instructions.', 'BACB RBT 3rd Edition TCO Item A.1', NULL, NULL, 'Data Collection and Graphing',
        'Continuous Measurement - Latency', '["Data Collection and Graphing","Continuous Measurement - Latency","A.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a01-3', 'q-a01-3', 'RBT', 'An RBT records the elapsed time between the end of one bite of food and the beginning of the next bite of food. What metric is being gathered?', 'A client eats lunch too rapidly, choking on food. The RBT records the time between bites to support a pacing intervention.',
        'scenario_based', 'medium', '[{"id":"A","text":"Duration","isCorrect":false,"explanation":"Duration measures how long an entire meal lasts, not the interval between bites."},{"id":"B","text":"Momentary Time Sampling","isCorrect":false,"explanation":"Momentary time sampling checks behavior occurrence only at interval endpoints."},{"id":"C","text":"Interresponse Time (IRT)","isCorrect":true,"explanation":"IRT is the elapsed time between two successive instances of the same response class."},{"id":"D","text":"Trial-to-criterion","isCorrect":false,"explanation":"Trial-to-criterion measures the number of trials needed to master a target skill."}]', 'C', 'Interresponse Time (IRT) is the time elapsed between the offset of one instance of behavior and the onset of the following instance.',
        'BACB TCO Item A.1: Increasing IRT is a common clinical objective for rapid eating or repetitive vocalizations.', 'BACB RBT 3rd Edition TCO Item A.1', NULL, NULL, 'Data Collection and Graphing',
        'Continuous Measurement - IRT', '["Data Collection and Graphing","Continuous Measurement - IRT","A.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a02-1', 'q-a02-1', 'RBT', 'An RBT divides a 10-minute session into 30-second intervals and marks (+) if out-of-seat behavior occurred at ANY point during the 30 seconds. What procedure was used?', 'The student stood up from the desk for 3 seconds during interval 4. The RBT marked interval 4 as (+).',
        'scenario_based', 'medium', '[{"id":"A","text":"Whole Interval Recording","isCorrect":false,"explanation":"Whole interval recording requires behavior to occur throughout the entire interval duration."},{"id":"B","text":"Momentary Time Sampling","isCorrect":false,"explanation":"Momentary time sampling only records occurrence if the behavior occurs at the exact moment the timer expires."},{"id":"C","text":"Permanent Product Recording","isCorrect":false,"explanation":"Permanent product measures physical results left in the environment."},{"id":"D","text":"Partial Interval Recording","isCorrect":true,"explanation":"Partial interval records occurrence if the behavior occurs at any point during the interval."}]', 'D', 'Partial Interval Recording records whether a target behavior occurred at any time during an interval, which tends to overestimate the true overall duration.',
        'BACB TCO Item A.2: Partial interval is commonly used for behaviors targeted for reduction because it captures brief occurrences.', 'BACB RBT 3rd Edition TCO Item A.2', NULL, NULL, 'Data Collection and Graphing',
        'Discontinuous Measurement - Partial Interval', '["Data Collection and Graphing","Discontinuous Measurement - Partial Interval","A.2"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a02-2', 'q-a02-2', 'RBT', 'Which discontinuous measurement system requires the behavior to persist continuously from the start to the finish of the interval to be scored as an occurrence?', 'An RBT is tracking on-task study behavior in 1-minute intervals. If the learner looks away for 2 seconds, the interval is scored (-).',
        'scenario_based', 'medium', '[{"id":"A","text":"Whole Interval Recording","isCorrect":true,"explanation":"Whole interval recording requires the behavior to occur for the entire duration of the interval."},{"id":"B","text":"Partial Interval Recording","isCorrect":false,"explanation":"Partial interval only requires occurrence at any brief moment during the interval."},{"id":"C","text":"Momentary Time Sampling","isCorrect":false,"explanation":"Momentary time sampling checks behavior only at the end of the interval."},{"id":"D","text":"Rate Recording","isCorrect":false,"explanation":"Rate is a continuous count per unit of time, not an interval system."}]', 'A', 'Whole Interval Recording requires the behavior to be emitted throughout the entire interval. It tends to underestimate overall occurrence.',
        'BACB TCO Item A.2: Whole interval is appropriate when the goal is to increase continuous engagement or sustained attention.', 'BACB RBT 3rd Edition TCO Item A.2', NULL, NULL, 'Data Collection and Graphing',
        'Discontinuous Measurement - Whole Interval', '["Data Collection and Graphing","Discontinuous Measurement - Whole Interval","A.2"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a02-3', 'q-a02-3', 'RBT', 'An RBT sets a vibrating timer for every 3 minutes. When the timer vibrates, the RBT immediately looks up and scores (+) if the student is writing in their workbook at that exact second. What is this?', 'The student wrote for 2.5 minutes but stopped to stretch right when the timer vibrated. The RBT recorded (-).',
        'scenario_based', 'medium', '[{"id":"A","text":"Partial Interval Recording","isCorrect":false,"explanation":"Partial interval would score (+) because writing occurred during the interval."},{"id":"B","text":"Momentary Time Sampling","isCorrect":true,"explanation":"Momentary time sampling records behavior presence at the precise conclusion of each predetermined interval."},{"id":"C","text":"Whole Interval Recording","isCorrect":false,"explanation":"Whole interval requires continuous writing for all 3 minutes."},{"id":"D","text":"Permanent Product Recording","isCorrect":false,"explanation":"Permanent product measures workbook pages completed, not momentary presence."}]', 'B', 'Momentary Time Sampling measures whether the target behavior is occurring at the specific moment each interval ends.',
        'BACB TCO Item A.2: MTS is practical when continuous observation is impossible, such as in group classrooms.', 'BACB RBT 3rd Edition TCO Item A.2', NULL, NULL, 'Data Collection and Graphing',
        'Discontinuous Measurement - MTS', '["Data Collection and Graphing","Discontinuous Measurement - MTS","A.2"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a03-1', 'q-a03-1', 'RBT', 'Which of the following is the best example of a permanent product recording procedure?', 'An RBT needs to assess how many math problems a client completed without sitting directly next to the client during the work period.',
        'scenario_based', 'medium', '[{"id":"A","text":"Measuring the duration of homework completion with a stopwatch","isCorrect":false,"explanation":"Stopwatch timing is continuous duration measurement, not permanent product."},{"id":"B","text":"Using a 10-second momentary time sampling sheet to record pencil-holding","isCorrect":false,"explanation":"Momentary time sampling is a discontinuous observation method."},{"id":"C","text":"Counting the number of correctly solved math problems on the turned-in test sheet","isCorrect":true,"explanation":"Permanent product measures tangible outcomes that remain in the environment without direct real-time observation."},{"id":"D","text":"Recording tally clicks every time the client writes a number","isCorrect":false,"explanation":"Tallying clicks is continuous frequency recording."}]', 'C', 'Permanent product recording measures the concrete, durable outcome produced by a behavior rather than the behavior itself as it occurs.',
        'BACB TCO Item A.3: Permanent product recording does not require the observer to be present during the response emission.', 'BACB RBT 3rd Edition TCO Item A.3', NULL, NULL, 'Data Collection and Graphing',
        'Permanent Product', '["Data Collection and Graphing","Permanent Product","A.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a04-1', 'q-a04-1', 'RBT', 'When entering data on a standard behavior line graph, what information is traditionally plotted along the horizontal X-axis?', 'An RBT is updating a client''s daily aggression graph following a 2-hour clinical session.',
        'scenario_based', 'medium', '[{"id":"A","text":"The target behavior count or percentage","isCorrect":false,"explanation":"The target behavior metric is plotted on the vertical Y-axis (ordinate)."},{"id":"B","text":"The client''s name and supervisor''s credentials","isCorrect":false,"explanation":"Client and supervisor info is located in the graph title/header, not on an axis."},{"id":"C","text":"The phase change condition label only","isCorrect":false,"explanation":"Phase labels are written above data paths across vertical phase lines."},{"id":"D","text":"The sessions or passage of time","isCorrect":true,"explanation":"The horizontal X-axis (abscissa) represents time units such as days, sessions, or weeks."}]', 'D', 'In standard visual analysis, the horizontal X-axis (abscissa) depicts successive time periods (sessions, days), while the vertical Y-axis (ordinate) depicts behavior quantity.',
        'BACB TCO Item A.4: RBTs must maintain accurate, up-to-date line graphs to facilitate visual data analysis by BCBA supervisors.', 'BACB RBT 3rd Edition TCO Item A.4', NULL, NULL, 'Data Collection and Graphing',
        'Graphing - X-Axis', '["Data Collection and Graphing","Graphing - X-Axis","A.4"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a04-2', 'q-a04-2', 'RBT', 'What is the primary function of a solid vertical line drawn on an ABA behavior graph?', 'A BCBA implements an extinction intervention following two weeks of baseline observation.',
        'scenario_based', 'medium', '[{"id":"A","text":"To separate different experimental or treatment phases","isCorrect":true,"explanation":"Vertical phase lines separate distinct conditions, such as Baseline and Intervention."},{"id":"B","text":"To connect data points from consecutive days","isCorrect":false,"explanation":"Data points are connected with data path lines."},{"id":"C","text":"To mark where the RBT had a substitute therapist","isCorrect":false,"explanation":"Therapist substitutions do not represent experimental condition changes."},{"id":"D","text":"To identify the average score of the client","isCorrect":false,"explanation":"Average lines are drawn horizontally across phases."}]', 'A', 'A solid vertical phase change line signals a major change in treatment or environmental conditions, allowing comparison of behavior across phases.',
        'BACB TCO Item A.4: Clear phase change lines are necessary for evaluating the functional relation between interventions and behavior.', 'BACB RBT 3rd Edition TCO Item A.4', NULL, NULL, 'Data Collection and Graphing',
        'Graphing - Phase Lines', '["Data Collection and Graphing","Graphing - Phase Lines","A.4"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a05-1', 'q-a05-1', 'RBT', 'Which of the following descriptions describes behavior in objective, observable, and measurable terms compliant with BACB standards?', 'An RBT is drafting a session note describing an incident of property destruction.',
        'scenario_based', 'medium', '[{"id":"A","text":"Client felt frustrated and acted out defensively because of anger.","isCorrect":false,"explanation":"Feelings and internal emotional states are unobservable hypothetical constructs."},{"id":"B","text":"Client slammed both open hands onto the wooden desk surface with enough force to produce a sound audible from 10 feet away.","isCorrect":true,"explanation":"This clearly describes observable topography, physical action, and measurable acoustic impact."},{"id":"C","text":"Client became sensory-overloaded and suffered an emotional crisis.","isCorrect":false,"explanation":"Sensory overloaded and emotional crisis are explanatory fictions without operational specificity."},{"id":"D","text":"Client demonstrated bad intentions and was non-compliant with therapist commands.","isCorrect":false,"explanation":"Bad intentions is a subjective, non-measurable judgment."}]', 'B', 'Operational definitions must describe the observable topography and measurable physical parameters of behavior without subjective speculation.',
        'BACB TCO Item A.5: Describing behavior in measurable terms ensures inter-observer agreement across the clinical treatment team.', 'BACB RBT 3rd Edition TCO Item A.5', NULL, NULL, 'Data Collection and Graphing',
        'Observable & Measurable Terms', '["Data Collection and Graphing","Observable & Measurable Terms","A.5"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a06-1', 'q-a06-1', 'RBT', 'A learner engages in 18 instances of hand-biting during a 3-hour session. What is the calculated rate of hand-biting?', 'The RBT needs to calculate the rate of behavior per hour for supervisor reporting.',
        'scenario_based', 'medium', '[{"id":"A","text":"54 instances per hour","isCorrect":false,"explanation":"This incorrectly multiplies count by hours instead of dividing."},{"id":"B","text":"15 instances per hour","isCorrect":false,"explanation":"Incorrect subtraction."},{"id":"C","text":"6 instances per hour","isCorrect":true,"explanation":"18 instances divided by 3 hours equals 6 instances per hour."},{"id":"D","text":"0.5 instances per minute","isCorrect":false,"explanation":"18 instances / 180 minutes equals 0.1 instances per minute, not 0.5."}]', 'C', 'Rate is calculated as total count divided by total observation time: 18 occurrences / 3 hours = 6 occurrences per hour.',
        'BACB TCO Item A.6: Rate allows meaningful comparisons of behavior frequency across sessions of unequal lengths.', 'BACB RBT 3rd Edition TCO Item A.6', NULL, NULL, 'Data Collection and Graphing',
        'Rate Calculation', '["Data Collection and Graphing","Rate Calculation","A.6"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a06-2', 'q-a06-2', 'RBT', 'During a discrete trial session, a client responds correctly on 16 out of 20 opportunities. What is the client''s percentage of correct responses?', 'The RBT conducts 20 distinct expressive label trials across the morning.',
        'scenario_based', 'medium', '[{"id":"A","text":"70%","isCorrect":false,"explanation":"14/20 is 70%."},{"id":"B","text":"75%","isCorrect":false,"explanation":"15/20 is 75%."},{"id":"C","text":"85%","isCorrect":false,"explanation":"17/20 is 85%."},{"id":"D","text":"80%","isCorrect":true,"explanation":"16 divided by 20 equals 0.80, or 80%."}]', 'D', 'Percentage is calculated by dividing correct responses by total opportunities and multiplying by 100: (16 / 20) * 100 = 80%.',
        'BACB TCO Item A.6: Mastery criteria in skill acquisition plans are frequently expressed as percentage of independent trials.', 'BACB RBT 3rd Edition TCO Item A.6', NULL, NULL, 'Data Collection and Graphing',
        'Percentage Calculation', '["Data Collection and Graphing","Percentage Calculation","A.6"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a07-1', 'q-a07-1', 'RBT', 'When examining a client''s daily graph of tantrum frequency across 10 consecutive sessions, the data points consistently slope downward from left to right. How is this trend described?', 'Session counts were 14, 12, 11, 9, 8, 7, 5, 4, 3, 2.',
        'scenario_based', 'medium', '[{"id":"A","text":"Descending trend","isCorrect":true,"explanation":"A systematic downward slope from left to right represents a descending trend."},{"id":"B","text":"Ascending trend","isCorrect":false,"explanation":"Ascending trend indicates an upward slope in data."},{"id":"C","text":"Zero trend","isCorrect":false,"explanation":"Zero trend indicates horizontal data points with no directional tilt."},{"id":"D","text":"Variable trend","isCorrect":false,"explanation":"Consistently downward slopes show clear directionality rather than high variability."}]', 'A', 'Trend refers to the overall directional orientation of data points on a graph (ascending, descending, or zero/neutral).',
        'BACB TCO Item A.7: Recognizing trends allows clinical supervisors to assess whether intervention strategies are producing desired change.', 'BACB RBT 3rd Edition TCO Item A.7', NULL, NULL, 'Data Collection and Graphing',
        'Visual Analysis - Trend', '["Data Collection and Graphing","Visual Analysis - Trend","A.7"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a07-2', 'q-a07-2', 'RBT', 'In visual analysis of graphed behavior, what does the term ''level'' refer to?', 'A supervisor asks an RBT to describe the shift in level between the baseline phase and the intervention phase.',
        'scenario_based', 'medium', '[{"id":"A","text":"The directional tilt of the line from left to right","isCorrect":false,"explanation":"Directional tilt is the trend of the data."},{"id":"B","text":"The mean or median value of the data set along the vertical axis within a given condition","isCorrect":true,"explanation":"Level refers to the value on the vertical axis around which a series of data points converges."},{"id":"C","text":"The variability or bounce among individual consecutive data points","isCorrect":false,"explanation":"Bounce and spread around the trend line is variability."},{"id":"D","text":"The total number of sessions conducted during the study","isCorrect":false,"explanation":"Total sessions represents the abscissa scale length."}]', 'B', 'Level represents the position of the data set on the Y-axis relative to a mean or median value within an experimental phase.',
        'BACB TCO Item A.7: Changes in level between baseline and intervention indicate the immediate magnitude of behavior change.', 'BACB RBT 3rd Edition TCO Item A.7', NULL, NULL, 'Data Collection and Graphing',
        'Visual Analysis - Level', '["Data Collection and Graphing","Visual Analysis - Level","A.7"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-a08-1', 'q-a08-1', 'RBT', 'What is the primary clinical risk if an RBT fails to collect data accurately or implements measurement procedures with poor procedural fidelity?', 'An RBT occasionally forgets to track interval data during busy clinic transitions and estimates scores at the end of the day.',
        'scenario_based', 'medium', '[{"id":"A","text":"The client will become physically immune to ABA reinforcers.","isCorrect":false,"explanation":"Biological reinforcement mechanisms do not disappear due to measurement error."},{"id":"B","text":"The client will automatically lose their insurance coverage within 24 hours.","isCorrect":false,"explanation":"Insurance reviews take time, but the immediate direct danger is clinical misdirection."},{"id":"C","text":"The BCBA supervisor may make incorrect clinical decisions regarding intervention effectiveness or prematurely discontinue necessary treatment.","isCorrect":true,"explanation":"Inaccurate data distorts clinical reality, risking harmful modifications or retention of ineffective procedures."},{"id":"D","text":"The RBT will be legally required to take the BACB exam again immediately.","isCorrect":false,"explanation":"Exam re-examination is not an automated administrative penalty for recording error."}]', 'C', 'Unreliable data collection skews visual analysis, causing BCBAs to make flawed clinical decisions about whether treatments work.',
        'BACB TCO Item A.8: Procedural fidelity and measurement accuracy protect client welfare and ensure evidence-based intervention.', 'BACB RBT 3rd Edition TCO Item A.8', NULL, NULL, 'Data Collection and Graphing',
        'Data Reliability Risks', '["Data Collection and Graphing","Data Reliability Risks","A.8"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-b01-1', 'q-b01-1', 'RBT', 'An RBT lays out an array of 5 preferred snacks. The client selects a pretzel and eats it. For the next trial, the RBT rearranges the remaining 4 snacks without returning the pretzel to the array. What preference assessment is this?', 'The RBT repeats this process until no items remain, establishing a preference hierarchy.',
        'scenario_based', 'medium', '[{"id":"A","text":"Free Operant Preference Assessment","isCorrect":false,"explanation":"Free operant allows unrestricted access without trials or item removal."},{"id":"B","text":"Multiple Stimulus with Replacement (MSW)","isCorrect":false,"explanation":"MSW returns the chosen item to the array before the next trial."},{"id":"C","text":"Paired Stimulus Preference Assessment","isCorrect":false,"explanation":"Paired stimulus presents items strictly in pairs of two."},{"id":"D","text":"Multiple Stimulus without Replacement (MSWO)","isCorrect":true,"explanation":"MSWO leaves out chosen items on subsequent trials to create a ranked hierarchy."}]', 'D', 'In an MSWO assessment, chosen items are not replaced in subsequent arrays, allowing rapid establishment of a ranked hierarchy.',
        'BACB TCO Item B.1: MSWO is an efficient preference assessment method for learners who can scan multi-item arrays.', 'BACB RBT 3rd Edition TCO Item B.1', NULL, NULL, 'Behavior Assessment',
        'Preference Assessment - MSWO', '["Behavior Assessment","Preference Assessment - MSWO","B.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-b01-2', 'q-b01-2', 'RBT', 'An RBT places two toys in front of a child and says, ''Pick one.'' The RBT pairs every item with every other item across systematic trials. What assessment is this?', 'Six items are evaluated, yielding 15 pairwise comparison trials.',
        'scenario_based', 'medium', '[{"id":"A","text":"Paired Choice (Forced Choice) Assessment","isCorrect":true,"explanation":"Paired choice presents items in pairs and calculates the percentage of trials each item was chosen."},{"id":"B","text":"Free Operant Assessment","isCorrect":false,"explanation":"Free operant involves unrestricted exploration in an enriched setting."},{"id":"C","text":"Single Item Presentation","isCorrect":false,"explanation":"Single item presents one item at a time."},{"id":"D","text":"Multiple Stimulus without Replacement (MSWO)","isCorrect":false,"explanation":"MSWO uses arrays of 3 or more items simultaneously."}]', 'A', 'Paired stimulus (forced choice) preference assessment presents two items simultaneously, counterbalancing positions across all possible pairs.',
        'BACB TCO Item B.1: Paired choice provides clear preference hierarchies, though it takes longer to administer than MSWO.', 'BACB RBT 3rd Edition TCO Item B.1', NULL, NULL, 'Behavior Assessment',
        'Preference Assessment - Paired Choice', '["Behavior Assessment","Preference Assessment - Paired Choice","B.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-b01-3', 'q-b01-3', 'RBT', 'An RBT observes a learner in a playroom with various toys available and records the total duration of time the child engages with each toy without delivering prompts or removing items. What type of assessment is this?', 'The child spends 8 minutes with trains, 4 minutes with blocks, and 30 seconds with puzzles.',
        'scenario_based', 'medium', '[{"id":"A","text":"Paired Choice Preference Assessment","isCorrect":false,"explanation":"Paired choice requires structured trials with two items presented at a time."},{"id":"B","text":"Free Operant Preference Assessment","isCorrect":true,"explanation":"Free operant allows non-contingent access to items and measures total engagement duration."},{"id":"C","text":"Functional Analysis","isCorrect":false,"explanation":"Functional analysis manipulates antecedents and consequences to test behavior function."},{"id":"D","text":"Functional Communication Training","isCorrect":false,"explanation":"FCT is an intervention procedure, not a preference assessment."}]', 'B', 'A Free Operant preference assessment measures engagement duration with freely accessible toys without structured trial prompts or item removal.',
        'BACB TCO Item B.1: Free operant assessments avoid triggering problem behavior that might occur when preferred items are removed.', 'BACB RBT 3rd Edition TCO Item B.1', NULL, NULL, 'Behavior Assessment',
        'Preference Assessment - Free Operant', '["Behavior Assessment","Preference Assessment - Free Operant","B.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-b01-4', 'q-b01-4', 'RBT', 'What is the key difference between a preference assessment and a reinforcer assessment?', 'An RBT notes that a child always selects a green bouncy ball during MSWO trials, but when offered the ball for completing math, math completion does not increase.',
        'scenario_based', 'medium', '[{"id":"A","text":"Preference assessments are only done with food, while reinforcers are always toys","isCorrect":false,"explanation":"Preferences and reinforcers encompass both edibles and tangible/social items."},{"id":"B","text":"There is no difference; the terms are completely identical in ABA","isCorrect":false,"explanation":"They are distinct conceptual terms with different clinical definitions."},{"id":"C","text":"A preference assessment identifies stimuli a client likes, but only a reinforcer assessment verifies whether delivering the stimulus increases behavior","isCorrect":true,"explanation":"Preference indicates interest; reinforcement is defined by whether it actually increases future behavior frequency."},{"id":"D","text":"Reinforcer assessments are illegal under the RBT Ethics Code 2.0","isCorrect":false,"explanation":"Reinforcer assessments are standard evidence-based behavior-analytic procedures."}]', 'C', 'A preference assessment identifies potential reinforcers, but a reinforcer assessment experimentally confirms that delivery increases the future frequency of the target behavior.',
        'BACB TCO Item B.1: Just because an item is highly preferred does not guarantee it will function as an effective reinforcer for difficult demands.', 'BACB RBT 3rd Edition TCO Item B.1', NULL, NULL, 'Behavior Assessment',
        'Preference vs Reinforcer', '["Behavior Assessment","Preference vs Reinforcer","B.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-b02-1', 'q-b02-1', 'RBT', 'What is the primary role of an RBT when assisting a BCBA with curriculum-based skill assessments (e.g., VB-MAPP, ABLLS-R)?', 'A BCBA instructs an RBT to probe receptive identification of 10 common household objects prior to beginning a new program.',
        'scenario_based', 'medium', '[{"id":"A","text":"Interpret psychological diagnosis and prescribe developmental therapies","isCorrect":false,"explanation":"RBTs do not formulate diagnoses or prescribe medical treatment."},{"id":"B","text":"Teach the skills immediately by providing full physical hand-over-hand assistance","isCorrect":false,"explanation":"Providing assistance invalidates baseline measurement of independent skill levels."},{"id":"C","text":"Modify the assessment criteria whenever the learner becomes frustrated","isCorrect":false,"explanation":"Assessment criteria must remain standardized and cannot be altered independently by an RBT."},{"id":"D","text":"Probe baseline skills without prompting and record learner responses accurately","isCorrect":true,"explanation":"RBTs assist by probing target skills objectively according to the assessment protocol."}]', 'D', 'When assisting with skill assessments, RBTs probe independent responses without teaching prompts to establish a true baseline of learner competency.',
        'BACB TCO Item B.2: Baseline skill probes provide the BCBA with accurate data to design tailored curriculum milestones.', 'BACB RBT 3rd Edition TCO Item B.2', NULL, NULL, 'Behavior Assessment',
        'Skill Assessment - Baseline Probing', '["Behavior Assessment","Skill Assessment - Baseline Probing","B.2"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-b02-2', 'q-b02-2', 'RBT', 'An RBT is asked to assist with assessing peer play skills in a clinic preschool room. How should the RBT participate?', 'The BCBA provides a standardized social interaction checklist.',
        'scenario_based', 'medium', '[{"id":"A","text":"Collect objective observational data on peer proximity, sharing, and verbal initiations as directed","isCorrect":true,"explanation":"Observing and recording defined social behaviors under supervisor guidance is the core RBT role."},{"id":"B","text":"Force the peer to play with the client regardless of peer consent","isCorrect":false,"explanation":"Forcing interaction violates ethical dignity guidelines."},{"id":"C","text":"Diagnose the peer with communication deficits","isCorrect":false,"explanation":"RBTs do not evaluate or diagnose non-client peers."},{"id":"D","text":"Replace the client''s behavioral plan with an unapproved social game","isCorrect":false,"explanation":"RBTs must adhere strictly to approved BCBA behavior protocols."}]', 'A', 'RBTs assist with developmental and social assessments by collecting objective behavioral observations designated by their supervisor.',
        'BACB TCO Item B.2: Participating in developmental assessments ensures multi-setting clinical validity.', 'BACB RBT 3rd Edition TCO Item B.2', NULL, NULL, 'Behavior Assessment',
        'Skill Assessment - Social Skills', '["Behavior Assessment","Skill Assessment - Social Skills","B.2"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-b03-1', 'q-b03-1', 'RBT', 'An RBT records what occurs immediately before a tantrum (teacher asks student to write name), the behavior (child throws pencil and screams), and what occurs immediately after (teacher removes worksheet). What assessment procedure is this?', 'This 3-term contingency logging is performed throughout the day.',
        'scenario_based', 'medium', '[{"id":"A","text":"Experimental Functional Analysis","isCorrect":false,"explanation":"Functional analysis requires systematic experimental manipulation of environmental contingencies."},{"id":"B","text":"ABC (Antecedent-Behavior-Consequence) Data Collection","isCorrect":true,"explanation":"ABC recording documents events immediately preceding and following behavior during descriptive assessment."},{"id":"C","text":"Trial-by-Trial Reinforcement Schedule","isCorrect":false,"explanation":"This is an instructional procedure, not a functional assessment log."},{"id":"D","text":"Preference Assessment","isCorrect":false,"explanation":"Preference assessments identify reinforcers, not antecedents and consequences."}]', 'B', 'ABC data collection records the antecedent event preceding behavior and the consequence following it to identify potential maintaining variables.',
        'BACB TCO Item B.3: ABC narrative and structured recording are standard descriptive functional assessment methods.', 'BACB RBT 3rd Edition TCO Item B.3', NULL, NULL, 'Behavior Assessment',
        'Functional Assessment - ABC Data', '["Behavior Assessment","Functional Assessment - ABC Data","B.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-b03-2', 'q-b03-2', 'RBT', 'During descriptive functional assessments, why is it critical that an RBT avoids writing assumptions like ''client wanted to annoy staff'' in the consequence column?', 'An RBT is recording ABC data during a challenging session.',
        'scenario_based', 'medium', '[{"id":"A","text":"Because the client can read the clipboard and might feel offended","isCorrect":false,"explanation":"Client clipboard visibility does not define behavior-analytic operational standards."},{"id":"B","text":"Because annoy staff is technically a DSM-5 clinical condition","isCorrect":false,"explanation":"Annoy staff is not a psychiatric condition."},{"id":"C","text":"Because consequences must record observable environmental actions, such as staff attention, item delivery, or task removal","isCorrect":true,"explanation":"Descriptive data must document physical events to help BCBAs identify the environmental function."},{"id":"D","text":"Because RBTs are only allowed to write one word per note","isCorrect":false,"explanation":"Documentation length must be complete and informative."}]', 'C', 'Consequences in ABC data must describe concrete environmental events (e.g., verbal reprimand, iPad removed) rather than internal motives.',
        'BACB TCO Item B.3: Clear consequence descriptions reveal whether behaviors produce social attention, tangible access, or escape.', 'BACB RBT 3rd Edition TCO Item B.3', NULL, NULL, 'Behavior Assessment',
        'Functional Assessment - Objective Consequences', '["Behavior Assessment","Functional Assessment - Objective Consequences","B.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-b03-3', 'q-b03-3', 'RBT', 'Can an RBT independently design and conduct an analogue Functional Analysis (FA) involving systematically triggering severe self-injury?', 'A parent asks the RBT to test whether loud noises make the client hit themselves.',
        'scenario_based', 'medium', '[{"id":"A","text":"Yes, as long as the RBT has worked with the client for at least 1 month","isCorrect":false,"explanation":"RBTs are never permitted to design or independently conduct functional analyses."},{"id":"B","text":"Yes, if the parent signs a paper waiver","isCorrect":false,"explanation":"Parent waivers do not override BACB scope of practice boundaries."},{"id":"C","text":"Yes, provided the RBT uses a padded helmet","isCorrect":false,"explanation":"Protective equipment does not grant clinical license to conduct experimental analyses."},{"id":"D","text":"No, functional analyses involve experimental risk and must be designed and directly supervised by a qualified BCBA","isCorrect":true,"explanation":"FA procedures require advanced behavioral expertise to ensure safety and clinical validity."}]', 'D', 'RBTs may assist with functional analysis procedures only under the direct direction and supervision of a BCBA; they cannot conduct them independently.',
        'BACB TCO Item B.3: Experimental functional analysis requires advanced clinical training and ethical risk analysis.', 'BACB RBT 3rd Edition TCO Item B.3', NULL, NULL, 'Behavior Assessment',
        'Functional Analysis Role Boundaries', '["Behavior Assessment","Functional Analysis Role Boundaries","B.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c01-1', 'q-c01-1', 'RBT', 'Immediately following a child handing a picture card to request a cracker, the RBT provides a cracker, and cracker requesting increases in the future. What principle has been applied?', 'The RBT delivers the requested item within 2 seconds of the communication response.',
        'scenario_based', 'medium', '[{"id":"A","text":"Positive Reinforcement","isCorrect":true,"explanation":"Positive reinforcement involves presenting a stimulus immediately after a response that increases the future probability of that response."},{"id":"B","text":"Negative Reinforcement","isCorrect":false,"explanation":"Negative reinforcement involves removing an aversive stimulus to increase behavior."},{"id":"C","text":"Positive Punishment","isCorrect":false,"explanation":"Positive punishment presents an aversive stimulus to decrease behavior."},{"id":"D","text":"Stimulus Fading","isCorrect":false,"explanation":"Stimulus fading is an antecedent modification technique."}]', 'A', 'Positive reinforcement occurs when a stimulus is added contingently following a behavior, resulting in an increased future frequency of that behavior.',
        'BACB TCO Item C.1: Immediate and contingent reinforcement delivery is essential for effective behavior acquisition.', 'BACB RBT 3rd Edition TCO Item C.1', NULL, NULL, 'Behavior Acquisition',
        'Positive Reinforcement', '["Behavior Acquisition","Positive Reinforcement","C.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c01-2', 'q-c01-2', 'RBT', 'When a student feels a headache from loud classroom chatter, putting on noise-cancelling headphones removes the unpleasant sound, and headphone wearing increases during loud periods. What is this?', 'The noise stops immediately when headphones are placed over the ears.',
        'scenario_based', 'medium', '[{"id":"A","text":"Positive Punishment","isCorrect":false,"explanation":"Positive punishment adds an aversive stimulus to reduce behavior."},{"id":"B","text":"Negative Reinforcement","isCorrect":true,"explanation":"Negative reinforcement occurs when the removal or termination of an aversive stimulus strengthens a behavior."},{"id":"C","text":"Negative Punishment","isCorrect":false,"explanation":"Negative punishment removes a preferred item to decrease behavior."},{"id":"D","text":"Extinction","isCorrect":false,"explanation":"Extinction withholds reinforcement for previously reinforced behavior."}]', 'B', 'Negative reinforcement increases behavior frequency through the contingent removal, termination, or reduction of an aversive stimulus.',
        'BACB TCO Item C.1: Understanding negative reinforcement is vital for identifying functional escape behaviors and designing replacement skills.', 'BACB RBT 3rd Edition TCO Item C.1', NULL, NULL, 'Behavior Acquisition',
        'Negative Reinforcement', '["Behavior Acquisition","Negative Reinforcement","C.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c01-3', 'q-c01-3', 'RBT', 'An RBT delivers reinforcement after an average of every 5 independent vocal responses (e.g., after 3, then 7, then 5). Which schedule of reinforcement is in effect?', 'The learner does not know exactly which trial will yield the reinforcer, producing steady, high response rates.',
        'scenario_based', 'medium', '[{"id":"A","text":"Fixed Ratio 5 (FR5)","isCorrect":false,"explanation":"FR5 reinforces strictly after every 5th response, not on a variable average."},{"id":"B","text":"Fixed Interval 5 (FI5)","isCorrect":false,"explanation":"FI5 reinforces the first response after 5 minutes has elapsed."},{"id":"C","text":"Variable Ratio 5 (VR5)","isCorrect":true,"explanation":"VR5 delivers reinforcement after an average number of responses, creating high, consistent responding with minimal pauses."},{"id":"D","text":"Continuous Reinforcement (CRF)","isCorrect":false,"explanation":"CRF delivers reinforcement after every single response."}]', 'C', 'A Variable Ratio (VR) schedule delivers reinforcement after an unpredictable, variable number of responses centered around an average value.',
        'BACB TCO Item C.1: VR schedules produce the highest and most steady rates of responding and are highly resistant to extinction.', 'BACB RBT 3rd Edition TCO Item C.1', NULL, NULL, 'Behavior Acquisition',
        'Schedules of Reinforcement - VR', '["Behavior Acquisition","Schedules of Reinforcement - VR","C.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c02-1', 'q-c02-1', 'RBT', 'How does an RBT establish a neutral stimulus (such as verbal praise or a token) as a conditioned reinforcer?', 'A child initially does not care about praise or stickers, caring only for potato chips.',
        'scenario_based', 'medium', '[{"id":"A","text":"By withholding all food reinforcers until the child complies with praise","isCorrect":false,"explanation":"Depriving clients of basic biological needs violates ethical codes."},{"id":"B","text":"By punishing the child when they do not smile after hearing praise","isCorrect":false,"explanation":"Punishment cannot establish conditioned reinforcement."},{"id":"C","text":"By asking the parent to explain the definition of praise to the child","isCorrect":false,"explanation":"Verbal rule explanations are ineffective without stimulus pairing in early learners."},{"id":"D","text":"By systematically pairing the neutral stimulus with established unconditioned or backup reinforcers","isCorrect":true,"explanation":"Stimulus-stimulus pairing allows neutral stimuli to acquire reinforcing value through association."}]', 'D', 'Conditioned reinforcers are established when a neutral stimulus is repeatedly paired with established primary (unconditioned) or secondary reinforcers.',
        'BACB TCO Item C.2: Pairing praise and social attention with preferred tangibles is fundamental for expanding naturalistic reinforcers.', 'BACB RBT 3rd Edition TCO Item C.2', NULL, NULL, 'Behavior Acquisition',
        'Conditioned Reinforcers - Pairing', '["Behavior Acquisition","Conditioned Reinforcers - Pairing","C.2"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c03-1', 'q-c03-1', 'RBT', 'What are the essential sequential components of a single Discrete Trial Teaching (DTT) trial?', 'An RBT sits across from a learner at a therapy table conducting structured language trials.',
        'scenario_based', 'medium', '[{"id":"A","text":"Antecedent (SD) -> Prompt (if needed) -> Learner Response -> Consequence -> Inter-Trial Interval (ITI)","isCorrect":true,"explanation":"This represents the exact 5-step operational anatomy of a discrete trial."},{"id":"B","text":"Data entry -> Parent update -> Client break -> Goal revision","isCorrect":false,"explanation":"These are administrative and planning steps, not the trial anatomy."},{"id":"C","text":"Reinforcement -> Punishment -> Extinction -> Generalization","isCorrect":false,"explanation":"These are behavioral principles, not the discrete trial sequence."},{"id":"D","text":"Assessment -> Baseline -> Functional Analysis -> Graphing","isCorrect":false,"explanation":"These are assessment stages, not trial components."}]', 'A', 'A discrete trial consists of: 1) Discriminative Stimulus (SD), 2) Prompt, 3) Response, 4) Consequence, and 5) Inter-Trial Interval.',
        'BACB TCO Item C.3: Crisp presentation of the SD and an appropriate inter-trial interval prevent trial blurring.', 'BACB RBT 3rd Edition TCO Item C.3', NULL, NULL, 'Behavior Acquisition',
        'DTT - Trial Structure', '["Behavior Acquisition","DTT - Trial Structure","C.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c03-2', 'q-c03-2', 'RBT', 'What is the primary characteristic of the Inter-Trial Interval (ITI) in discrete trial training?', 'An RBT pauses after delivering praise before presenting the next stimulus card.',
        'scenario_based', 'medium', '[{"id":"A","text":"It must last at least 15 minutes to allow the child to take a full nap","isCorrect":false,"explanation":"A 15-minute gap disrupts instructional momentum."},{"id":"B","text":"It should be a brief pause of approximately 1 to 5 seconds to record data and clearly separate trials","isCorrect":true,"explanation":"A brief ITI allows data logging while preventing fatigue and keeping the learner engaged."},{"id":"C","text":"It should only occur if the client answered incorrectly","isCorrect":false,"explanation":"ITIs occur after every trial regardless of correctness."},{"id":"D","text":"It requires the RBT to leave the therapy room completely","isCorrect":false,"explanation":"Therapists remain present to manage table stimuli."}]', 'B', 'The Inter-Trial Interval is the brief period (typically 1-5 seconds) between consequence delivery and the next trial SD, used for data entry.',
        'BACB TCO Item C.3: Consistent ITI timing maintains clear trial boundaries.', 'BACB RBT 3rd Edition TCO Item C.3', NULL, NULL, 'Behavior Acquisition',
        'DTT - Inter-Trial Interval', '["Behavior Acquisition","DTT - Inter-Trial Interval","C.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c04-1', 'q-c04-1', 'RBT', 'An RBT observes a child reaching for bubbles placed on a high shelf. Instead of immediately handing over the bubbles, the RBT models the word ''Bubbles!'' and waits for an echoic mand. What procedure is being used?', 'The learning opportunity is embedded directly in the child''s natural play interest.',
        'scenario_based', 'medium', '[{"id":"A","text":"Discrete Trial Teaching at the table","isCorrect":false,"explanation":"This is embedded in spontaneous play rather than structured table trials."},{"id":"B","text":"Backward Chaining with Total Task","isCorrect":false,"explanation":"Chaining teaches multi-step tasks, not single mand trials in play."},{"id":"C","text":"Naturalistic Teaching (Incidental Teaching)","isCorrect":true,"explanation":"Incidental teaching capitalizes on child motivation within the natural environment to teach target skills."},{"id":"D","text":"Extinction Procedure","isCorrect":false,"explanation":"Extinction withholds reinforcement; here reinforcement was delivered after the target mand."}]', 'C', 'Incidental teaching (a naturalistic procedure) utilizes child-initiated interactions and current establishing operations to prompt target skills.',
        'BACB TCO Item C.4: NET fosters spontaneous communication and reduces prompt dependency.', 'BACB RBT 3rd Edition TCO Item C.4', NULL, NULL, 'Behavior Acquisition',
        'Naturalistic Teaching - NET', '["Behavior Acquisition","Naturalistic Teaching - NET","C.4"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c05-1', 'q-c05-1', 'RBT', 'An RBT teaches a 5-step handwashing sequence by reinforcing independent completion of Step 1 (turning on water) while prompting all remaining steps. Once Step 1 is mastered, the RBT teaches Step 2. What chaining procedure is this?', 'Teaching proceeds in the chronological sequence of the task analysis from start to finish.',
        'scenario_based', 'medium', '[{"id":"A","text":"Backward Chaining","isCorrect":false,"explanation":"Backward chaining teaches the final step first."},{"id":"B","text":"Total Task Chaining","isCorrect":false,"explanation":"Total task prompts every step during every trial."},{"id":"C","text":"Shaping","isCorrect":false,"explanation":"Shaping reinforces successive approximations of a single topography, not a chain of distinct behaviors."},{"id":"D","text":"Forward Chaining","isCorrect":true,"explanation":"Forward chaining reinforces the first step of the chain first, then requires step 1 and 2, moving chronologically forward."}]', 'D', 'Forward chaining teaches behaviors in their chronological order, requiring mastery of initial steps before adding subsequent links.',
        'BACB TCO Item C.5: Forward chaining is helpful for learners who easily learn starting steps or tasks with clear beginning cues.', 'BACB RBT 3rd Edition TCO Item C.5', NULL, NULL, 'Behavior Acquisition',
        'Chaining - Forward', '["Behavior Acquisition","Chaining - Forward","C.5"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c05-2', 'q-c05-2', 'RBT', 'When teaching a client to put on a jacket, the RBT completes steps 1 through 4 (arms in sleeves, collar up) and prompts the child only on Step 5 (zipping up), immediately delivering enthusiastic reinforcement. What is this?', 'The learner experiences the natural terminal reinforcer immediately upon completing the final step.',
        'scenario_based', 'medium', '[{"id":"A","text":"Backward Chaining","isCorrect":true,"explanation":"Backward chaining completes initial steps for the client and reinforces independent completion of the final step first."},{"id":"B","text":"Forward Chaining","isCorrect":false,"explanation":"Forward chaining starts with the first step."},{"id":"C","text":"Errorless Discrimination","isCorrect":false,"explanation":"This is chaining a multi-step motor response, not stimulus discrimination."},{"id":"D","text":"Free Operant Assessment","isCorrect":false,"explanation":"Free operant is a preference measurement tool."}]', 'A', 'Backward chaining prompts all initial steps and teaches the final step first, ensuring immediate access to the terminal reinforcer.',
        'BACB TCO Item C.5: Backward chaining is especially powerful for clients who benefit from quick reinforcement contact.', 'BACB RBT 3rd Edition TCO Item C.5', NULL, NULL, 'Behavior Acquisition',
        'Chaining - Backward', '["Behavior Acquisition","Chaining - Backward","C.5"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c06-1', 'q-c06-1', 'RBT', 'An RBT places a picture of a dog (SD) and a picture of a cat (S-delta) on the table and says, ''Touch dog.'' When the child touches the dog, the RBT provides a sticker. When the child touches the cat, the RBT provides no reinforcement. What procedure is this?', 'Through differential reinforcement, the child learns to respond only to the designated stimulus.',
        'scenario_based', 'medium', '[{"id":"A","text":"Generalization Training","isCorrect":false,"explanation":"Generalization promotes responding across diverse untaught stimuli."},{"id":"B","text":"Discrimination Training","isCorrect":true,"explanation":"Discrimination training reinforces responses in the presence of the SD while withholding reinforcement in the presence of S-delta stimuli."},{"id":"C","text":"Non-contingent Reinforcement","isCorrect":false,"explanation":"NCR delivers reinforcement on a time-based schedule without response requirements."},{"id":"D","text":"Task Analysis","isCorrect":false,"explanation":"Task analysis breaks complex tasks into behavioral chains."}]', 'B', 'Stimulus discrimination training involves reinforcing a behavior in the presence of one stimulus (SD) and not in the presence of others (S-delta).',
        'BACB TCO Item C.6: Discrimination training is fundamental for receptive language, reading, and object identification.', 'BACB RBT 3rd Edition TCO Item C.6', NULL, NULL, 'Behavior Acquisition',
        'Discrimination Training', '["Behavior Acquisition","Discrimination Training","C.6"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c07-1', 'q-c07-1', 'RBT', 'An RBT begins a new cutting-with-scissors program by providing Full Physical hand-over-hand guidance. Over successive trials, the RBT fades to Partial Physical, then Modeling, and finally Gestural pointing. What prompt hierarchy is being implemented?', 'The prompt intensity decreases as the learner demonstrates mastery.',
        'scenario_based', 'medium', '[{"id":"A","text":"Least-to-Most Prompting","isCorrect":false,"explanation":"Least-to-most starts with independent opportunity and increases prompt level only if errors occur."},{"id":"B","text":"Stimulus Shaping","isCorrect":false,"explanation":"Stimulus shaping alters the physical dimensions of the antecedent stimulus."},{"id":"C","text":"Most-to-Least (MTL) Prompting","isCorrect":true,"explanation":"Most-to-least begins with the highest level of assistance and systematically fades to less intrusive prompts."},{"id":"D","text":"Spontaneous Recovery","isCorrect":false,"explanation":"Spontaneous recovery is the reappearance of an extinguished behavior."}]', 'C', 'Most-to-Least prompting begins with maximum assistance to ensure correct responding and gradually fades intrusive support to promote independence.',
        'BACB TCO Item C.7: Most-to-least is commonly used in errorless learning when introducing novel or complex motor skills.', 'BACB RBT 3rd Edition TCO Item C.7', NULL, NULL, 'Behavior Acquisition',
        'Prompting - Most-to-Least', '["Behavior Acquisition","Prompting - Most-to-Least","C.7"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c07-2', 'q-c07-2', 'RBT', 'When teaching a client to name flashcards, the RBT initially presents the card and immediately states the word (0-second delay). Across subsequent sessions, the RBT waits 3 seconds before providing the verbal prompt. What fading procedure is this?', 'The delay provides the learner a window of opportunity to respond independently before the prompt is delivered.',
        'scenario_based', 'medium', '[{"id":"A","text":"Graduated Guidance","isCorrect":false,"explanation":"Graduated guidance adjusts physical guidance moment-by-moment during motor tasks."},{"id":"B","text":"Stimulus Fading","isCorrect":false,"explanation":"Stimulus fading alters the physical size, color, or shape of the stimulus."},{"id":"C","text":"Overcorrection","isCorrect":false,"explanation":"Overcorrection is a punishment procedure."},{"id":"D","text":"Constant or Progressive Time Delay","isCorrect":true,"explanation":"Time delay inserts a systematic temporal interval between the SD and prompt presentation."}]', 'D', 'Time delay systematically increases the elapsed time between the presentation of the SD and the delivery of the prompt.',
        'BACB TCO Item C.7: Time delay transfers stimulus control from the prompt to the natural SD.', 'BACB RBT 3rd Edition TCO Item C.7', NULL, NULL, 'Behavior Acquisition',
        'Prompting - Time Delay', '["Behavior Acquisition","Prompting - Time Delay","C.7"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c08-1', 'q-c08-1', 'RBT', 'A client learns to label a cartoon picture of a car in the clinic. To ensure stimulus generalization, what should the RBT do?', 'The client must recognize cars in real life and across various visual representations.',
        'scenario_based', 'medium', '[{"id":"A","text":"Present photographs of sedans, trucks, toy cars, and actual vehicles parked in the parking lot","isCorrect":true,"explanation":"Teaching across multiple exemplars and diverse stimulus variants ensures true stimulus generalization."},{"id":"B","text":"Test the child exclusively using the exact same cartoon card for the rest of the year","isCorrect":false,"explanation":"Using only one card prevents stimulus generalization."},{"id":"C","text":"Discontinue all car programs immediately without testing","isCorrect":false,"explanation":"Discontinuing without verification risks skill loss."},{"id":"D","text":"Only allow the child to say ''car'' when at home","isCorrect":false,"explanation":"Restricting settings restricts generalization."}]', 'A', 'Stimulus generalization occurs when a response is emitted in the presence of stimuli that share characteristics with the training stimulus.',
        'BACB TCO Item C.8: Training with multiple exemplars ensures functional skill application in natural environments.', 'BACB RBT 3rd Edition TCO Item C.8', NULL, NULL, 'Behavior Acquisition',
        'Generalization Across Stimuli', '["Behavior Acquisition","Generalization Across Stimuli","C.8"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c08-2', 'q-c08-2', 'RBT', 'A learner responds to greetings (''Hi!'') only when the primary RBT enters the room, but remains silent when parents or teachers say hello. What generalization deficit is present?', 'The response is under narrow stimulus control of a single person.',
        'scenario_based', 'medium', '[{"id":"A","text":"Setting generalization deficit","isCorrect":false,"explanation":"The issue relates to people, not physical environments."},{"id":"B","text":"Generalization across people (instructors/peers)","isCorrect":true,"explanation":"The learner fails to emit the mastered social response across different individuals."},{"id":"C","text":"Response generalization deficit","isCorrect":false,"explanation":"Response generalization involves emitting different topographies of behavior."},{"id":"D","text":"Overgeneralization","isCorrect":false,"explanation":"Overgeneralization occurs when behavior is emitted in inappropriate stimulus contexts."}]', 'B', 'Generalization across people requires that the learner demonstrates the target behavior across multiple therapists, parents, and community members.',
        'BACB TCO Item C.8: Involving parents and peers during acquisition prevents single-therapist prompt dependency.', 'BACB RBT 3rd Edition TCO Item C.8', NULL, NULL, 'Behavior Acquisition',
        'Generalization Across People', '["Behavior Acquisition","Generalization Across People","C.8"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c09-1', 'q-c09-1', 'RBT', 'What is the primary difference between a skill acquisition procedure and a skill maintenance procedure?', 'An RBT reviews mastered programs during weekly sessions.',
        'scenario_based', 'medium', '[{"id":"A","text":"Acquisition uses food, while maintenance only uses physical restraint","isCorrect":false,"explanation":"Restraint is never a maintenance procedure."},{"id":"B","text":"Maintenance is conducted only by parents, never by RBTs","isCorrect":false,"explanation":"RBTs systematically run maintenance probes during sessions."},{"id":"C","text":"Acquisition focuses on teaching a novel skill through frequent reinforcement; maintenance checks and reinforces previously mastered skills intermittently over time","isCorrect":true,"explanation":"Acquisition targets novel behaviors with rich schedules; maintenance preserves mastered repertoires using thin schedules."},{"id":"D","text":"There is no difference; once a skill is mastered it never needs to be practiced again","isCorrect":false,"explanation":"Without maintenance programming, mastered skills frequently deteriorate."}]', 'C', 'Acquisition procedures teach new, unmastered skills, whereas maintenance procedures periodically probe and reinforce already mastered skills.',
        'BACB TCO Item C.9: Regular maintenance probes prevent skill regression.', 'BACB RBT 3rd Edition TCO Item C.9', NULL, NULL, 'Behavior Acquisition',
        'Maintenance', '["Behavior Acquisition","Maintenance","C.9"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c10-1', 'q-c10-1', 'RBT', 'When teaching a non-verbal child to say ''Ball'', an RBT first reinforces ''Buh''. Once ''Buh'' is consistent, the RBT only reinforces ''Bah''. Finally, reinforcement is provided only for ''Ball''. What procedure is being implemented?', 'The RBT reinforces successive approximations while placing previous approximations on extinction.',
        'scenario_based', 'medium', '[{"id":"A","text":"Task Analysis","isCorrect":false,"explanation":"Task analysis breaks chains into steps, while shaping modifies a single behavior''s topography."},{"id":"B","text":"Backward Chaining","isCorrect":false,"explanation":"Chaining links distinct behavioral responses together."},{"id":"C","text":"Non-contingent Reinforcement","isCorrect":false,"explanation":"NCR delivers reinforcement on time, not contingent on closer approximations."},{"id":"D","text":"Shaping","isCorrect":true,"explanation":"Shaping differentially reinforces successive approximations toward a terminal target behavior."}]', 'D', 'Shaping is the differential reinforcement of successive approximations to a desired terminal behavior while extinguishing earlier steps.',
        'BACB TCO Item C.10: Shaping is ideal for teaching novel vocal sounds, fine motor grips, or exercise duration.', 'BACB RBT 3rd Edition TCO Item C.10', NULL, NULL, 'Behavior Acquisition',
        'Shaping', '["Behavior Acquisition","Shaping","C.10"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c11-1', 'q-c11-1', 'RBT', 'In a token economy system, what is the role of the tokens earned by the client?', 'A student earns plastic stars for completing math worksheets, which are later exchanged for 10 minutes of iPad time.',
        'scenario_based', 'medium', '[{"id":"A","text":"Tokens function as conditioned generalized reinforcers that can be exchanged for backup reinforcers","isCorrect":true,"explanation":"Tokens have acquired value because they are paired with and exchangeable for diverse backup items."},{"id":"B","text":"Tokens are unconditioned primary reinforcers necessary for biological survival","isCorrect":false,"explanation":"Primary reinforcers are biological (food, water), not plastic tokens."},{"id":"C","text":"Tokens are antecedents that force compliance through physical intimidation","isCorrect":false,"explanation":"Tokens are positive conditioned consequence reinforcers."},{"id":"D","text":"Tokens must be permanently confiscated if the student blinks","isCorrect":false,"explanation":"Arbitrary confiscation violates behavior plan guidelines."}]', 'A', 'Tokens serve as conditioned generalized reinforcers that bridge the delay between behavior and the exchange for backup reinforcers.',
        'BACB TCO Item C.11: Token economies teach delayed gratification and provide portable reinforcement across settings.', 'BACB RBT 3rd Edition TCO Item C.11', NULL, NULL, 'Behavior Acquisition',
        'Token Economy', '["Behavior Acquisition","Token Economy","C.11"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c11-2', 'q-c11-2', 'RBT', 'If a client earns 5 tokens on a token board but the RBT has no preferred backup reinforcers available for exchange, what is the expected clinical consequence?', 'The token board was filled, but the toy chest is locked and empty.',
        'scenario_based', 'medium', '[{"id":"A","text":"The tokens will maintain their reinforcing power forever without backup items","isCorrect":false,"explanation":"Conditioned reinforcers lose their effectiveness if not backed up by valuable stimuli."},{"id":"B","text":"The tokens will lose their reinforcing value over time through extinction of the conditioned relation","isCorrect":true,"explanation":"Without backup exchange pairing, tokens lose their motivating properties."},{"id":"C","text":"The client will automatically become a BCBA","isCorrect":false,"explanation":"This is nonsensical."},{"id":"D","text":"The RBT should fabricate replacement money","isCorrect":false,"explanation":"Token systems require planned, accessible backup rewards."}]', 'B', 'Tokens only retain conditioned reinforcing efficacy when they can be reliably exchanged for meaningful backup reinforcers.',
        'BACB TCO Item C.11: Ensuring backup reinforcers align with current establishing operations is vital.', 'BACB RBT 3rd Edition TCO Item C.11', NULL, NULL, 'Behavior Acquisition',
        'Token Economy - Backups', '["Behavior Acquisition","Token Economy - Backups","C.11"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c01-4', 'q-c01-4', 'RBT', 'When is a Continuous Reinforcement (CRF / FR1) schedule most appropriately utilized in ABA programming?', 'An RBT is starting an entirely new hand-signing program with a 4-year-old.',
        'scenario_based', 'medium', '[{"id":"A","text":"During the maintenance phase to prevent extinction","isCorrect":false,"explanation":"Intermittent schedules (VR/VI) are used for maintenance, not CRF."},{"id":"B","text":"Only when punishing target problem behavior","isCorrect":false,"explanation":"CRF is a reinforcement schedule, not a punishment protocol."},{"id":"C","text":"During the initial acquisition phase of teaching a novel behavior","isCorrect":true,"explanation":"CRF reinforces every single correct response, which is crucial when first establishing a new skill."},{"id":"D","text":"During standardized baseline testing probes","isCorrect":false,"explanation":"Reinforcement is withheld during baseline probes."}]', 'C', 'Continuous reinforcement (FR1) is optimal during the initial acquisition of novel skills to strengthen the stimulus-response association rapidly.',
        'BACB TCO Item C.1: Once acquisition is demonstrated, technicians fade to intermittent schedules.', 'BACB RBT 3rd Edition TCO Item C.1', NULL, NULL, 'Behavior Acquisition',
        'Continuous Reinforcement', '["Behavior Acquisition","Continuous Reinforcement","C.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c07-3', 'q-c07-3', 'RBT', 'An RBT teaches sight word reading by initially highlighting the word ''CAT'' in bold red font while distractor words are pale gray. Across sessions, the red highlighting is gradually lightened until all words appear in identical black text. What is this?', 'A physical dimension of the stimulus is systematically altered.',
        'scenario_based', 'medium', '[{"id":"A","text":"Response prompt fading","isCorrect":false,"explanation":"Response prompt fading alters therapist assistance (e.g., hand-over-hand), not the stimulus itself."},{"id":"B","text":"Extinction Burst","isCorrect":false,"explanation":"Extinction burst is a behavior reduction phenomenon."},{"id":"C","text":"Differential Reinforcement of Incompatible Behavior","isCorrect":false,"explanation":"DRI reinforces physically incompatible alternative behavior."},{"id":"D","text":"Stimulus Fading","isCorrect":true,"explanation":"Stimulus fading systematically alters an exaggerated physical feature of the stimulus to transfer control to the natural stimulus."}]', 'D', 'Stimulus fading involves systematically modifying a physical dimension (size, color, intensity) of the stimulus to transfer control to the natural SD.',
        'BACB TCO Item C.7: Stimulus fading is an effective antecedent technique for teaching academic discriminations.', 'BACB RBT 3rd Edition TCO Item C.7', NULL, NULL, 'Behavior Acquisition',
        'Prompt Fading - Stimulus Fading', '["Behavior Acquisition","Prompt Fading - Stimulus Fading","C.7"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c04-2', 'q-c04-2', 'RBT', 'What is the primary defining characteristic of a mand in Verbal Behavior?', 'A child says ''Juice'' because they are thirsty and have been without fluids for 2 hours.',
        'scenario_based', 'medium', '[{"id":"A","text":"It is evoked by an establishing operation (EO) of deprivation and maintained by access to the specific requested reinforcer","isCorrect":true,"explanation":"A mand is the only verbal operant that directly benefits the speaker by obtaining the specific item requested under an active EO."},{"id":"B","text":"It is evoked by seeing an object and reinforced by generic praise","isCorrect":false,"explanation":"Labeling an object seen is a tact, not a mand."},{"id":"C","text":"It has point-to-point correspondence with a spoken model","isCorrect":false,"explanation":"Repeating what is heard is an echoic."},{"id":"D","text":"It occurs only during written spelling tests","isCorrect":false,"explanation":"Mands can be spoken, signed, gestural, or pictorial."}]', 'A', 'A mand is a verbal operant evoked by a motivating operation (deprivation/satiation) and followed by the specific item or event requested.',
        'BACB TCO Item C.4: Functional mand training is the top priority for non-verbal learners with challenging behavior.', 'BACB RBT 3rd Edition TCO Item C.4', NULL, NULL, 'Behavior Acquisition',
        'Mand Training', '["Behavior Acquisition","Mand Training","C.4"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-c03-3', 'q-c03-3', 'RBT', 'During a discrete trial, an RBT presents the SD ''Touch blue''. The learner touches the red card instead. According to standard DTT error correction protocols, what should the RBT do?', 'The learner made an incorrect motor selection during an expressive identification trial.',
        'scenario_based', 'medium', '[{"id":"A","text":"Scold the learner and remove their lunch for the rest of the day","isCorrect":false,"explanation":"Verbal abuse and food deprivation violate ethical and procedural standards."},{"id":"B","text":"Withhold reinforcement, immediately prompt the correct response (e.g., model or physical prompt), and re-present the trial for independent responding","isCorrect":true,"explanation":"Standard error correction interrupts errors, provides an immediate corrective prompt, and re-presents the SD."},{"id":"C","text":"Praise the learner enthusiastically and deliver candy anyway","isCorrect":false,"explanation":"Reinforcing incorrect responses strengthens errors."},{"id":"D","text":"Tell the learner to sit in the hallway for 4 hours","isCorrect":false,"explanation":"Excessive isolation is an unapproved, harmful punishment."}]', 'B', 'Standard DTT error correction involves withholding reinforcement, providing an immediate prompt to demonstrate the correct response, and re-presenting the SD to ensure a correct transfer trial.',
        'BACB TCO Item C.3: Clean error correction prevents error patterns from becoming habitual.', 'BACB RBT 3rd Edition TCO Item C.3', NULL, NULL, 'Behavior Acquisition',
        'DTT - Error Correction', '["Behavior Acquisition","DTT - Error Correction","C.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d01-1', 'q-d01-1', 'RBT', 'Every time an RBT presents a math worksheet, the client screams and flips the table, after which the client is sent to the quiet corner for 10 minutes. The behavior continues to occur. What is the likely function of this behavior?', 'Table-flipping consistently results in the removal of the academic task demand.',
        'scenario_based', 'medium', '[{"id":"A","text":"Attention","isCorrect":false,"explanation":"The behavior does not primarily seek social interaction; it removes the task."},{"id":"B","text":"Access to Tangibles","isCorrect":false,"explanation":"The child is not gaining a toy or edible item."},{"id":"C","text":"Escape / Avoidance","isCorrect":true,"explanation":"The behavior is maintained by the removal of the aversive academic task demand (socially mediated negative reinforcement)."},{"id":"D","text":"Automatic Reinforcement","isCorrect":false,"explanation":"The behavior is dependent on the presentation and removal of the social task demand, not internal stimulation."}]', 'C', 'Behaviors maintained by escape or avoidance serve to delay, terminate, or reduce the intensity of an aversive stimulus or demand.',
        'BACB TCO Item D.1: Identifying behavior function (SEAT) is the prerequisite for designing functional replacement behaviors.', 'BACB RBT 3rd Edition TCO Item D.1', NULL, NULL, 'Behavior Reduction',
        'Functions of Behavior - Escape', '["Behavior Reduction","Functions of Behavior - Escape","D.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d01-2', 'q-d01-2', 'RBT', 'A learner engages in repetitive body rocking while alone in a dark, empty room without any demands or people present. What is the most probable function?', 'The behavior occurs at high rates across all environments regardless of social consequences.',
        'scenario_based', 'medium', '[{"id":"A","text":"Social Attention","isCorrect":false,"explanation":"No people are present to provide social attention."},{"id":"B","text":"Escape from Demands","isCorrect":false,"explanation":"No demands or tasks are placed in the empty room."},{"id":"C","text":"Access to Edibles","isCorrect":false,"explanation":"No food is delivered contingent upon body rocking."},{"id":"D","text":"Automatic / Sensory Reinforcement","isCorrect":true,"explanation":"Behaviors that produce their own physical or sensory reinforcement independent of social mediation have an automatic function."}]', 'D', 'Automatic reinforcement occurs when the physical sensation produced by the behavior itself serves as the maintaining reinforcer.',
        'BACB TCO Item D.1: Automatic behaviors require sensory-based replacement interventions.', 'BACB RBT 3rd Edition TCO Item D.1', NULL, NULL, 'Behavior Reduction',
        'Functions of Behavior - Automatic', '["Behavior Reduction","Functions of Behavior - Automatic","D.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d02-1', 'q-d02-1', 'RBT', 'A client screams to access attention from the RBT. The BCBA instructs the RBT to provide high-quality verbal attention and enthusiasm every 3 minutes non-contingently, regardless of whether the client screams. What antecedent intervention is this?', 'Attention is delivered on a fixed-time schedule to eliminate the establishing operation for screaming.',
        'scenario_based', 'medium', '[{"id":"A","text":"Non-Contingent Reinforcement (NCR)","isCorrect":true,"explanation":"NCR delivers the maintaining reinforcer on a time-based schedule independent of behavior to abolish motivation for problem behavior."},{"id":"B","text":"Response Blocking","isCorrect":false,"explanation":"Response blocking physically prevents behavior completion."},{"id":"C","text":"Overcorrection","isCorrect":false,"explanation":"Overcorrection is a consequence-based punishment procedure."},{"id":"D","text":"Extinction Burst","isCorrect":false,"explanation":"Extinction burst is an increase in behavior frequency, not an antecedent intervention."}]', 'A', 'Non-Contingent Reinforcement (NCR) is an antecedent strategy that delivers reinforcement on a time-based schedule to reduce the motivating operation for problem behavior.',
        'BACB TCO Item D.2: NCR acts as an abolishing operation (AO), making problem behavior unnecessary.', 'BACB RBT 3rd Edition TCO Item D.2', NULL, NULL, 'Behavior Reduction',
        'Antecedent - NCR', '["Behavior Reduction","Antecedent - NCR","D.2"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d02-2', 'q-d02-2', 'RBT', 'Prior to asking a client to write their name (a low-probability task associated with tantrums), the RBT asks the client to ''Give me five!'', ''Touch your nose!'', and ''Clap your hands!'', praising each compliance rapidly before delivering the writing demand. What is this?', 'Three easy requests precede the difficult instructional request.',
        'scenario_based', 'medium', '[{"id":"A","text":"Functional Communication Training","isCorrect":false,"explanation":"FCT teaches an alternative communication response."},{"id":"B","text":"High-Probability (High-P) Request Sequence / Behavioral Momentum","isCorrect":true,"explanation":"High-P sequences present 2-5 easy tasks with high compliance before presenting the low-P target demand."},{"id":"C","text":"Time-out from Reinforcement","isCorrect":false,"explanation":"Time-out is a negative punishment procedure."},{"id":"D","text":"Task Chaining","isCorrect":false,"explanation":"Task chaining links multi-step behavior sequences."}]', 'B', 'The High-Probability Request Sequence builds behavioral momentum through rapid reinforcement of compliant responses before presenting a low-probability request.',
        'BACB TCO Item D.2: High-P request sequences decrease task resistance and instructional latency.', 'BACB RBT 3rd Edition TCO Item D.2', NULL, NULL, 'Behavior Reduction',
        'Antecedent - High-P Sequence', '["Behavior Reduction","Antecedent - High-P Sequence","D.2"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d03-1', 'q-d03-1', 'RBT', 'A student screams to access the teacher''s attention. Under a new behavior plan, the RBT reinforces the student ONLY when they quietly raise their hand (an alternative behavior), while ignoring all instances of screaming. What procedure is this?', 'Hand-raising serves the same attention function while screaming is extinguished.',
        'scenario_based', 'medium', '[{"id":"A","text":"Differential Reinforcement of Other Behavior (DRO)","isCorrect":false,"explanation":"DRO reinforces the absence of behavior over time, not a specific alternative behavior."},{"id":"B","text":"Differential Reinforcement of Low Rates (DRL)","isCorrect":false,"explanation":"DRL reinforces lower rates of behavior."},{"id":"C","text":"Differential Reinforcement of Alternative Behavior (DRA)","isCorrect":true,"explanation":"DRA reinforces a desirable functional alternative behavior while placing the problem behavior on extinction."},{"id":"D","text":"Response Cost","isCorrect":false,"explanation":"Response cost fines or removes earned tokens."}]', 'C', 'DRA reinforces an appropriate alternative behavior that provides the same or similar reinforcer as the challenging behavior.',
        'BACB TCO Item D.3: DRA is the gold standard for reducing problem behavior while building functional repertoires.', 'BACB RBT 3rd Edition TCO Item D.3', NULL, NULL, 'Behavior Reduction',
        'Differential Reinforcement - DRA', '["Behavior Reduction","Differential Reinforcement - DRA","D.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d03-2', 'q-d03-2', 'RBT', 'An RBT sets a timer for 5 minutes. If a client does NOT engage in skin-picking during the entire 5-minute interval, the RBT delivers praise and a token. If skin-picking occurs at any point, the timer resets. What procedure is this?', 'Reinforcement is contingent on zero occurrences of the target behavior across the interval.',
        'scenario_based', 'medium', '[{"id":"A","text":"Differential Reinforcement of Incompatible Behavior (DRI)","isCorrect":false,"explanation":"DRI requires a specific physically incompatible motor response (e.g., sitting on hands)."},{"id":"B","text":"Functional Communication Training (FCT)","isCorrect":false,"explanation":"FCT requires a specific communication response, not mere omission of behavior."},{"id":"C","text":"Continuous Reinforcement (CRF)","isCorrect":false,"explanation":"CRF reinforces instances of an emitted response, not its omission."},{"id":"D","text":"Differential Reinforcement of Other Behavior (DRO / Zero Responding)","isCorrect":true,"explanation":"DRO delivers reinforcement contingent on the complete absence (zero rate) of the target behavior for a specified duration."}]', 'D', 'Differential Reinforcement of Other Behavior (DRO) provides reinforcement contingent on the non-occurrence of the target behavior throughout a designated time interval.',
        'BACB TCO Item D.3: DRO is effective for rapid behavior suppression, but does not explicitly teach a new replacement skill.', 'BACB RBT 3rd Edition TCO Item D.3', NULL, NULL, 'Behavior Reduction',
        'Differential Reinforcement - DRO', '["Behavior Reduction","Differential Reinforcement - DRO","D.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d03-3', 'q-d03-3', 'RBT', 'To reduce out-of-seat behavior during table work, the RBT provides praise and tokens every 2 minutes that the learner remains seated with feet flat on the floor. Because a student cannot sit and stand simultaneously, what procedure is this?', 'The reinforced behavior cannot physically occur at the same time as the problem behavior.',
        'scenario_based', 'medium', '[{"id":"A","text":"Differential Reinforcement of Incompatible Behavior (DRI)","isCorrect":true,"explanation":"DRI reinforces a behavior that is topographically and physically incompatible with the target problem behavior."},{"id":"B","text":"Differential Reinforcement of Alternative Behavior (DRA)","isCorrect":false,"explanation":"DRA reinforces an alternative behavior that is not necessarily physically impossible to emit simultaneously."},{"id":"C","text":"Negative Reinforcement","isCorrect":false,"explanation":"Negative reinforcement removes an aversive stimulus to increase behavior."},{"id":"D","text":"Extinction Burst","isCorrect":false,"explanation":"Extinction burst is an initial temporary increase in behavior."}]', 'A', 'DRI reinforces a behavior that cannot physically occur at the same time as the targeted problem behavior.',
        'BACB TCO Item D.3: Incompatibility guarantees that emitting the reinforced behavior prevents the occurrence of the problem response.', 'BACB RBT 3rd Edition TCO Item D.3', NULL, NULL, 'Behavior Reduction',
        'Differential Reinforcement - DRI', '["Behavior Reduction","Differential Reinforcement - DRI","D.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d03-4', 'q-d03-4', 'RBT', 'A non-verbal child bites their own wrist when presented with difficult puzzle tasks to escape the demand. The BCBA programs Functional Communication Training (FCT). What response should the RBT prompt and reinforce?', 'The new communication response must serve the same escape function.',
        'scenario_based', 'medium', '[{"id":"A","text":"Sitting quietly with arms crossed for 45 minutes","isCorrect":false,"explanation":"This does not teach communication and is developmentally inappropriate."},{"id":"B","text":"Handing a ''Break Please'' visual icon to the RBT","isCorrect":true,"explanation":"Handing a break card provides an immediate, functional, communicative replacement for escape-maintained behavior."},{"id":"C","text":"Completing 100 math problems without water","isCorrect":false,"explanation":"This increases aversive demands without providing a communication channel."},{"id":"D","text":"Writing a formal essay explaining why puzzles are difficult","isCorrect":false,"explanation":"The non-verbal learner cannot execute written essays."}]', 'B', 'Functional Communication Training (FCT) is a DRA variation that teaches a functionally equivalent communicative response (mand) to replace challenging behavior.',
        'BACB TCO Item D.3: FCT directly eliminates the functional necessity of problem behavior.', 'BACB RBT 3rd Edition TCO Item D.3', NULL, NULL, 'Behavior Reduction',
        'Differential Reinforcement - FCT', '["Behavior Reduction","Differential Reinforcement - FCT","D.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d04-1', 'q-d04-1', 'RBT', 'When a child engages in attention-maintained cursing, the RBT maintains a neutral facial expression, withholds verbal reprimands, and continues with session activities without looking at the client. What procedure is being applied?', 'The functional reinforcer (social attention) is withheld.',
        'scenario_based', 'medium', '[{"id":"A","text":"Positive Punishment","isCorrect":false,"explanation":"Positive punishment delivers an aversive consequence; extinction withholds the maintaining reinforcer."},{"id":"B","text":"Escape Extinction","isCorrect":false,"explanation":"Escape extinction prevents avoidance of tasks."},{"id":"C","text":"Planned Ignoring / Attention Extinction","isCorrect":true,"explanation":"Extinction for attention-maintained behavior withholds all social and verbal reactions contingent on the response."},{"id":"D","text":"Sensory Extinction","isCorrect":false,"explanation":"Sensory extinction blocks automatic physical feedback."}]', 'C', 'Attention extinction (planned ignoring) involves completely withholding social interaction and verbal reactions that previously maintained the problem behavior.',
        'BACB TCO Item D.4: Extinction must be strictly matched to the verified behavior function.', 'BACB RBT 3rd Edition TCO Item D.4', NULL, NULL, 'Behavior Reduction',
        'Extinction - Attention', '["Behavior Reduction","Extinction - Attention","D.4"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d04-2', 'q-d04-2', 'RBT', 'When a student throws materials to escape putting on shoes, the RBT calmly retrieves the shoes, represents the demand, and guides the student to complete the task without allowing them to leave the area. What type of extinction is this?', 'The client is not permitted to avoid or escape the instruction.',
        'scenario_based', 'medium', '[{"id":"A","text":"Planned Ignoring","isCorrect":false,"explanation":"Planned ignoring addresses attention-maintained behaviors, not escape."},{"id":"B","text":"Time-Out from Reinforcement","isCorrect":false,"explanation":"Time-out removes access to positive reinforcement, not demand completion."},{"id":"C","text":"High-Probability Request Sequence","isCorrect":false,"explanation":"High-P is an antecedent intervention, not an extinction procedure."},{"id":"D","text":"Escape Extinction","isCorrect":true,"explanation":"Escape extinction prevents the learner from escaping the instructional demand contingent upon problem behavior."}]', 'D', 'Escape extinction involves not allowing problem behavior to terminate or delay instructional demands.',
        'BACB TCO Item D.4: Escape extinction must be combined with proactive breaks and functional communication.', 'BACB RBT 3rd Edition TCO Item D.4', NULL, NULL, 'Behavior Reduction',
        'Extinction - Escape', '["Behavior Reduction","Extinction - Escape","D.4"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d05-1', 'q-d05-1', 'RBT', 'In a classroom token system, whenever a student engages in physical aggression toward a peer, the RBT removes one previously earned token from the student''s board per the BIP, and aggression decreases. What procedure is this?', 'A specific amount of earned reinforcers is lost following problem behavior.',
        'scenario_based', 'medium', '[{"id":"A","text":"Response Cost (Negative Punishment)","isCorrect":true,"explanation":"Response cost is the contingent loss of a specific amount of positive reinforcers, decreasing future behavior frequency."},{"id":"B","text":"Positive Punishment","isCorrect":false,"explanation":"Positive punishment presents an aversive stimulus; response cost removes a preferred item."},{"id":"C","text":"Extinction","isCorrect":false,"explanation":"Extinction withholds future reinforcement; response cost removes already earned reinforcers."},{"id":"D","text":"Non-Contingent Reinforcement","isCorrect":false,"explanation":"NCR delivers reinforcement on time, not contingent on punishment."}]', 'A', 'Response cost is a negative punishment procedure where a specific quantity of earned positive reinforcement is removed contingent on problem behavior.',
        'BACB TCO Item D.5: Punishment procedures must be explicitly written in the BIP by a BCBA with prior consent.', 'BACB RBT 3rd Edition TCO Item D.5', NULL, NULL, 'Behavior Reduction',
        'Negative Punishment - Response Cost', '["Behavior Reduction","Negative Punishment - Response Cost","D.5"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d05-2', 'q-d05-2', 'RBT', 'What is the defining mechanism of ''Time-Out from Positive Reinforcement'' in behavior analysis?', 'An RBT moves a child 5 feet away from an active video game group following pushing behavior.',
        'scenario_based', 'medium', '[{"id":"A","text":"Locking a child alone in a dark storage closet for hours","isCorrect":false,"explanation":"Solitary confinement in locked rooms is illegal and violates BACB ethical codes."},{"id":"B","text":"The contingent loss of access to positive reinforcement for a specified period of time","isCorrect":true,"explanation":"Time-out is clinically effective only if the time-in environment is rich in positive reinforcement that is temporarily lost."},{"id":"C","text":"Giving the child a candy bar so they calm down","isCorrect":false,"explanation":"Giving candy reinforces the problem behavior."},{"id":"D","text":"An antecedent strategy implemented before behavior occurs","isCorrect":false,"explanation":"Time-out is a consequence procedure following behavior."}]', 'B', 'Time-out from positive reinforcement is a negative punishment procedure that temporarily removes the opportunity to earn positive reinforcement.',
        'BACB TCO Item D.5: Time-out is only effective if ''time-in'' is reinforcing. It is contraindicated for escape-maintained behavior.', 'BACB RBT 3rd Edition TCO Item D.5', NULL, NULL, 'Behavior Reduction',
        'Negative Punishment - Time-Out', '["Behavior Reduction","Negative Punishment - Time-Out","D.5"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d06-1', 'q-d06-1', 'RBT', 'On the second day of implementing an extinction procedure for screaming, the child''s screaming suddenly increases dramatically in frequency, volume, and duration. How should the RBT interpret this?', 'The parent is worried the intervention is failing and wants to give in.',
        'scenario_based', 'medium', '[{"id":"A","text":"The intervention is flawed and must be immediately discontinued without supervisor knowledge","isCorrect":false,"explanation":"Changing protocols independently violates BACB standards."},{"id":"B","text":"The child has acquired a new medical disease","isCorrect":false,"explanation":"Sudden behavioral spikes following reinforcer removal are behavioral extinction bursts."},{"id":"C","text":"This is an expected Extinction Burst, representing a temporary increase in frequency, intensity, and variability before behavior decreases","isCorrect":true,"explanation":"An extinction burst is a normal, predictable phenomenon indicating that extinction is taking effect."},{"id":"D","text":"The RBT should yell at the child to suppress the scream","isCorrect":false,"explanation":"Yelling delivers attention and provides an unapproved punishment."}]', 'C', 'An extinction burst is an immediate, temporary increase in the frequency, intensity, or variability of the behavior when reinforcement is first withheld.',
        'BACB TCO Item D.6: Educating caregivers and staff on extinction bursts prevents premature treatment termination.', 'BACB RBT 3rd Edition TCO Item D.6', NULL, NULL, 'Behavior Reduction',
        'Secondary Effects - Extinction Burst', '["Behavior Reduction","Secondary Effects - Extinction Burst","D.6"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d06-2', 'q-d06-2', 'RBT', 'Three weeks after a problem behavior has been successfully reduced to near-zero levels through extinction, the behavior suddenly reappears during a routine session without any obvious trigger. What phenomenon is this?', 'The RBT continues to withhold reinforcement consistently as trained.',
        'scenario_based', 'medium', '[{"id":"A","text":"Extinction Burst","isCorrect":false,"explanation":"Extinction burst occurs immediately after extinction begins, not weeks later."},{"id":"B","text":"Behavioral Momentum","isCorrect":false,"explanation":"Behavioral momentum describes response persistence."},{"id":"C","text":"Negative Reinforcement","isCorrect":false,"explanation":"This is an extinction phenomenon, not negative reinforcement."},{"id":"D","text":"Spontaneous Recovery","isCorrect":true,"explanation":"Spontaneous recovery is the typical reappearance of an extinguished behavior after a period of non-occurrence."}]', 'D', 'Spontaneous recovery is the temporary reappearance of a previously extinguished behavior after a period of absence.',
        'BACB TCO Item D.6: RBTs must maintain extinction fidelity during spontaneous recovery so the behavior extinguishes quickly again.', 'BACB RBT 3rd Edition TCO Item D.6', NULL, NULL, 'Behavior Reduction',
        'Secondary Effects - Spontaneous Recovery', '["Behavior Reduction","Secondary Effects - Spontaneous Recovery","D.6"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d06-3', 'q-d06-3', 'RBT', 'Which of the following is a recognized secondary risk or undesirable side effect associated with the use of punishment procedures?', 'A clinic team reviews potential ethical and emotional risks before implementing a response cost procedure.',
        'scenario_based', 'medium', '[{"id":"A","text":"Emotional responding, aggressive counter-control, and escape/avoidance of the person delivering punishment","isCorrect":true,"explanation":"Punishment frequently produces undesirable emotional reactions and social avoidance of the clinician."},{"id":"B","text":"Immediate long-term skill acquisition of complex language targets","isCorrect":false,"explanation":"Punishment suppresses behavior; it does not teach novel replacement skills."},{"id":"C","text":"Automatic increase in client happiness and self-esteem","isCorrect":false,"explanation":"Punishment does not automatically elevate self-esteem."},{"id":"D","text":"Elimination of all future sensory needs","isCorrect":false,"explanation":"Sensory biological functions cannot be eliminated through punishment."}]', 'A', 'Side effects of punishment include emotional responding, aggressive retaliatory behavior, and escape/avoidance of the therapist.',
        'BACB TCO Item D.6: Due to potential side effects, BACB standards mandate exhausting positive reinforcement alternatives before punishment.', 'BACB RBT 3rd Edition TCO Item D.6', NULL, NULL, 'Behavior Reduction',
        'Secondary Effects - Punishment Side Effects', '["Behavior Reduction","Secondary Effects - Punishment Side Effects","D.6"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-d07-1', 'q-d07-1', 'RBT', 'During a severe crisis event where a client begins smashing window glass and presenting immediate danger of serious physical harm to self and others, what is the RBT''s primary duty?', 'The RBT follows clinic emergency protocols.',
        'scenario_based', 'medium', '[{"id":"A","text":"Debate the client on the economic cost of replacing glass windows","isCorrect":false,"explanation":"Verbal debates during crisis escalate physical danger."},{"id":"B","text":"Implement authorized safety protocols, remove other clients from danger, protect client dignity, and immediately contact emergency support/supervision","isCorrect":true,"explanation":"Ensuring physical safety, utilizing certified de-escalation, and notifying leadership is paramount."},{"id":"C","text":"Leave the clinic premises immediately and go home","isCorrect":false,"explanation":"Abandoning clients during physical emergencies is severe ethical neglect."},{"id":"D","text":"Administer unprescribed sedatives from the first-aid kit","isCorrect":false,"explanation":"RBTs never prescribe or administer unapproved chemical restraints."}]', 'B', 'During crisis situations, the RBT must prioritize physical safety, protect client dignity, follow agency crisis protocols, and contact supervision.',
        'BACB TCO Item D.7: Emergency interventions are restricted to preserving immediate safety and must be followed by formal incident documentation.', 'BACB RBT 3rd Edition TCO Item D.7', NULL, NULL, 'Behavior Reduction',
        'Crisis & Emergency Procedures', '["Behavior Reduction","Crisis & Emergency Procedures","D.7"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-e01-1', 'q-e01-1', 'RBT', 'A client''s general education teacher informs the RBT that the client has been falling asleep in class and suggests reducing the daily work requirement. How should the RBT handle this communication?', 'The teacher approaches the RBT during transition time with pedagogical concerns.',
        'scenario_based', 'medium', '[{"id":"A","text":"Immediately change the client''s official BIP goals without consulting anyone","isCorrect":false,"explanation":"RBTs do not modify intervention goals independently."},{"id":"B","text":"Ignore the teacher and tell them behavior technicians do not talk to school staff","isCorrect":false,"explanation":"Collaborative and respectful professional communication is mandatory."},{"id":"C","text":"Communicate the teacher''s concerns and suggestions to the BCBA supervisor in a timely manner","isCorrect":true,"explanation":"RBTs act as communication conduits, escalating team input to the supervising BCBA."},{"id":"D","text":"Promise the teacher that the client will be dismissed from all school tasks","isCorrect":false,"explanation":"RBTs cannot make unilateral promises on school curriculum."}]', 'C', 'RBTs must communicate relevant observations, concerns, and suggestions from stakeholders (caregivers, teachers) to the supervisor in a timely manner.',
        'BACB TCO Item E.1: Timely communication ensures the BCBA can coordinate care with multidisciplinary team members.', 'BACB RBT 3rd Edition TCO Item E.1', NULL, NULL, 'Documentation and Reporting',
        'Team Communication', '["Documentation and Reporting","Team Communication","E.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-e01-2', 'q-e01-2', 'RBT', 'A parent mentions to the RBT at session drop-off that they started giving the client a new herbal supplement that seems to cause stomach pain. What is the RBT''s responsibility?', 'The parent asks the RBT if they should discontinue the supplement.',
        'scenario_based', 'medium', '[{"id":"A","text":"Advise the parent to double the herbal dosage immediately","isCorrect":false,"explanation":"RBTs do not give medical advice."},{"id":"B","text":"Tell the parent that herbal supplements are forbidden under BACB rules","isCorrect":false,"explanation":"RBTs do not provide medical judgments outside their scope."},{"id":"C","text":"Keep the information secret from the clinical treatment team","isCorrect":false,"explanation":"Concealing relevant clinical variables compromises client care."},{"id":"D","text":"Listen respectfully, document the parent''s report, advise consulting their physician, and immediately notify the BCBA supervisor","isCorrect":true,"explanation":"RBTs communicate medical variables to supervisors while directing medical decisions to physicians."}]', 'D', 'Variables reported by caregivers that may affect client comfort and behavior must be escalated to the supervisor promptly.',
        'BACB TCO Item E.1: Medical and health concerns must always be referred to the client''s primary medical providers.', 'BACB RBT 3rd Edition TCO Item E.1', NULL, NULL, 'Documentation and Reporting',
        'Caregiver Suggestions', '["Documentation and Reporting","Caregiver Suggestions","E.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-e02-1', 'q-e02-1', 'RBT', 'An RBT notices that a client''s aggressive behavior has suddenly doubled over three consecutive sessions, and the current BIP strategies are failing to keep staff safe. What should the RBT do?', 'The RBT is unsure how to handle the sudden escalation in behavior severity.',
        'scenario_based', 'medium', '[{"id":"A","text":"Actively seek and prioritize clinical direction from the supervising BCBA in a timely manner","isCorrect":true,"explanation":"When data irregularities or safety concerns arise, RBTs must immediately seek supervisor guidance."},{"id":"B","text":"Invent an emergency physical hold found on the internet","isCorrect":false,"explanation":"Unapproved physical holds are dangerous and unethical."},{"id":"C","text":"Cancel all future client sessions indefinitely without telling anyone","isCorrect":false,"explanation":"Abandonment of services violates ethical rules."},{"id":"D","text":"Tell the parents that the client is unteachable","isCorrect":false,"explanation":"Unprofessional and defeatist remarks violate dignity standards."}]', 'A', 'RBTs must actively seek guidance from their supervisor when data show marked irregularities or when safety is compromised.',
        'BACB TCO Item E.2: Proactively requesting supervision prevents clinical drift and ensures prompt protocol adjustments.', 'BACB RBT 3rd Edition TCO Item E.2', NULL, NULL, 'Documentation and Reporting',
        'Seeking Clinical Direction', '["Documentation and Reporting","Seeking Clinical Direction","E.2"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-e02-2', 'q-e02-2', 'RBT', 'If an RBT has a disagreement with another behavior technician regarding how a prompt fading protocol is run, what is the appropriate professional channel to resolve the issue?', 'Both technicians believe their interpretation of the written protocol is correct.',
        'scenario_based', 'medium', '[{"id":"A","text":"Argue loudly in front of the client and family during session","isCorrect":false,"explanation":"Public arguments compromise client dignity and professionalism."},{"id":"B","text":"Bring the matter to the supervising BCBA for clarification and clinical guidance following the agency chain of command","isCorrect":true,"explanation":"The supervising BCBA oversees all clinical programming and provides definitive protocol guidance."},{"id":"C","text":"Post a video of the dispute on TikTok to ask for public votes","isCorrect":false,"explanation":"Public social media posting violates HIPAA and BACB confidentiality standards."},{"id":"D","text":"Refuse to work with any clients until the other technician is terminated","isCorrect":false,"explanation":"Unreasonable ultimatums disrupt clinical care."}]', 'B', 'Clinical ambiguities and procedural questions must be brought to the supervising BCBA following the organizational chain of command.',
        'BACB TCO Item E.2: The BCBA is responsible for clarifying protocol instructions and maintaining treatment fidelity.', 'BACB RBT 3rd Edition TCO Item E.2', NULL, NULL, 'Documentation and Reporting',
        'Chain of Command', '["Documentation and Reporting","Chain of Command","E.2"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-e03-1', 'q-e03-1', 'RBT', 'A client arrives at the clinic with visible dark circles under their eyes, and the parent shares that the client had an ear infection and slept only 2 hours last night. Why is it vital for the RBT to document this variable?', 'During the session, the client exhibits unusually high rates of crying and lethargy.',
        'scenario_based', 'medium', '[{"id":"A","text":"To blame the parent for poor parenting","isCorrect":false,"explanation":"Documentation must never be punitive or accusatory."},{"id":"B","text":"Because the BACB requires taking blood pressure every session","isCorrect":false,"explanation":"RBTs do not conduct medical blood testing."},{"id":"C","text":"Because biological setting events and illness alter motivating operations and directly affect learning performance and behavior rates","isCorrect":true,"explanation":"Illness and sleep deprivation act as motivating operations that impact behavior, providing crucial context for data interpretation."},{"id":"D","text":"So the insurance company can bill for pediatric nursing","isCorrect":false,"explanation":"RBT documentation is specific to behavioral services, not nursing."}]', 'C', 'Setting events (e.g., illness, sleep disruption, medication changes) alter motivating operations and must be documented to explain behavioral fluctuations.',
        'BACB TCO Item E.3: Contextual variables prevent erroneous conclusions about treatment efficacy.', 'BACB RBT 3rd Edition TCO Item E.3', NULL, NULL, 'Documentation and Reporting',
        'Environmental Variables', '["Documentation and Reporting","Environmental Variables","E.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-e03-2', 'q-e03-2', 'RBT', 'When a caregiver reports that a client was prescribed a new psychotropic medication that began yesterday, how should the RBT document and report this?', 'The medication may cause drowsiness or appetite changes.',
        'scenario_based', 'medium', '[{"id":"A","text":"Tell the caregiver to stop the medication immediately","isCorrect":false,"explanation":"Giving medical advice violates the RBT scope of practice."},{"id":"B","text":"Ignore the report unless the client physically vomits","isCorrect":false,"explanation":"Medication changes must be tracked proactively."},{"id":"C","text":"Alter the client''s behavioral targets to match psychiatric goals","isCorrect":false,"explanation":"Only BCBAs design and modify behavioral goals."},{"id":"D","text":"Note the caregiver report objectively in the session notes and inform the BCBA supervisor immediately","isCorrect":true,"explanation":"Documenting medication changes provides essential clinical context for subsequent behavioral trends."}]', 'D', 'RBTs must document caregiver-reported medication changes objectively and notify the supervisor to monitor behavioral side effects.',
        'BACB TCO Item E.3: Documenting medication shifts helps distinguish behavioral intervention effects from pharmacological effects.', 'BACB RBT 3rd Edition TCO Item E.3', NULL, NULL, 'Documentation and Reporting',
        'Medication Changes', '["Documentation and Reporting","Medication Changes","E.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-e04-1', 'q-e04-1', 'RBT', 'Which of the following session note entries represents the most objective, fact-based description compliant with BACB and regulatory standards?', 'An RBT is writing a clinical SOAP / progress note at the end of a 3-hour session.',
        'scenario_based', 'medium', '[{"id":"A","text":"Client engaged in 4 instances of crying and 2 instances of floor-dropping during academic transitions; manding for breaks was prompted across 8 trials with 75% accuracy.","isCorrect":true,"explanation":"States exact counts, operational behaviors, environmental triggers, and measurable trial percentages objectively."},{"id":"B","text":"Client was possessed by bad spirits and acted out spitefully against the therapist.","isCorrect":false,"explanation":"Supernatural and emotional blame statements are completely unscientific."},{"id":"C","text":"Client was angry all day, probably because mom did not give him his favorite iPad before session.","isCorrect":false,"explanation":"Speculating on internal anger and maternal blame is subjective opinion."},{"id":"D","text":"Client had an awful day and was miserable the whole morning.","isCorrect":false,"explanation":"Awful and miserable are vague, non-measurable personal opinions."}]', 'A', 'Objective session notes state observable physical actions, specific data metrics, environmental triggers, and intervention responses without subjective speculation.',
        'BACB TCO Item E.4: Progress notes are legal medical records subject to audit by state agencies, insurance payers, and supervisors.', 'BACB RBT 3rd Edition TCO Item E.4', NULL, NULL, 'Documentation and Reporting',
        'Objective Session Notes', '["Documentation and Reporting","Objective Session Notes","E.4"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-e04-2', 'q-e04-2', 'RBT', 'During a home-based session, an RBT observes unexplained severe linear bruising, burn marks, and extreme malnutrition on a minor client, and the child whispers that a relative caused the injuries. What is the RBT''s mandatory legal obligation?', 'The RBT is a mandated reporter under state child protection laws.',
        'scenario_based', 'medium', '[{"id":"A","text":"Confront the family angrily and threaten them with physical violence","isCorrect":false,"explanation":"Confrontation endangers the client and violates legal protocol."},{"id":"B","text":"Immediately report the suspected abuse/neglect to the state child protection agency/authorities per mandated reporter laws, and notify their supervisor","isCorrect":true,"explanation":"As mandated reporters, RBTs are legally obligated to report suspected child abuse immediately."},{"id":"C","text":"Wait 6 months to see if the bruising fades naturally","isCorrect":false,"explanation":"Delaying reports of abuse is illegal and endangers client life."},{"id":"D","text":"Post photos of the injuries online to get legal advice from friends","isCorrect":false,"explanation":"Posting client photos violates HIPAA and privacy laws."}]', 'B', 'RBTs are mandated reporters who must immediately report suspected child abuse or neglect to child protective services and follow agency notification protocols.',
        'BACB TCO Item E.4: Legal reporting duties take precedence over confidentiality when client physical safety and abuse are at stake.', 'BACB RBT 3rd Edition TCO Item E.4', NULL, NULL, 'Documentation and Reporting',
        'Mandated Reporting Obligations', '["Documentation and Reporting","Mandated Reporting Obligations","E.4"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-e04-3', 'q-e04-3', 'RBT', 'An RBT finishes an in-home session with a paper data binder containing the client''s full name, diagnostic reports, and medical history. How must this binder be transported?', 'The RBT drives between multiple client homes throughout the day.',
        'scenario_based', 'medium', '[{"id":"A","text":"Leave the open binder face-up on the front passenger seat with windows rolled down","isCorrect":false,"explanation":"Leaving records visible and accessible invites privacy breaches."},{"id":"B","text":"Throw the papers away in a public park garbage can","isCorrect":false,"explanation":"Discarding PHI in public bins is a severe federal HIPAA violation."},{"id":"C","text":"Secure the records in a locked, concealed container or trunk in compliance with HIPAA privacy standards","isCorrect":true,"explanation":"Protected Health Information (PHI) must be safeguarded against unauthorized access during transport."},{"id":"D","text":"Hand the binder to a passing neighbor for safe keeping","isCorrect":false,"explanation":"Sharing PHI with unauthorized individuals is illegal."}]', 'C', 'HIPAA requires physical and electronic safeguards to protect confidential client records (PHI) during transit and storage.',
        'BACB TCO Item E.4: Secure data management protects client legal privacy rights.', 'BACB RBT 3rd Edition TCO Item E.4', NULL, NULL, 'Documentation and Reporting',
        'HIPAA & Data Privacy', '["Documentation and Reporting","HIPAA & Data Privacy","E.4"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-e01-3', 'q-e01-3', 'RBT', 'An occupational therapist (OT) working with a shared client tells the RBT that brushing the client''s skin with a brush reduces all tantrums. How should the RBT respond?', 'The sensory brushing technique is not in the client''s approved BACB behavior plan.',
        'scenario_based', 'medium', '[{"id":"A","text":"Start brushing the client immediately without telling the BCBA","isCorrect":false,"explanation":"Implementing unapproved non-behavioral techniques independently is unethical."},{"id":"B","text":"Scream at the OT that occupational therapy is fake science","isCorrect":false,"explanation":"Hostile and disrespectful conduct violates professional collaboration standards."},{"id":"C","text":"Quit working with the client on the spot","isCorrect":false,"explanation":"Unjustified service abandonment harms the client."},{"id":"D","text":"Thank the OT for the suggestion and state that all intervention techniques must be evaluated and approved by the supervising BCBA before implementation","isCorrect":true,"explanation":"Professional collaboration requires channeling intervention changes through the supervising BCBA."}]', 'D', 'RBTs must politely inform multidisciplinary providers that any new interventions must be reviewed and authorized by the supervising BCBA.',
        'BACB TCO Item E.1: Upholding treatment fidelity ensures interventions remain strictly evidence-based and supervisor-approved.', 'BACB RBT 3rd Edition TCO Item E.1', NULL, NULL, 'Documentation and Reporting',
        'Team Communication', '["Documentation and Reporting","Team Communication","E.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-e04-4', 'q-e04-4', 'RBT', 'Under BACB and clinical compliance guidelines, how long must behavioral client records and data typically be securely retained?', 'An agency is archiving closed client case files.',
        'scenario_based', 'medium', '[{"id":"A","text":"For at least 7 years, or as mandated by applicable state and federal laws","isCorrect":true,"explanation":"BACB and federal healthcare compliance standards mandate secure record retention for a minimum of 7 years."},{"id":"B","text":"For 24 hours only, after which all records must be burned","isCorrect":false,"explanation":"Immediate destruction destroys necessary clinical and audit history."},{"id":"C","text":"Until the client turns 100 years old regardless of death","isCorrect":false,"explanation":"Unrealistic duration."},{"id":"D","text":"Data does not need to be saved once the session ends","isCorrect":false,"explanation":"Records must be archived for clinical continuity and legal verification."}]', 'A', 'Behavioral records and clinical data must be maintained securely for at least 7 years in accordance with BACB and healthcare regulatory rules.',
        'BACB TCO Item E.4: Systematic data archiving protects both client history and provider clinical accountability.', 'BACB RBT 3rd Edition TCO Item E.4', NULL, NULL, 'Documentation and Reporting',
        'Data Storage Standards', '["Documentation and Reporting","Data Storage Standards","E.4"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-f01-1', 'q-f01-1', 'RBT', 'Which of the following represents a foundational core principle of the BACB Ethics Code for RBTs?', 'An RBT reflects on ethical practice during clinical decision-making.',
        'scenario_based', 'medium', '[{"id":"A","text":"Maximize agency billing revenue above all other priorities","isCorrect":false,"explanation":"Financial profit is never an ethical priority."},{"id":"B","text":"Benefit others; treat others with compassion, dignity, and respect; behave with integrity; and ensure competence","isCorrect":true,"explanation":"These four foundational principles underpin all specific standards in the BACB Ethics Code for RBTs."},{"id":"C","text":"Avoid talking to parents to prevent awkward social situations","isCorrect":false,"explanation":"Avoiding families harms clinical collaboration."},{"id":"D","text":"Enforce strict physical discipline whenever a client makes a mistake","isCorrect":false,"explanation":"Physical discipline violates dignity, safety, and ethics standards."}]', 'B', 'The core ethical principles include benefiting others, treating people with compassion, dignity, and respect, behaving with integrity, and maintaining competence.',
        'BACB TCO Item F.1: Grounding daily work in core principles prevents ethical violations.', 'BACB RBT 3rd Edition TCO Item F.1', NULL, NULL, 'Ethics',
        'Core Ethical Principles', '["Ethics","Core Ethical Principles","F.1"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-f02-1', 'q-f02-1', 'RBT', 'A supervisor assigns an RBT to implement a feeding protocol involving high choking risk for a child with severe dysphagia. The RBT has never received training or modeling on feeding interventions. What is the RBT''s ethical obligation?', 'The RBT has only worked on basic table-top discrete trial programs previously.',
        'scenario_based', 'medium', '[{"id":"A","text":"Attempt the feeding intervention alone and guess how to clear the airway","isCorrect":false,"explanation":"Attempting complex, high-risk procedures without training risks client life."},{"id":"B","text":"Falsify feeding data sheets without feeding the child","isCorrect":false,"explanation":"Falsifying clinical records is fraud and an egregious ethical breach."},{"id":"C","text":"Inform the supervisor that they have not demonstrated competence in this protocol and request instruction, modeling, and observed rehearsal before implementation","isCorrect":true,"explanation":"RBTs must provide services only after demonstrating competence under qualified supervision."},{"id":"D","text":"Quit the profession immediately and abandon all clients","isCorrect":false,"explanation":"Professionals request training rather than abandoning services."}]', 'C', 'Under Item F.2, RBTs must provide behavioral technician services only after demonstrating competence in the designated protocols.',
        'BACB TCO Item F.2: Acknowledging competency boundaries protects client safety in specialized clinical domains.', 'BACB RBT 3rd Edition TCO Item F.2', NULL, NULL, 'Ethics',
        'Competence Boundaries', '["Ethics","Competence Boundaries","F.2"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-f03-1', 'q-f03-1', 'RBT', 'According to BACB requirements, what is the minimum percentage of monthly behavior-analytic service hours that an RBT must receive in direct supervision?', 'An RBT works 100 hours providing direct ABA therapy during the month of October.',
        'scenario_based', 'medium', '[{"id":"A","text":"1% of monthly hours","isCorrect":false,"explanation":"1% is insufficient under BACB standards."},{"id":"B","text":"50% of monthly hours","isCorrect":false,"explanation":"50% is required for practicum internships, not standard RBT maintenance."},{"id":"C","text":"Supervision is only required once every 5 years","isCorrect":false,"explanation":"Supervision is a strict monthly ongoing requirement."},{"id":"D","text":"At least 5% of monthly hours providing behavior-analytic services across a minimum of 2 face-to-face contacts","isCorrect":true,"explanation":"The BACB mandates at least 5% monthly supervision with at least 2 synchronous face-to-face meetings."}]', 'D', 'RBTs must receive ongoing supervision for at least 5% of their monthly direct service hours, including at least 2 face-to-face synchronous contacts per month.',
        'BACB TCO Item F.3: Maintaining required supervision hours is mandatory to maintain active RBT certification.', 'BACB RBT 3rd Edition TCO Item F.3', NULL, NULL, 'Ethics',
        'Supervision Requirements', '["Ethics","Supervision Requirements","F.3"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-f04-1', 'q-f04-1', 'RBT', 'What are the four recognized stages of Behavioral Skills Training (BST) used by supervisors to train RBTs on new clinical procedures?', 'A BCBA trains an RBT on a new natural environment manding procedure.',
        'scenario_based', 'medium', '[{"id":"A","text":"Instructions -> Modeling -> Rehearsal -> Feedback","isCorrect":true,"explanation":"BST is the evidence-based gold standard training model consisting of instructions, modeling, roleplay rehearsal, and corrective feedback."},{"id":"B","text":"Reading a book -> Taking an exam -> Signing a contract -> Working alone","isCorrect":false,"explanation":"Didactic instruction alone without modeling and rehearsal is not BST."},{"id":"C","text":"Lecture -> Scolding -> Isolation -> Retest","isCorrect":false,"explanation":"Punitive feedback is unscientific and ineffective."},{"id":"D","text":"Observation only without any verbal communication","isCorrect":false,"explanation":"Effective training requires clear instruction and active practice."}]', 'A', 'Behavioral Skills Training (BST) consists of: 1) Instruction, 2) Modeling, 3) Rehearsal, and 4) Performance Feedback.',
        'BACB TCO Item F.4: BST ensures technicians achieve procedural fidelity before working independently with clients.', 'BACB RBT 3rd Edition TCO Item F.4', NULL, NULL, 'Ethics',
        'Behavioral Skills Training (BST)', '["Ethics","Behavioral Skills Training (BST)","F.4"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-f05-1', 'q-f05-1', 'RBT', 'While having lunch at a public café, an RBT meets a friend and begins discussing a client''s specific diagnosis, address, and behavioral tantrums using the client''s full real name. What ethical standard has been violated?', 'Patrons at neighboring tables overhear the entire clinical conversation.',
        'scenario_based', 'medium', '[{"id":"A","text":"The mandatory 5% supervision rule","isCorrect":false,"explanation":"This is a confidentiality breach, not a supervision calculation issue."},{"id":"B","text":"Complying with requirements for collecting, using, storing, and protecting confidential information","isCorrect":true,"explanation":"Disclosing protected health information in public without authorization violates client confidentiality and HIPAA."},{"id":"C","text":"Preference assessment standards","isCorrect":false,"explanation":"This is unrelated to preference assessments."},{"id":"D","text":"Token exchange ratios","isCorrect":false,"explanation":"This is unrelated to token economies."}]', 'B', 'RBTs must protect client confidentiality and never discuss protected client information in public or with unauthorized individuals.',
        'BACB TCO Item F.5: Protecting confidentiality preserves client dignity, trust, and federal legal rights.', 'BACB RBT 3rd Edition TCO Item F.5', NULL, NULL, 'Ethics',
        'Protecting Confidentiality', '["Ethics","Protecting Confidentiality","F.5"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-f06-1', 'q-f06-1', 'RBT', 'An RBT takes an adorable photo of a client during a successful session and posts it on their personal Instagram account with the caption: ''My favorite autistic kiddo crushed his ABA goals today! #RBTLife''. The client''s face is clearly visible. Is this acceptable?', 'The RBT has personal privacy settings on their social media page.',
        'scenario_based', 'medium', '[{"id":"A","text":"Yes, as long as the photo receives at least 100 likes","isCorrect":false,"explanation":"Social media engagement does not justify ethical violations."},{"id":"B","text":"Yes, provided the child was smiling in the picture","isCorrect":false,"explanation":"A child''s smile does not waive privacy protections."},{"id":"C","text":"No, posting client images and diagnostic disclosures on personal social media violates BACB ethics and confidentiality requirements","isCorrect":true,"explanation":"RBTs must not share client images or confidential details on personal social media platforms."},{"id":"D","text":"Yes, because Instagram is not an official healthcare record","isCorrect":false,"explanation":"HIPAA and BACB rules apply to all digital media platforms."}]', 'C', 'Posting client photos, names, or identifying clinical details on social media is a severe violation of BACB ethics and privacy laws.',
        'BACB TCO Item F.6: Maintaining strict social media boundaries protects vulnerable clients from public exposure.', 'BACB RBT 3rd Edition TCO Item F.6', NULL, NULL, 'Ethics',
        'Social Media Compliance', '["Ethics","Social Media Compliance","F.6"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-f07-1', 'q-f07-1', 'RBT', 'A client''s parent asks the RBT to babysit the client on weekends for paid cash, outside of their official clinic therapy hours. How should the RBT respond?', 'The parent explains that the child already knows and loves the RBT.',
        'scenario_based', 'medium', '[{"id":"A","text":"Accept the offer immediately to earn extra weekend cash","isCorrect":false,"explanation":"Accepting private babysitting creates a multiple/dual relationship with conflicts of interest."},{"id":"B","text":"Agree to babysit if the parent gives them a 5-star review online","isCorrect":false,"explanation":"Soliciting reviews in exchange for favors is unethical."},{"id":"C","text":"Move into the client''s home permanently to provide 24/7 care","isCorrect":false,"explanation":"Co-habitation represents an extreme boundary violation."},{"id":"D","text":"Politely decline the offer, explain that BACB ethical guidelines prohibit multiple relationships, and inform the supervisor","isCorrect":true,"explanation":"Declining protects clinical objectivity and maintains strict professional boundaries."}]', 'D', 'Multiple relationships (e.g., being a therapist and a babysitter/friend) impair clinical objectivity and create conflicts of interest.',
        'BACB TCO Item F.7: Avoiding dual relationships protects the integrity of therapeutic boundaries.', 'BACB RBT 3rd Edition TCO Item F.7', NULL, NULL, 'Ethics',
        'Multiple Relationships', '["Ethics","Multiple Relationships","F.7"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-f08-1', 'q-f08-1', 'RBT', 'During the holiday season, a wealthy client family attempts to give the RBT a brand-new $500 designer handbag and a $200 cash gift card. How must the RBT handle this situation?', 'The family insists that refusing the gift would hurt their feelings.',
        'scenario_based', 'medium', '[{"id":"A","text":"Politely decline the expensive gifts, explain the BACB ethics code rules regarding gift limits, and notify the supervisor","isCorrect":true,"explanation":"RBTs must not accept individual gifts that exceed established nominal thresholds or create conflicts of interest."},{"id":"B","text":"Accept both gifts quietly without telling the supervisor","isCorrect":false,"explanation":"Accepting expensive gifts violates BACB ethical standards and compromises professional objectivity."},{"id":"C","text":"Demand $1,000 cash instead of the handbag","isCorrect":false,"explanation":"Extorting clients is illegal and unethical."},{"id":"D","text":"Accept the handbag but give the cash card to a coworker","isCorrect":false,"explanation":"Redistributing improper gifts does not resolve the ethical breach."}]', 'A', 'Under the BACB Ethics Code, RBTs must adhere to gift restrictions (avoiding significant personal gifts) to prevent conflicts of interest and maintain professional boundaries.',
        'BACB TCO Item F.8: A polite, upfront explanation of certification ethics preserves rapport while maintaining compliance.', 'BACB RBT 3rd Edition TCO Item F.8', NULL, NULL, 'Ethics',
        'Gift Giving and Receiving', '["Ethics","Gift Giving and Receiving","F.8"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-f09-1', 'q-f09-1', 'RBT', 'During an observation, a BCBA provides constructive feedback that the RBT is delivering reinforcers too slowly (5-second delay instead of immediate). How should the RBT respond professionally?', 'The RBT felt they were doing a good job and is surprised by the critique.',
        'scenario_based', 'medium', '[{"id":"A","text":"Yell at the BCBA and storm out of the clinic","isCorrect":false,"explanation":"Unprofessional hostility impairs clinical collaboration."},{"id":"B","text":"Listen actively, accept the constructive feedback non-defensively, ask clarifying questions, and implement the immediate delivery timing on the next trial","isCorrect":true,"explanation":"Accepting supervisor feedback non-defensively and implementing corrective changes immediately is a core professional competency."},{"id":"C","text":"Complain about the BCBA to the client''s parents","isCorrect":false,"explanation":"Triangulating parents into supervisor disputes violates professional standards."},{"id":"D","text":"Intentionally delay reinforcement by 20 seconds to spite the supervisor","isCorrect":false,"explanation":"Deliberately sabotaging client protocols harms the learner."}]', 'B', 'RBTs must receive corrective feedback non-defensively, communicate professionally, and implement recommendations with fidelity.',
        'BACB TCO Item F.9: Constructive feedback is the primary mechanism through which technicians develop clinical mastery.', 'BACB RBT 3rd Edition TCO Item F.9', NULL, NULL, 'Ethics',
        'Accepting Feedback', '["Ethics","Accepting Feedback","F.9"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-f10-1', 'q-f10-1', 'RBT', 'An RBT is assigned to provide in-home ABA services to a family whose cultural and religious customs require removing shoes at the entrance and observing specific dietary prayer rituals before eating. What should the RBT do?', 'The RBT has never encountered these customs in their own personal life.',
        'scenario_based', 'medium', '[{"id":"A","text":"Demand that the family abandon their religious customs during ABA hours","isCorrect":false,"explanation":"Imposing personal values onto clients violates cultural humility and dignity."},{"id":"B","text":"Make jokes about the family''s traditions in session notes","isCorrect":false,"explanation":"Disrespectful remarks violate ethical dignity standards."},{"id":"C","text":"Engage in cultural humility, respect the family''s home traditions, remove shoes as requested, and coordinate with the BCBA to integrate family values into programming","isCorrect":true,"explanation":"Cultural responsiveness requires respecting client cultural backgrounds and adapting service delivery respectfully."},{"id":"D","text":"Report the family to child protective services for observing religious prayers","isCorrect":false,"explanation":"Religious observance is a constitutionally protected right, not abuse."}]', 'C', 'Cultural humility requires technicians to recognize personal biases, respect client cultural practices, and provide culturally responsive service.',
        'BACB TCO Item F.10: Responsive care honors family values and strengthens treatment adherence.', 'BACB RBT 3rd Edition TCO Item F.10', NULL, NULL, 'Ethics',
        'Cultural Humility', '["Ethics","Cultural Humility","F.10"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-f07-2', 'q-f07-2', 'RBT', 'A client''s older sibling invites the RBT to attend their personal 21st birthday party at a local nightclub. Can the RBT attend as a personal friend?', 'The RBT and sibling get along well during clinic drop-offs.',
        'scenario_based', 'medium', '[{"id":"A","text":"Yes, because the sibling is an adult and not the direct client","isCorrect":false,"explanation":"Socializing outside therapy hours with client family members compromises clinical boundaries."},{"id":"B","text":"Yes, as long as the RBT brings the client along","isCorrect":false,"explanation":"Bringing a client to a nightclub is hazardous and inappropriate."},{"id":"C","text":"Yes, if the RBT acts as the designated driver","isCorrect":false,"explanation":"Acting as a personal driver still violates boundary rules."},{"id":"D","text":"No, attending private social parties with client family members creates a dual relationship and blurs therapeutic boundaries","isCorrect":true,"explanation":"Maintaining strict professional distance preserves therapeutic objectivity."}]', 'D', 'Socializing privately with clients or immediate family members establishes multiple relationships that compromise professional objectivity.',
        'BACB TCO Item F.7: Firm personal-professional boundaries protect both the practitioner and the client family.', 'BACB RBT 3rd Edition TCO Item F.7', NULL, NULL, 'Ethics',
        'Multiple Relationships - Socializing', '["Ethics","Multiple Relationships - Socializing","F.7"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO master_questions (
        id, question_code, certification, question_text, scenario_text,
        question_type, difficulty, options, correct_answer_id, answer_explanation,
        clinical_explanation, "references", exam_tips, common_mistakes, category,
        sub_category, keywords, task_list_version, estimated_time_seconds, tags,
        status, is_premium, is_featured
      ) VALUES (
        'q-f05-2', 'q-f05-2', 'RBT', 'An RBT wants to draft session notes on their personal laptop. They upload unencrypted documents with client names and home addresses to an unsecure personal cloud account. Is this compliant with BACB and HIPAA rules?', 'The RBT thinks personal cloud storage is private enough.',
        'scenario_based', 'medium', '[{"id":"A","text":"No, storing unencrypted protected health information on unauthorized personal devices violates federal confidentiality regulations","isCorrect":true,"explanation":"Only clinic-authorized, encrypted, HIPAA-compliant platforms may store protected health data."},{"id":"B","text":"Yes, because personal accounts cannot be hacked","isCorrect":false,"explanation":"Personal consumer cloud accounts lack necessary HIPAA encryption agreements (BAAs)."},{"id":"C","text":"Yes, if the RBT sets a 4-digit PIN","isCorrect":false,"explanation":"A simple PIN on consumer accounts does not meet enterprise healthcare security standards."},{"id":"D","text":"Yes, provided the notes are written in Spanish","isCorrect":false,"explanation":"Language does not alter confidentiality and data protection laws."}]', 'A', 'Storing client PHI on unauthorized, unencrypted personal cloud drives violates HIPAA security rules and BACB confidentiality standards.',
        'BACB TCO Item F.5: Technicians must use only agency-approved, encrypted systems for client records.', 'BACB RBT 3rd Edition TCO Item F.5', NULL, NULL, 'Ethics',
        'Confidentiality - Cloud Sharing', '["Ethics","Confidentiality - Cloud Sharing","F.5"]', '3rd_edition', 60, '[]',
        'published', 0, 1
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-1', 'Continuous Measurement: Frequency (Count)', 'Recording every single discrete occurrence of a target behavior during an observation period.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-2', 'Continuous Measurement: Duration', 'Measuring the total elapsed time from the onset (start) to offset (end) of a target behavior.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-3', 'Continuous Measurement: Latency', 'Elapsed time between the presentation of an antecedent stimulus (SD) and the initiation of the response.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-4', 'Continuous Measurement: Interresponse Time (IRT)', 'The amount of time elapsed between the termination of one response and the initiation of the next consecutive response.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-5', 'Discontinuous Measurement: Partial Interval Recording', 'A time sampling procedure where an interval is scored positive (+) if the behavior occurs at ANY POINT during the interval. Overestimates behavior frequency.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-6', 'Discontinuous Measurement: Whole Interval Recording', 'A time sampling procedure where an interval is scored positive (+) ONLY if the behavior persists continuously for the ENTIRE duration of the interval. Underestimates behavior.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-7', 'Discontinuous Measurement: Momentary Time Sampling', 'A time sampling procedure where the behavior is recorded ONLY if it is occurring at the precise instant the interval ends.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-8', 'Permanent Product Recording', 'Measuring the tangible physical outcome or environmental effect produced by a behavior rather than directly observing the behavior.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-9', 'Multiple Stimulus Without Replacement (MSWO)', 'A preference assessment where an array of items is presented; once an item is selected, it is removed from subsequent arrays, quickly yielding a preference hierarchy.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-10', 'Functional Behavior Assessment (ABC Data Collection)', 'Recording descriptive data on the environmental events immediately preceding (Antecedent) and immediately following (Consequence) a behavior.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-11', 'Discriminative Stimulus (SD)', 'An antecedent stimulus in the presence of which a specific response has historically been reinforced, signaling that reinforcement is currently available.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-12', 'Discrete Trial Training (DTT)', 'A structured, adult-directed teaching method broken into clear components: SD → Prompt (if needed) → Learner Response → Consequence → Inter-Trial Interval.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-13', 'Backward Chaining', 'A task analysis teaching procedure where the therapist completes all early steps, and the learner is taught and reinforced on the LAST step first.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-14', 'Stimulus Generalization', 'When a trained response occurs in the presence of novel, untrained stimuli that share similar physical properties.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-15', 'Differential Reinforcement of Alternative Behavior (DRA)', 'Reinforcing a desirable, functionally equivalent replacement behavior while placing the problem behavior on extinction.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-16', 'Differential Reinforcement of Other Behavior (DRO)', 'Delivering reinforcement contingent on the complete ABSENCE (zero occurrences) of the problem behavior throughout a specified time interval.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-17', 'Extinction Burst', 'A temporary, predictable increase in the frequency, duration, intensity, or variability of the target behavior when reinforcement is first withheld.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-18', 'Objective Session Notes', 'Written documentation describing observable client topographies, percentage scores, and clinical facts without subjective opinions or unobservable mood labels.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-19', 'Dual Relationships & Gift Acceptance', 'Under the RBT Ethics Code 2.0, RBTs must avoid multiple relationships that could impair objectivity, and may not accept gifts of significant monetary value.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO flashcards (
        id, term, definition, category, task_code, box_level, certification, status
      ) VALUES (
        'fc-20', '5% Monthly Supervision Requirement', 'BACB requirement that an RBT must receive ongoing supervision for at least 5% of their total monthly behavior-analytic service hours across at least 2 synchronous contacts.', NULL, NULL, 1, 'RBT', 'published'
      );
INSERT OR REPLACE INTO articles (
        id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status
      ) VALUES (
        'art-rbt-2026-guide', 'complete-rbt-exam-study-guide-2026', 'Complete RBT Exam 2026 Study Guide: BACB 3rd Edition TCO Breakdown', 'A comprehensive breakdown of all 6 domains in the 2026 BACB RBT 3rd Edition Test Content Outline (TCO), including continuous measurement, ABC data, and ethics.', '# Complete RBT Exam 2026 Study Guide

*Disclaimer: RBT Practice AI is an independent test-preparation resource not affiliated with, sponsored by, or endorsed by the Behavior Analyst Certification Board® (BACB®).*

Preparing for your **Registered Behavior Technician (RBT)** examination requires a clear understanding of the 6 core domains outlined in the BACB RBT 3rd Edition Test Content Outline (TCO).

## BACB RBT Exam Domain Weightage

| Domain Code | BACB 3rd Edition TCO Domain Name | Scored Questions % | Priority Level |
| :--- | :--- | :--- | :--- |
| **Domain A** | Data Collection and Graphing | 13 Questions (17%) | High |
| **Domain B** | Behavior Assessment | 8 Questions (11%) | Medium |
| **Domain C** | Behavior Acquisition | 19 Questions (25%) | Critical |
| **Domain D** | Behavior Reduction | 14 Questions (19%) | Critical |
| **Domain E** | Documentation and Reporting | 10 Questions (13%) | High |
| **Domain F** | Ethics | 11 Questions (15%) | High |

---

## 1. Domain C: Behavior Acquisition Breakdown

Behavior Acquisition forms the largest portion of your scored exam (**25% / 19 questions**). Focus heavily on Discrete Trial Teaching (DTT), Task Analysis, and Prompting Hierarchies.

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
', 'RBT Exam Guide', '["RBT Study Guide","BACB Exam","Skill Acquisition","Ethics"]', '/banner-rbt-hero.png', 'RBT Practice AI Editorial Team', 7, 'published'
      );
INSERT OR REPLACE INTO articles (
        id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status
      ) VALUES (
        'art-25-free-questions', 'free-practice-questions-with-answers', 'RBT Practice Questions: 25 Free Questions With Answers (BACB 3rd Edition)', 'Practice with 25 free, original RBT practice questions aligned with the current BACB RBT 3rd Edition outline. Includes detailed clinical rationales and exam tips.', '# RBT Practice Questions: 25 Free Questions With Answers & Rationales

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
', 'RBT Exam Guide', '["RBT Practice Questions","BACB 3rd Edition","Free Exam Questions","Domain A-F"]', '/banner-rbt-hero.png', 'RBT Practice AI Editorial Team', 8, 'published'
      );
INSERT OR REPLACE INTO articles (
        id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status
      ) VALUES (
        'art-beginner-practice', 'beginner-practice-questions', 'RBT Practice Questions for Beginners: Step-by-Step Foundation Guide', 'New to ABA? Master introductory RBT practice questions with simple explanations, 3-term contingency breakdowns, and 10 beginner-friendly practice questions.', '# RBT Practice Questions for Beginners: Your Step-by-Step Starting Guide

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
A child hits their sibling to get access to a toy truck. What is the function of the child''s hitting behavior?
- A. Automatic Sensory
- **B. Access to Tangibles (Correct)**
- C. Escape from Demand
- D. Pain Attenuation
> **Explanation**: The behavior is maintained by obtaining a physical item (toy truck).

#### Question 4 (Domain F: Ethics)
Who is primarily responsible for creating, modifying, and updating a client''s formal Behavior Intervention Plan (BIP)?
- A. The RBT providing direct therapy
- **B. The Supervising BCBA / Clinical Supervisor (Correct)**
- C. The client''s school bus driver
- D. The front desk receptionist
> **Explanation**: RBTs implement behavior plans; only qualified BCBAs design and modify them.

---

### Next Steps for Beginners
Ready to advance? Try our [Topic-by-Topic Practice Questions](/rbt/questions/practice-questions-by-topic) or explore [Leitner Smart Flashcards](/flashcards)!
', 'Study Strategies', '["Beginner RBT","Introductory ABA","ABC Data","Reinforcement"]', '/cert-badge-bacb.png', 'RBT Practice AI Editorial Team', 6, 'published'
      );
INSERT OR REPLACE INTO articles (
        id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status
      ) VALUES (
        'art-exam-questions-answers', 'exam-questions-and-answers', 'RBT Exam Questions and Answers: Free Practice & Strategy Guide', 'Learn how to deconstruct RBT exam questions, eliminate distractors, and practice with 15 original scenario-based questions with rationales.', '# RBT Exam Questions and Answers: How to Deconstruct and Solve Exam Scenarios

*Disclaimer: RBT Practice AI is an independent exam-preparation platform not affiliated with the BACB.*

Passing the RBT exam is less about rote memorization and more about **clinical decision-making within the RBT scope**. Test questions present realistic clinical scenarios where you must identify the correct measurement tool, prompt hierarchy step, reinforcement schedule, or ethical response.

## The 3-Step Question Deconstruction Method
1. **Identify the Core Domain**: Determine whether the question is testing Measurement (A), Assessment (B), Skill Acquisition (C), Behavior Reduction (D), Documentation (E), or Ethics (F).
2. **Find the Environmental Trigger**: Look at what happened *before* the behavior (the $S^D$ or MO) and what occurred *after* (the consequence).
3. **Eliminate Non-Behavioral Distractors**: Rule out answers containing mentalistic explanations (e.g., "The client was angry," "The client felt stubborn") or actions that fall outside the RBT''s professional scope.

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
', 'RBT Exam Guide', '["Exam Questions","Test Strategies","DRL","Whole Interval"]', '/banner-rbt-hero.png', 'RBT Practice AI Editorial Team', 7, 'published'
      );
INSERT OR REPLACE INTO articles (
        id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status
      ) VALUES (
        'art-practice-test-20', 'rbt-practice-test-20-questions', 'RBT Practice Test: 20 Questions with Answer Key & Score Analyzer', 'Test your knowledge with a timed 20-question RBT mini practice test. Includes automated score interpretation, answer keys, and next-step study guides.', '# RBT Practice Test: 20 Questions with Answer Key & Score Interpretation

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
An RBT places their hands between a client''s hand and the client''s forehead to physically prevent head-hitting behavior. What intervention was used?
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
', 'RBT Exam Guide', '["Practice Test","Mini Test","Score Analyzer","Chaining"]', '/cert-badge-bacb.png', 'RBT Practice AI Editorial Team', 7, 'published'
      );
INSERT OR REPLACE INTO articles (
        id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status
      ) VALUES (
        'art-mock-exam-25', 'mock-exam-25-questions', 'RBT Mock Exam: 25 Questions with Full Clinical Rationales', 'Experience a realistic RBT mock exam with 25 mixed scenario, ethics, measurement, and skill-acquisition questions aligned with the 2026 BACB outline.', '# RBT Mock Exam: 25 Questions with Full Answer Rationales

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
', 'Clinical Scenarios', '["Mock Exam","Full Simulation","Free Operant","Graphing"]', '/banner-rbt-hero.png', 'RBT Practice AI Editorial Team', 8, 'published'
      );
INSERT OR REPLACE INTO articles (
        id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status
      ) VALUES (
        'art-questions-by-topic', 'practice-questions-by-topic', 'RBT Exam Practice Questions by Topic: 6 BACB Domains Explained', 'Study RBT practice questions categorized by the 6 BACB 3rd Edition domains: Measurement, Assessment, Skill Acquisition, Behavior Reduction, Documentation, and Ethics.', '# RBT Exam Practice Questions by Topic: The Complete 6-Domain Breakdown

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
A client''s grandmother gives the RBT a handmade drawing that the client created in therapy. Can the RBT accept this?
- A. No, RBTs can never accept anything from a client''s family.
- **B. Yes, accepting a non-monetary, handmade item of nominal value made by the client does not violate the BACB gift rule. (Correct)**
- C. Yes, but only if the RBT pays the grandmother $20.
- D. No, the RBT must report the grandmother to the BACB.
', 'RBT Exam Guide', '["Domains A-F","Topic Breakdown","Task List","MTS"]', '/cert-badge-bacb.png', 'RBT Practice AI Editorial Team', 7, 'published'
      );
INSERT OR REPLACE INTO articles (
        id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status
      ) VALUES (
        'art-questions-explanations', 'practice-questions-with-explanations', 'RBT Practice Questions With In-Depth Explanations & Rationales', 'Master difficult RBT practice questions with comprehensive breakdown: Why the correct answer is right, why distractors are wrong, and clinical exam tips.', '# RBT Practice Questions With In-Depth Explanations & Clinical Rationales

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
', 'ABA Techniques', '["Explanations","Rationales","Distractor Elimination","Partial Interval"]', '/banner-rbt-hero.png', 'RBT Practice AI Editorial Team', 6, 'published'
      );
INSERT OR REPLACE INTO articles (
        id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status
      ) VALUES (
        'art-scenario-questions', 'scenario-based-practice-questions', 'RBT Scenario-Based Practice Questions: Real-World Clinical Cases', 'Practice with 15 complex scenario-based RBT practice questions set in real clinic, school, home, and community environments with clinical rationales.', '# RBT Scenario-Based Practice Questions: Real-World Clinical Case Studies

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
', 'Clinical Scenarios', '["Scenarios","Ethics","DRI","Dual Relationships"]', '/cert-badge-bacb.png', 'RBT Practice AI Editorial Team', 7, 'published'
      );
INSERT OR REPLACE INTO articles (
        id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status
      ) VALUES (
        'art-easy-questions', 'easy-rbt-practice-questions', 'Easy RBT Practice Questions: 20 Core Definition & Foundation Probes', 'Build test-day confidence with 20 easy, introductory RBT practice questions. Learn essential definitions and basic ABA principles before advancing.', '# Easy RBT Practice Questions: Master the Fundamentals

*Disclaimer: RBT Practice AI is an independent study tool.*

Building confidence begins with mastering fundamental definitions. This quiz covers baseline terminology from the current BACB RBT 3rd Edition Test Content Outline.

---

### 5 Fast Sample Questions

1. **What is an Antecedent?**
   - **A. An event that occurs immediately *before* a behavior. (Correct)**
   - B. An event that occurs 3 days after a behavior.
   - C. A consequence that punishes behavior.
   - D. The client''s medical diagnosis.

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
', 'Study Strategies', '["Easy Questions","Glossary","Mand","Antecedent"]', '/banner-rbt-hero.png', 'RBT Practice AI Editorial Team', 5, 'published'
      );
INSERT OR REPLACE INTO articles (
        id, slug, title, summary, content, category, tags, cover_image_url, author_name, read_time_minutes, status
      ) VALUES (
        'art-hard-questions', 'hard-rbt-practice-questions', 'Hard RBT Practice Questions: 20 Advanced Clinical Scenarios', 'Challenge yourself with 20 difficult, advanced RBT practice questions featuring complex scenarios, multi-step interventions, and strict ethics boundaries.', '# Hard RBT Practice Questions: Advanced Clinical Application & Problem Solving

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
An RBT works at a clinic that requires staff to implement a 10-minute mechanical restraint protocol for non-injurious vocal whining. The RBT knows this protocol is unapproved, dangerous, and violates client dignity and the BACB Ethics Code. What is the RBT''s mandatory ethical duty?
- A. Comply with clinic policy to avoid losing their job.
- **B. Refuse to implement the unapproved, harmful procedure, immediately inform the clinical director and BCBA supervisor, and report the safety violation to appropriate protective/regulatory authorities if unaddressed. (Correct)**
- C. Complain anonymously on social media.
- D. Restrain the client for only 5 minutes instead of 10.
> **Explanation**: RBTs have a mandatory duty to uphold client welfare, client dignity, and ethical standards above unlawful clinic directives.

---

### Test Your Limits
Simulate the real exam on our [Full 85-Question RBT Mock Exam Simulator](/rbt/mock-exam)!
', 'Clinical Scenarios', '["Hard Questions","Advanced Scenarios","Response Generalization","Ethics"]', '/cert-badge-bacb.png', 'RBT Practice AI Editorial Team', 7, 'published'
      );
INSERT OR REPLACE INTO users (
      id, email, full_name, role, email_verified
    ) VALUES (
      'usr_admin_001', 'jobpegyan@gmail.com', 'Job Pegyan (Admin)', 'super_admin', 1
    );
INSERT OR REPLACE INTO profiles (
      id, user_id, full_name, role
    ) VALUES (
      'prf_admin_001', 'usr_admin_001', 'Job Pegyan (Admin)', 'super_admin'
    );