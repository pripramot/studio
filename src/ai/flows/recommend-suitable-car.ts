'use server';
/**
 * @fileOverview เอเจนต์ AI ที่แนะนำรถยนต์ที่เหมาะสมตามวัตถุประสงค์การใช้งานของผู้ใช้
 *
 * - recommendSuitableCar - ฟังก์ชันที่จัดการกระบวนการแนะนำรถยนต์
 * - RecommendSuitableCarInput - ประเภทข้อมูลอินพุตสำหรับฟังก์ชัน recommendSuitableCar
 * - RecommendSuitableCarOutput - ประเภทข้อมูลผลลัพธ์สำหรับฟังก์ชัน recommendSuitableCar
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSuitableCarInputSchema = z.object({
  purpose: z
    .string()
    .describe(
      'วัตถุประสงค์หลักในการเช่ารถของผู้ใช้'
    ),
});

export type RecommendSuitableCarInput = z.infer<typeof RecommendSuitableCarInputSchema>;

const RecommendSuitableCarOutputSchema = z.object({
  carRecommendation: z.string().describe('รุ่นรถที่แนะนำ'),
  suitabilityExplanation: z
    .string()
    .describe('คำอธิบายว่าทำไมรถที่แนะนำจึงเหมาะสม'),
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
  prompt: `จากวัตถุประสงค์การใช้งาน: {{{purpose}}}, โปรดแนะนำรถที่เหมาะสมที่สุดจากตัวเลือกต่อไปนี้:

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

กรุณาอธิบายว่าทำไมรถที่แนะนำจึงเป็นตัวเลือกที่เหมาะสมที่สุด โปรดตอบเป็นภาษาไทย และให้ข้อมูลที่กระชับ
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
