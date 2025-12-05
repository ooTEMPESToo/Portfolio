import { SuggestionForm } from '@/components/suggestion-form';
import { Lightbulb } from 'lucide-react';

export default function SuggestionPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="bg-primary/10 p-3 rounded-full mb-4">
          <Lightbulb className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          AI Project Suggestions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Stuck on a component? Get AI-powered suggestions to improve your code, styling, and overall design. Provide a description, a screenshot, or both!
        </p>
      </div>

      <SuggestionForm />
    </div>
  );
}
