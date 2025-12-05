'use server';

import { aiProjectSuggestions, AIProjectSuggestionsInput } from '@/ai/flows/ai-project-suggestions';
import { z } from 'zod';

const suggestionSchema = z.object({
  componentDescription: z.string().optional(),
  componentDataUri: z.string().optional(),
});

export type FormState = {
  message: 'success' | 'error' | 'idle';
  suggestions?: string;
  issues?: string[];
};

export async function getSuggestion(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const componentDescription = formData.get('componentDescription') as string;
  const componentDataUri = formData.get('componentDataUri') as string;

  const validatedFields = suggestionSchema.safeParse({
    componentDescription,
    componentDataUri,
  });

  if (!validatedFields.success) {
    return {
      message: 'error',
      issues: validatedFields.error.issues.map((issue) => issue.message),
    };
  }
  
  const { componentDataUri: dataUri, componentDescription: desc } = validatedFields.data;

  if (!desc?.trim() && !dataUri?.trim()) {
      return {
          message: 'error',
          issues: ['Please provide either a description or a screenshot.'],
      }
  }

  try {
    const input: AIProjectSuggestionsInput = validatedFields.data;
    const result = await aiProjectSuggestions(input);
    return {
      message: 'success',
      suggestions: result.suggestions,
    };
  } catch (e) {
    const error = e as Error;
    return {
      message: 'error',
      issues: [error.message || 'An unknown error occurred.'],
    };
  }
}
