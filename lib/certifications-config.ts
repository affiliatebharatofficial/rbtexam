import { CertificationLevel, CertificationConfig, ExamDomain } from '@/types/certification';
import { BACB_TASK_LIST_3RD_EDITION } from './bacb-task-list';
import { BCBA_TASK_LIST_6TH_EDITION } from './bcba-task-list';
import { BCABA_TASK_LIST } from './bcaba-task-list';

/**
 * Normalized ExamDomain adapter for RBT 3rd Edition Task List
 */
const RBT_DOMAINS: ExamDomain[] = BACB_TASK_LIST_3RD_EDITION.map((d) => ({
  id: d.id,
  name: d.name,
  shortName: d.shortName,
  description: d.description,
  iconName: d.iconName,
  questionCountApprox: d.questionCountApprox,
  weightPercentage: d.weightPercentage,
  items: d.items.map((it) => ({
    id: it.id,
    domainId: it.domainId,
    title: it.title,
    description: it.description,
    keyConcepts: it.keyConcepts,
    examWeightPercentage: it.examWeightPercentage,
  })),
}));

/**
 * Centralized Certification Configuration Registry
 */
export const CERTIFICATION_CONFIGS: Record<CertificationLevel, CertificationConfig> = {
  RBT: {
    id: 'RBT',
    displayName: 'Registered Behavior Technician (RBT®)',
    shortName: 'RBT Exam Simulator',
    examStandard: 'BACB RBT 3rd Edition TCO',
    taskListVersion: '3rd_edition',
    officialExamQuestionCount: 85,
    officialExamDurationMinutes: 90,
    availableQuestionCounts: [20, 50, 85, 100],
    passingScorePercentage: 80,
    status: 'active',
    statusBadge: 'Official 85-Q Simulation Available',
    isEnabledForExam: true,
    domains: RBT_DOMAINS,
  },
  BCBA: {
    id: 'BCBA',
    displayName: 'Board Certified Behavior Analyst (BCBA®)',
    shortName: 'BCBA Practice Engine',
    examStandard: 'BACB BCBA 6th Edition TCO',
    taskListVersion: '6th_edition',
    officialExamQuestionCount: 185,
    officialExamDurationMinutes: 240,
    availableQuestionCounts: [20, 50, 100],
    passingScorePercentage: 76,
    status: 'content_expanding',
    statusBadge: 'BCBA Practice — Content Expanding (Domains A & B Available)',
    isEnabledForExam: true,
    domains: BCBA_TASK_LIST_6TH_EDITION,
  },
  BCaBA: {
    id: 'BCaBA',
    displayName: 'Board Certified Assistant Behavior Analyst (BCaBA®)',
    shortName: 'BCaBA Exam Preparation',
    examStandard: 'BACB BCaBA Current TCO',
    taskListVersion: 'current',
    officialExamQuestionCount: 160,
    officialExamDurationMinutes: 210,
    availableQuestionCounts: [20, 50, 160],
    passingScorePercentage: 78,
    status: 'coming_soon',
    statusBadge: 'Coming Soon — Question Bank in Review',
    isEnabledForExam: false,
    domains: BCABA_TASK_LIST,
  },
};

/**
 * Helper to retrieve certification configuration safely
 */
export function getCertificationConfig(cert?: string | null): CertificationConfig {
  if (cert === 'BCBA') return CERTIFICATION_CONFIGS.BCBA;
  if (cert === 'BCaBA') return CERTIFICATION_CONFIGS.BCaBA;
  return CERTIFICATION_CONFIGS.RBT;
}

/**
 * Helper to validate whether a string is a valid CertificationLevel
 */
export function isValidCertification(val: any): val is CertificationLevel {
  return val === 'RBT' || val === 'BCBA' || val === 'BCaBA';
}
