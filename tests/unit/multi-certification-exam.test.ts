import { describe, it, expect } from 'vitest';
import { CERTIFICATION_CONFIGS, getCertificationConfig, isValidCertification } from '@/lib/certifications-config';
import { BCBA_TASK_LIST_6TH_EDITION } from '@/lib/bcba-task-list';
import { BCABA_TASK_LIST } from '@/lib/bcaba-task-list';
import { BACB_TASK_LIST_3RD_EDITION } from '@/lib/bacb-task-list';
import { convertMasterQuestionsToExamQuestions, generateExamQuestions } from '@/lib/sample-questions';
import { ExamService } from '@/services/exam-service';
import { MasterQuestion } from '@/types/master-question';

describe('Multi-Certification Exam Engine & Certification Isolation', () => {
  // Mock master questions dataset with distinct certifications
  const mockMasterQuestions: MasterQuestion[] = [
    {
      id: 'rbt-q1',
      certification: 'RBT',
      question: 'What is a continuous measurement procedure in RBT practice?',
      questionType: 'multiple_choice',
      difficulty: 'medium',
      options: [
        { id: 'A', text: 'Frequency count', isCorrect: true },
        { id: 'B', text: 'Partial interval', isCorrect: false },
        { id: 'C', text: 'Whole interval', isCorrect: false },
        { id: 'D', text: 'MTS', isCorrect: false },
      ],
      correctAnswerId: 'A',
      answerExplanation: 'Frequency is continuous.',
      clinicalExplanation: 'Measures every instance.',
      references: 'BACB RBT 3rd Edition TCO Item A-02',
      category: 'Data Collection and Graphing',
      keywords: ['measurement'],
      taskListVersion: '3rd_edition',
      estimatedTimeSeconds: 60,
      tags: ['RBT', 'Measurement'],
      status: 'published',
      isPremium: false,
      isFeatured: false,
      version: 1,
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'bcba-q1',
      certification: 'BCBA',
      question: 'When a behavior analyst assumes that the universe is a lawful and orderly place, which philosophical assumption is being upheld?',
      questionType: 'multiple_choice',
      difficulty: 'hard',
      options: [
        { id: 'A', text: 'Determinism', isCorrect: true },
        { id: 'B', text: 'Empiricism', isCorrect: false },
        { id: 'C', text: 'Parsimony', isCorrect: false },
        { id: 'D', text: 'Pragmatism', isCorrect: false },
      ],
      correctAnswerId: 'A',
      answerExplanation: 'Determinism is the foundational assumption of lawfulness.',
      clinicalExplanation: 'Underlying assumption for all behavioral science.',
      references: 'BACB 6th Edition BCBA TCO Item A.2',
      category: 'A — Behaviorism and Philosophical Foundations',
      keywords: ['determinism', 'philosophical'],
      taskListVersion: '6th_edition',
      estimatedTimeSeconds: 75,
      tags: ['BCBA', 'Foundations'],
      status: 'published',
      isPremium: true,
      isFeatured: true,
      version: 1,
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'bcaba-q1',
      certification: 'BCaBA',
      question: 'Under BCBA supervision, how should an assistant analyst conduct descriptive assessment?',
      questionType: 'multiple_choice',
      difficulty: 'medium',
      options: [
        { id: 'A', text: 'Record ABC narrative data', isCorrect: true },
        { id: 'B', text: 'Modify plan without approval', isCorrect: false },
        { id: 'C', text: 'Discontinue BIP', isCorrect: false },
        { id: 'D', text: 'Ignore supervisor feedback', isCorrect: false },
      ],
      correctAnswerId: 'A',
      answerExplanation: 'Assistant analysts conduct direct observations.',
      clinicalExplanation: 'ABC data collection under supervision.',
      references: 'BACB BCaBA TCO Item C.1',
      category: 'Behavior Assessment',
      keywords: ['assessment'],
      taskListVersion: 'current',
      estimatedTimeSeconds: 60,
      tags: ['BCaBA'],
      status: 'published',
      isPremium: false,
      isFeatured: false,
      version: 1,
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  describe('1. Certification Configuration Registry', () => {
    it('should define RBT configuration with official 85 questions and active status', () => {
      const config = getCertificationConfig('RBT');
      expect(config.id).toBe('RBT');
      expect(config.officialExamQuestionCount).toBe(85);
      expect(config.officialExamDurationMinutes).toBe(90);
      expect(config.passingScorePercentage).toBe(80);
      expect(config.isEnabledForExam).toBe(true);
      expect(config.status).toBe('active');
      expect(config.domains.length).toBe(6); // A, B, C, D, E, F
    });

    it('should define BCBA configuration with 6th Edition TCO and 9 domains', () => {
      const config = getCertificationConfig('BCBA');
      expect(config.id).toBe('BCBA');
      expect(config.officialExamQuestionCount).toBe(185);
      expect(config.officialExamDurationMinutes).toBe(240);
      expect(config.passingScorePercentage).toBe(76);
      expect(config.isEnabledForExam).toBe(true);
      expect(config.status).toBe('content_expanding');
      expect(config.domains.length).toBe(9); // Domains A through I
    });

    it('should define BCaBA configuration as disabled (Coming Soon)', () => {
      const config = getCertificationConfig('BCaBA');
      expect(config.id).toBe('BCaBA');
      expect(config.isEnabledForExam).toBe(false);
      expect(config.status).toBe('coming_soon');
    });

    it('should correctly validate certification keys', () => {
      expect(isValidCertification('RBT')).toBe(true);
      expect(isValidCertification('BCBA')).toBe(true);
      expect(isValidCertification('BCaBA')).toBe(true);
      expect(isValidCertification('INVALID')).toBe(false);
      expect(isValidCertification(null)).toBe(false);
    });
  });

  describe('2. Certification Isolation & Question Filtering', () => {
    it('RBT exam conversion MUST only accept RBT questions (zero BCBA / BCaBA leak)', () => {
      const rbtQuestions = convertMasterQuestionsToExamQuestions(mockMasterQuestions, 'RBT');
      expect(rbtQuestions.length).toBe(1);
      expect(rbtQuestions[0].id).toBe('rbt-q1');
      expect(rbtQuestions[0].certification).toBe('RBT');
      expect(rbtQuestions.every((q) => q.certification === 'RBT')).toBe(true);
    });

    it('BCBA exam conversion MUST only accept BCBA questions (zero RBT / BCaBA leak)', () => {
      const bcbaQuestions = convertMasterQuestionsToExamQuestions(mockMasterQuestions, 'BCBA');
      expect(bcbaQuestions.length).toBe(1);
      expect(bcbaQuestions[0].id).toBe('bcba-q1');
      expect(bcbaQuestions[0].certification).toBe('BCBA');
      expect(bcbaQuestions[0].domainId).toBe('A'); // Mapped to BCBA Domain A
      expect(bcbaQuestions.every((q) => q.certification === 'BCBA')).toBe(true);
    });

    it('BCaBA exam conversion MUST only accept BCaBA questions', () => {
      const bcabaQuestions = convertMasterQuestionsToExamQuestions(mockMasterQuestions, 'BCaBA');
      expect(bcabaQuestions.length).toBe(1);
      expect(bcabaQuestions[0].id).toBe('bcaba-q1');
      expect(bcabaQuestions[0].certification).toBe('BCaBA');
    });

    it('generateExamQuestions MUST enforce certification filter', () => {
      const generated = generateExamQuestions(10, 'ALL', convertMasterQuestionsToExamQuestions(mockMasterQuestions, 'RBT'), 'RBT');
      expect(generated.every((q) => q.id.startsWith('rbt'))).toBe(true);
    });
  });

  describe('3. Exam Service & Scoring Isolation', () => {
    it('should generate RBT exam session with 90 min duration', () => {
      const session = ExamService.createExamSession({
        mode: 'full_mock',
        certification: 'RBT',
      });

      expect(session.certification).toBe('RBT');
      expect(session.durationSeconds).toBe(5400); // 90 mins
    });

    it('should generate BCBA exam session with 240 min duration', () => {
      const session = ExamService.createExamSession({
        mode: 'full_mock',
        certification: 'BCBA',
      });

      expect(session.certification).toBe('BCBA');
      expect(session.durationSeconds).toBe(14400); // 240 mins (4 hours)
    });

    it('should calculate RBT scoring with 6 RBT domains (A-F)', () => {
      const rbtConverted = convertMasterQuestionsToExamQuestions(mockMasterQuestions, 'RBT');
      const session = {
        id: 'test-rbt-session',
        userId: 'student-1',
        mode: 'full_mock' as const,
        certification: 'RBT' as const,
        questions: rbtConverted,
        userAnswers: {
          'rbt-q1': { questionId: 'rbt-q1', selectedOptionId: 'A' as const, isFlagged: false, timeSpentSeconds: 30 },
        },
        startedAt: new Date().toISOString(),
        durationSeconds: 5400,
        timeRemainingSeconds: 5000,
        isFinished: true,
      };

      const result = ExamService.calculateResults(session);
      expect(result.certification).toBe('RBT');
      expect(result.scorePercentage).toBe(100);
      expect(result.passed).toBe(true);
      expect(result.domainScores.length).toBe(6); // A, B, C, D, E, F
      expect(result.domainScores[0].domainId).toBe('A');
    });

    it('should calculate BCBA scoring with 9 BCBA domains (A-I)', () => {
      const bcbaConverted = convertMasterQuestionsToExamQuestions(mockMasterQuestions, 'BCBA');
      const session = {
        id: 'test-bcba-session',
        userId: 'bcba-student-1',
        mode: 'full_mock' as const,
        certification: 'BCBA' as const,
        questions: bcbaConverted,
        userAnswers: {
          'bcba-q1': { questionId: 'bcba-q1', selectedOptionId: 'A' as const, isFlagged: false, timeSpentSeconds: 45 },
        },
        startedAt: new Date().toISOString(),
        durationSeconds: 14400,
        timeRemainingSeconds: 13000,
        isFinished: true,
      };

      const result = ExamService.calculateResults(session);
      expect(result.certification).toBe('BCBA');
      expect(result.scorePercentage).toBe(100);
      expect(result.passed).toBe(true);
      expect(result.domainScores.length).toBe(9); // Domains A through I
      expect(result.domainScores[0].domainName).toContain('Behaviorism and Philosophical');
    });

    it('should support legacy sessions without certification by defaulting to RBT', () => {
      const rbtConverted = convertMasterQuestionsToExamQuestions(mockMasterQuestions, 'RBT');
      const legacySession = {
        id: 'legacy-session',
        userId: 'legacy-student',
        mode: 'full_mock' as const,
        questions: rbtConverted,
        userAnswers: {},
        startedAt: new Date().toISOString(),
        durationSeconds: 5400,
        timeRemainingSeconds: 5400,
        isFinished: false,
      };

      const result = ExamService.calculateResults(legacySession as any);
      expect(result.certification).toBe('RBT');
      expect(result.domainScores.length).toBe(6);
    });
  });
});
