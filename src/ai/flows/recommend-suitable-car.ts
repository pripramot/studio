// RecommendSuitableCar.ts
'use server';
/**
 * @fileOverview AI agent that recommends a suitable car based on user's intended use and preferences.
 *
 * - recommendSuitableCar - A function that recommends a car based on user preferences.
 * - RecommendSuitableCarInput - The input type for the recommendSuitableCar function.
 * - RecommendSuitableCarOutput - The return type for the recommendSuitableCar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSuitableCarInputSchema = z.object({
  intendedUse: z
    .string()
    .describe(
      'The intended use for the vehicle, e.g., family trip, business travel, adventure, etc.'
    ),
  preferences: z
    .string()
    .describe(
      'Specific preferences or requirements, e.g., number of passengers, luggage space, safety features, budget, etc.'
    ),
  distance: z
    .string()
    .describe(
      'The distance to be traveled in kilometers.'
    ),
});

export type RecommendSuitableCarInput = z.infer<typeof RecommendSuitableCarInputSchema>;

const RecommendSuitableCarOutputSchema = z.object({
  carRecommendation: z.string().describe('The recommended car model.'),
  suitabilityExplanation: z
    .string()
    .describe('Explanation of why the recommended car is suitable.'),
});

export type RecommendSuitableCarOutput = z.infer<typeof RecommendSuitableCarOutputSchema>;

export async function recommendSuitableCar(
  input: RecommendSuitableCarInput
): Promise<RecommendSuitableCarOutput> {
  return recommendSuitableCarFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSuitableCarPrompt',
  input: {schema: RecommendSuitableCarInputSchema},
  output: {schema: RecommendSuitableCarOutputSchema},
  prompt: `Based on the intended use: {{{intendedUse}}}, preferences: {{{preferences}}}, and the distance: {{{distance}}} kilometers, recommend the most suitable car from the following options:

  Honda City Turbo
  New Yaris Sport
  New Yaris Ativ
  Nissan Almera Sportech
  Suzuki CIAZ
  Ford Ranger Raptor
  Toyota Vigo Champ
  Toyota Veloz
  Pajero Sport Elite edition
  Mitsubishi Cross
  Mitsubishi Xpander
  Isuzu MU-X

  Explain why the car is the most suitable option.
  Make your response concise and tailored to the Thai market.
`,
});

const recommendSuitableCarFlow = ai.defineFlow(
  {
    name: 'recommendSuitableCarFlow',
    inputSchema: RecommendSuitableCarInputSchema,
    outputSchema: RecommendSuitableCarOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
