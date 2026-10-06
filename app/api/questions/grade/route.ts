import { NextRequest, NextResponse } from 'next/server';
import { fetchQuestionByIdOrCodeAsync } from '@/lib/master-question-bank-server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface GradeAnswer {
  questionId: string;
  selectedOptionId?: string;
}

/**
 * Server-side grading. The public question endpoints no longer ship
 * correct answers to the browser; the client submits the answers it has
 * actually chosen and only then receives correctness + rationales.
 *
 * Body: { answers: [{ questionId, selectedOptionId }] }
 *   or: { answers: { [questionId]: selectedOptionId } }
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      answers?: unknown;
      questionId?: string;
      selectedOptionId?: string;
    };

    let answers: GradeAnswer[] = [];
    if (Array.isArray(body?.answers)) {
      answers = body.answers as GradeAnswer[];
    } else if (body?.answers && typeof body.answers === 'object') {
      answers = Object.entries(body.answers as Record<string, string>).map(
        ([questionId, selectedOptionId]) => ({ questionId, selectedOptionId })
      );
    } else if (body?.questionId) {
      answers = [{ questionId: body.questionId, selectedOptionId: body.selectedOptionId }];
    }

    if (answers.length === 0) {
      return NextResponse.json({ error: 'No answers provided for grading' }, { status: 400 });
    }
    if (answers.length > 200) {
      return NextResponse.json({ error: 'Too many answers in a single grading request' }, { status: 400 });
    }

    const results: Record<
      string,
      {
        correctOptionId: string;
        isCorrect: boolean;
        answerExplanation: string;
        clinicalExplanation: string;
        optionExplanations: Record<string, string>;
      }
    > = {};

    let correctCount = 0;

    for (const answer of answers) {
      const questionId = (answer?.questionId || '').toString().trim();
      if (!questionId) continue;

      const question = await fetchQuestionByIdOrCodeAsync(questionId);
      if (!question) continue;

      const correctOptionId =
        question.correctAnswerId ||
        question.options?.find((opt) => opt.isCorrect)?.id ||
        '';

      const optionExplanations: Record<string, string> = {};
      (question.options || []).forEach((opt) => {
        if (opt.explanation) optionExplanations[opt.id] = opt.explanation;
      });

      const isCorrect = Boolean(
        correctOptionId && answer.selectedOptionId && answer.selectedOptionId === correctOptionId
      );
      if (isCorrect) correctCount++;

      results[questionId] = {
        correctOptionId,
        isCorrect,
        answerExplanation: question.answerExplanation || '',
        clinicalExplanation: question.clinicalExplanation || '',
        optionExplanations,
      };
    }

    return NextResponse.json({
      success: true,
      results,
      total: Object.keys(results).length,
      correctCount,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to grade answers',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
