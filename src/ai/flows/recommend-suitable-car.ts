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
  prompt: `จากวัตถุประสงค์การใช้งาน: {{{intendedUse}}}, ความต้องการพิเศษ: {{{preferences}}}, และระยะทาง: {{{distance}}} กิโลเมตร, โปรดแนะนำรถที่เหมาะสมที่สุดจากตัวเลือกต่อไปนี้:

Honda City
Toyota Yaris Ativ
Nissan Almera
Suzuki Swift
Ford Ranger Raptor
ISUZU D-MAX CAB
Toyota Veloz
Pajero Sport Elite Edition
Mitsubishi Xpander Cross
Isuzu MU-X

โปรดอธิบายว่าทำไมรถที่แนะนำจึงเป็นตัวเลือกที่เหมาะสมที่สุด ตอบกลับเป็นภาษาไทยและให้ข้อมูลกระชับ เหมาะสมกับตลาดในประเทศไทย
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
