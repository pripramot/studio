'use server';

import { recommendCarByPurpose, RecommendCarInput, RecommendCarOutput } from '@/ai/flows/recommend-suitable-car';

export async function getRecommendation(input: RecommendCarInput): Promise<{ data: RecommendCarOutput | null; error: string | null }> {
  try {
    const result = await recommendCarByPurpose(input);
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    // Return a user-friendly error message
    return { data: null, error: 'An unexpected error occurred while getting a recommendation. Please try again later.' };
  }
}
