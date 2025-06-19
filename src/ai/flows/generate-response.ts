// src/ai/flows/generate-response.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating context-aware responses to received messages using an LLM, potentially incorporating calendar data.
 *
 * - generateResponse - A function that orchestrates the response generation process.
 * - GenerateResponseInput - The input type for the generateResponse function.
 * - GenerateResponseOutput - The return type for the generateResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResponseInputSchema = z.object({
  message: z.string().describe('The message received from the user.'),
  calendarData: z.string().optional().describe('Optional calendar data to include in the response generation.'),
});
export type GenerateResponseInput = z.infer<typeof GenerateResponseInputSchema>;

const GenerateResponseOutputSchema = z.object({
  response: z.string().describe('The generated response to the message.'),
});
export type GenerateResponseOutput = z.infer<typeof GenerateResponseOutputSchema>;

export async function generateResponse(input: GenerateResponseInput): Promise<GenerateResponseOutput> {
  return generateResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResponsePrompt',
  input: {schema: GenerateResponseInputSchema},
  output: {schema: GenerateResponseOutputSchema},
  prompt: `You are a helpful virtual assistant. Generate a response to the following message:

Message: {{{message}}}

{{#if calendarData}}
Here is some relevant calendar data that may be helpful in generating the response:
{{{calendarData}}}
{{/if}}
`,
});

const generateResponseFlow = ai.defineFlow(
  {
    name: 'generateResponseFlow',
    inputSchema: GenerateResponseInputSchema,
    outputSchema: GenerateResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
