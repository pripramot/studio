'use server';

import { recommendSuitableCar, RecommendSuitableCarInput, RecommendSuitableCarOutput } from '@/ai/flows/recommend-suitable-car';

export async function getRecommendation(input: RecommendSuitableCarInput): Promise<{ data: RecommendSuitableCarOutput | null; error: string | null }> {
  try {
    const result = await recommendSuitableCar(input);
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    // Return a user-friendly error message
    return { data: null, error: 'An unexpected error occurred while generating your recommendation. Please try again later.' };
  }
}
