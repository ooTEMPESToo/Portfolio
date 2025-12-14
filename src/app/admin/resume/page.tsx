'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// We dynamic import the editor to avoid "Window is not defined" errors during server render
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
);

export default function ResumeEditorPage() {
  const [value, setValue] = useState("**Start writing your resume here...**");

  // In a real app, you would fetch the current resume from your 'project-hub' or database here
  useEffect(() => {
    // Simulated fetch
    // const data = await fetch('/api/resume')...
  }, []);

  const handleSave = () => {
    console.log("Saving to database:", value);
    // Here you would send a POST request to save this Markdown
    alert("Resume saved! (Check console)");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Resume Editor</CardTitle>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardHeader>
        <CardContent>
          <div data-color-mode="light">
            <MDEditor
              value={value}
              onChange={(val) => setValue(val || '')}
              height={500}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}