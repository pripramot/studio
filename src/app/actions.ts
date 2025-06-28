'use server';

import { answerQuestion, AnswerQuestionInput, AnswerQuestionOutput } from '@/ai/flows/recommend-suitable-car';

export async function getAnswer(input: AnswerQuestionInput): Promise<{ data: AnswerQuestionOutput | null; error: string | null }> {
  try {
    const result = await answerQuestion(input);
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    // Return a user-friendly error message
    return { data: null, error: 'An unexpected error occurred while getting an answer. Please try again later.' };
  }
}
