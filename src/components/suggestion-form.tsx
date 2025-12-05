'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { getSuggestion, type FormState } from '@/app/suggest/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2, Sparkles, UploadCloud } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
         <Sparkles className="mr-2 h-4 w-4" />
          Get Suggestions
        </>
      )}
    </Button>
  );
}

export function SuggestionForm() {
  const initialState: FormState = { message: 'idle' };
  const [state, formAction] = useActionState(getSuggestion, initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit for Gemini
        alert("File size must be less than 4MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        const hiddenInput = document.getElementById('componentDataUri') as HTMLInputElement;
        if(hiddenInput) {
            hiddenInput.value = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (state.message === 'success') {
      formRef.current?.reset();
      setPreview(null);
      const hiddenInput = document.getElementById('componentDataUri') as HTMLInputElement;
      if (hiddenInput) {
        hiddenInput.value = '';
      }
    }
  }, [state.message]);


  return (
    <div>
      <Card>
        <form ref={formRef} action={formAction}>
          <CardHeader>
            <CardTitle>Submit Your Component</CardTitle>
            <CardDescription>Provide details below for AI analysis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="componentDescription">Component Description</Label>
              <Textarea
                id="componentDescription"
                name="componentDescription"
                placeholder="e.g., A login form with email, password fields, and a submit button. The layout feels a bit off."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="componentScreenshot">Component Screenshot</Label>
              <Input
                id="componentScreenshot"
                name="componentScreenshot"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
               <input type="hidden" name="componentDataUri" id="componentDataUri" />
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="h-4 w-4" />
                Upload Screenshot
              </Button>
            </div>

            {preview && (
              <div className="mt-4 border rounded-md p-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">Image Preview:</p>
                <img src={preview} alt="Screenshot preview" className="rounded-md max-h-48 w-auto mx-auto" />
              </div>
            )}
            
            {state.message === 'error' && state.issues && (
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        <ul>
                            {state.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}

          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      {state.message === 'success' && state.suggestions && (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Suggestions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                  {state.suggestions}
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
