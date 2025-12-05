'use server';

/**
 * @fileOverview AI-powered project component suggestion flow.
 *
 * - aiProjectSuggestions - A function that takes a screenshot or description of a project component and suggests improvements.
 * - AIProjectSuggestionsInput - The input type for the aiProjectSuggestions function.
 * - AIProjectSuggestionsOutput - The return type for the aiProjectSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIProjectSuggestionsInputSchema = z.object({
  componentDataUri: z
    .string()
    .optional()
    .describe(
      "A screenshot of the project component, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  componentDescription: z.string().optional().describe('A description of the project component.'),
});
export type AIProjectSuggestionsInput = z.infer<typeof AIProjectSuggestionsInputSchema>;

const AIProjectSuggestionsOutputSchema = z.object({
  suggestions: z.string().describe('AI-generated suggestions for improving the project component.'),
});
export type AIProjectSuggestionsOutput = z.infer<typeof AIProjectSuggestionsOutputSchema>;

export async function aiProjectSuggestions(input: AIProjectSuggestionsInput): Promise<AIProjectSuggestionsOutput> {
  return aiProjectSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProjectSuggestionsPrompt',
  input: {schema: AIProjectSuggestionsInputSchema},
  output: {schema: AIProjectSuggestionsOutputSchema},
  prompt: `You are an AI expert in web design, skilled at providing actionable suggestions for improving project components.

You will receive either a description or a screenshot (or both) of a project component. Analyze the provided information and suggest concrete improvements to the code or styling, leveraging insights from existing modern web designs and design standards.

Consider the overall aesthetic, responsiveness, and user experience when making your suggestions.

Component Description: {{componentDescription}}
Component Screenshot: {{#if componentDataUri}}{{media url=componentDataUri}}{{else}}No screenshot provided{{/if}}`,
});

const aiProjectSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiProjectSuggestionsFlow',
    inputSchema: AIProjectSuggestionsInputSchema,
    outputSchema: AIProjectSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
