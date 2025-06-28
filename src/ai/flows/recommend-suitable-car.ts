'use server';
/**
 * @fileOverview A customer support AI agent for Rungroj Carrent.
 *
 * - answerQuestion - A function that handles answering customer questions.
 * - AnswerQuestionInput - The input type for the answerQuestion function.
 * - AnswerQuestionOutput - The return type for the answerQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionInputSchema = z.object({
  question: z.string().describe("The customer's question."),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The history of the conversation.'),
});
export type AnswerQuestionInput = z.infer<typeof AnswerQuestionInputSchema>;

const AnswerQuestionOutputSchema = z.object({
  answer: z.string().describe("The AI-generated answer to the customer's question."),
});
export type AnswerQuestionOutput = z.infer<typeof AnswerQuestionOutputSchema>;

export async function answerQuestion(
  input: AnswerQuestionInput
): Promise<AnswerQuestionOutput> {
  return customerSupportFlow(input);
}

const customerSupportFlow = ai.defineFlow(
  {
    name: 'customerSupportFlow',
    inputSchema: AnswerQuestionInputSchema,
    outputSchema: AnswerQuestionOutputSchema,
  },
  async (input) => {
    const systemPrompt = `คุณคือ "รุ่งโรจน์ AI" ผู้ช่วยแชทบอทของ "Rungroj Carrent" รถเช่าอุดรธานี
หน้าที่ของคุณคือการตอบคำถามและให้ความช่วยเหลือลูกค้าด้วยความเป็นมิตรและเป็นประโยชน์ โปรดใช้ข้อมูลต่อไปนี้ในการตอบคำถาม:

**ข้อมูลสำคัญ:**
- **เอกสารที่ต้องใช้:** สำหรับคนไทยใช้แค่ บัตรประชาชน และ ใบขับขี่
- **ค่ามัดจำ:** 3,000 - 5,000 บาท ขึ้นอยู่กับรุ่นรถที่เช่า
- **บริการพิเศษ:** เรามีบริการรับ-ส่งฟรีที่สนามบินอุดรธานี
- **ประกันภัย:** รถทุกคันมีประกันภัยชั้น 1 ฟรี
- **ประเภทเกียร์:** รถทุกคันเป็นเกียร์ออโต้เมติค
- **จุดเด่นอื่นๆ:** เราส่งรถเช่าถึงบ้านฟรีในเขตอุดรธานี, เจ้าของร้านส่งมอบรถด้วยตนเอง

**แนวทางการตอบ:**
- ตอบเป็นภาษาไทยเสมอ
- ใช้ภาษาที่สุภาพ เป็นมิตร และให้ความช่วยเหลือ
- ตอบให้กระชับและตรงประเด็น
- หากไม่ทราบคำตอบสำหรับคำถามใดๆ ให้ตอบอย่างสุภาพว่า "ขออภัยค่ะ เรื่องนี้เป็นข้อมูลที่ดิฉันยังไม่ทราบ รบกวนคุณลูกค้าติดต่อสอบถามโดยตรงกับพนักงานได้ที่เบอร์ XXX-XXX-XXXX หรือทาง Line ID: rungroj_carrent นะคะ"
`;
    
    const llmResponse = await ai.generate({
        model: 'gemini-pro',
        system: systemPrompt,
        history: input.chatHistory || [],
        prompt: input.question
    });

    return { answer: llmResponse.text };
  }
);
