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

const recommendCarFlow = ai.defineFlow(
  {
    name: 'recommendCarFlow',
    inputSchema: RecommendCarInputSchema,
    outputSchema: RecommendCarOutputSchema,
  },
  async (input) => {
    const carList = vehicles.map(v => `- ${v.name}: ประเภท ${v.type}, ${v.seats} ที่นั่ง, เหมาะสำหรับ ${v.useCases}`).join('\n');

    const prompt = `คุณเป็น AI ผู้เชี่ยวชาญด้านรถเช่าชื่อ "รุ่งโรจน์ AI"
    หน้าที่ของคุณคือการแนะนำรถที่เหมาะสมที่สุด 1 คันจากรายการ ให้กับลูกค้าตามวัตถุประสงค์ที่พวกเขาเลือก

    **วัตถุประสงค์ของลูกค้า:**
    "{{purpose}}"

    **รายการรถทั้งหมดของเรา:**
    ${carList}

    **คำสั่ง:**
    1.  วิเคราะห์วัตถุประสงค์ของลูกค้า
    2.  เลือกรถที่เหมาะสมที่สุด **เพียง 1 คัน** จากรายการด้านบน
    3.  สร้างคำแนะนำสั้นๆ ที่เป็นมิตร (ไม่เกิน 2-3 ประโยค) เป็นภาษาไทยเพื่ออธิบายว่าทำไมรถคันนี้ถึงเป็นตัวเลือกที่ดีที่สุด
    4.  ในคำแนะนำต้องระบุชื่อรถยนต์ให้ชัดเจน
    5.  ส่งคืนข้อมูลในรูปแบบ JSON ที่กำหนด โดยต้องมีฟิลด์ "recommendation" ที่เป็นคำแนะนำ และ "recommendedCar" ที่เป็นชื่อรถ (ต้องตรงกับชื่อในรายการเป๊ะๆ)

    **ตัวอย่าง:**
    - ถ้าลูกค้าเลือก "เดินทางกับครอบครัวใหญ่", คุณอาจจะแนะนำ "Toyota Veloz" หรือ "Pajero Sport Elite edition"
    - ถ้าลูกค้าเลือก "ขับในเมือง ประหยัดน้ำมัน", คุณอาจจะแนะนำ "Honda City Turbo" หรือ "New Yaris Sport"

    สำคัญมาก: ต้องแนะนำรถแค่คันเดียวเท่านั้น`;
    
    const { output } = await ai.generate({
        model: 'gemini-pro',
        prompt: prompt,
        input: { purpose: input.purpose },
        output: {
            schema: RecommendCarOutputSchema,
        }
    });

    if (!output) {
      throw new Error("AI failed to generate a recommendation.");
    }

    return output;
  }
);
