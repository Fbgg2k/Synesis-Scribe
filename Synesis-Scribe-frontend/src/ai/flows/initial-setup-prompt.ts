// use server directive is required for all Genkit flows
'use server';

/**
 * @fileOverview This file defines a Genkit flow for guiding new users through the initial setup process.
 *
 * initialSetupPrompt - A function that initiates the setup process with a series of prompts generated by an LLM.
 * InitialSetupInput - The input type for the initialSetupPrompt function (currently empty).
 * InitialSetupOutput - The return type for the initialSetupPrompt function, containing the setup instructions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const InitialSetupInputSchema = z.object({})
export type InitialSetupInput = z.infer<typeof InitialSetupInputSchema>

// Define the output schema
const InitialSetupOutputSchema = z.object({
  setupInstructions: z.string().describe('Instructions for the initial setup process.'),
});
export type InitialSetupOutput = z.infer<typeof InitialSetupOutputSchema>;

// Exported function to initiate the setup process
export async function initialSetupPrompt(input: InitialSetupInput): Promise<InitialSetupOutput> {
  return initialSetupFlow(input);
}

// Define the prompt
const prompt = ai.definePrompt({
  name: 'initialSetupPrompt',
  input: {schema: InitialSetupInputSchema},
  output: {schema: InitialSetupOutputSchema},
  prompt: `You are an onboarding expert for a virtual assistant tool. Your task is to guide new users through the initial setup process.

  Generate a series of clear and concise instructions to help them configure the tool to their needs. Cover key areas such as:

  1.  Connecting to communication channels (e.g., WhatsApp, Telegram).
  2.  Setting up the LLM for response generation.
  3.  Configuring data storage (e.g., Supabase).
  4.  Integrating with external services like Google Calendar and ElevenLabs.

  Ensure the instructions are easy to follow and require minimal manual configuration. Focus on automation and user-friendliness.
  The output MUST only contain the instructions. No additional text is allowed.
  `,
});

// Define the flow
const initialSetupFlow = ai.defineFlow(
  {
    name: 'initialSetupFlow',
    inputSchema: InitialSetupInputSchema,
    outputSchema: InitialSetupOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
