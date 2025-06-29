'use server';
/**
 * @fileOverview An AI agent for recommending a suitable car based on user's purpose.
 *
 * - recommendCarByPurpose - A function that handles the car recommendation process.
 * - RecommendCarInput - The input type for the function.
 * - RecommendCarOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { vehicles } from '@/lib/data';

const RecommendCarInputSchema = z.object({
  purpose: z.string().describe("The user's main purpose for renting a car."),
});
export type RecommendCarInput = z.infer<typeof RecommendCarInputSchema>;

const RecommendCarOutputSchema = z.object({
  recommendation: z.string().describe("A brief, friendly recommendation in Thai, explaining why a specific car is suitable. Mention the car name clearly."),
  recommendedCar: z.string().describe("The name of the recommended car, must match a name in the vehicle list."),
});
export type RecommendCarOutput = z.infer<typeof RecommendCarOutputSchema>;

export async function recommendCarByPurpose(
  input: RecommendCarInput
): Promise<RecommendCarOutput> {
  return recommendCarFlow(input);
}

const carList = vehicles.map(v => `- ${v.name}: Type ${v.type}, ${v.seats} seats, Use cases: ${v.useCases}`).join('\n');

const recommendCarPrompt = ai.definePrompt({
    name: 'recommendCarPrompt',
    input: { schema: RecommendCarInputSchema },
    output: { schema: RecommendCarOutputSchema },
    model: 'googleai/gemini-pro',
    config: {
        temperature: 0.3,
    },
    prompt: `You are an expert car rental AI assistant named "Rungroj AI".
Your task is to recommend ONE most suitable car from a list to a customer based on their chosen purpose.

**Customer's Purpose:**
"{{purpose}}"

**Full list of our cars:**
${carList}

**Instructions:**
1.  Analyze the customer's purpose.
2.  Choose only ONE most suitable car from the list above.
3.  Generate a short, friendly recommendation (2-3 sentences max) in Thai, explaining why this car is the best choice.
4.  The recommendation must clearly state the car's name.
5.  Ensure the recommended car name in the 'recommendedCar' field matches a name from the provided list exactly.

**Example:**
- If the customer chooses "Travel with a large family", you might recommend "Toyota Veloz" or "Pajero Sport Elite edition".
- If the customer chooses "City driving, fuel-efficient", you might recommend "Honda City Turbo" or "New Yaris Sport".

Crucially: You must recommend only one car. The language of the recommendation text must be in Thai.`,
});


const recommendCarFlow = ai.defineFlow(
  {
    name: 'recommendCarFlow',
    inputSchema: RecommendCarInputSchema,
    outputSchema: RecommendCarOutputSchema,
  },
  async (input) => {
    
    const { output } = await recommendCarPrompt(input);

    if (!output) {
      throw new Error("AI failed to generate a recommendation.");
    }
    
    // Final check to ensure the AI's recommendation is a car we actually have.
    const recommendedCarExists = vehicles.some(v => v.name === output.recommendedCar);
    if (!recommendedCarExists) {
        console.error(`AI recommended a car not in the list: ${output.recommendedCar}`);
        // This provides a more specific error than a generic failure.
        throw new Error("The AI recommended a car that is not available in our fleet. Please try rephrasing your purpose.");
    }

    return output;
  }
);
