'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExamSession, ExamResult, Question } from '@/types/exam';
import { ExamService } from '@/services/exam-service';

export function useExam(mode: 'diagnostic' | 'full_mock' | 'domain_focus' = 'full_mock') {
  const [session, setSession] = useState<ExamSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [result, setResult] = useState<ExamResult | null>(null);

  // Initialize exam session on mount
  useEffect(() => {
    const newSession = ExamService.createExamSession(mode);
    setSession(newSession);
  }, [mode]);

  // Countdown timer effect
  useEffect(() => {
    if (!session || session.isFinished || session.timeRemainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setSession((prev) => {
        if (!prev) return null;
        if (prev.timeRemainingSeconds <= 1) {
          clearInterval(timer);
          const finishedSession: ExamSession = { ...prev, timeRemainingSeconds: 0, isFinished: true };
          setResult(ExamService.calculateResults(finishedSession));
          return finishedSession;
        }
        return {
          ...prev,
          timeRemainingSeconds: prev.timeRemainingSeconds - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session?.isFinished]);

  const selectAnswer = useCallback((questionId: string, optionId: 'A' | 'B' | 'C' | 'D') => {
    setSession((prev) => {
      if (!prev) return null;
      const existingAnswer = prev.userAnswers[questionId] || {
        questionId,
        selectedOptionId: null,
        isFlagged: false,
        timeSpentSeconds: 0,
      };

      return {
        ...prev,
        userAnswers: {
          ...prev.userAnswers,
          [questionId]: {
            ...existingAnswer,
            selectedOptionId: optionId,
          },
        },
      };
    });
  }, []);

  const toggleFlag = useCallback((questionId: string) => {
    setSession((prev) => {
      if (!prev) return null;
      const existingAnswer = prev.userAnswers[questionId] || {
        questionId,
        selectedOptionId: null,
        isFlagged: false,
        timeSpentSeconds: 0,
      };

      return {
        ...prev,
        userAnswers: {
          ...prev.userAnswers,
          [questionId]: {
            ...existingAnswer,
            isFlagged: !existingAnswer.isFlagged,
          },
        },
      };
    });
  }, []);

  const finishExam = useCallback(() => {
    setSession((prev) => {
      if (!prev) return null;
      const finished: ExamSession = { ...prev, isFinished: true };
      setResult(ExamService.calculateResults(finished));
      return finished;
    });
  }, []);

  const currentQuestion: Question | null = session ? session.questions[currentQuestionIndex] || null : null;

  return {
    session,
    currentQuestion,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectAnswer,
    toggleFlag,
    finishExam,
    result,
  };
}
