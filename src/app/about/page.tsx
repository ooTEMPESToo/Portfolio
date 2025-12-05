import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const skills = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL',
  'PostgreSQL', 'Docker', 'CI/CD', 'UI/UX Design', 'Figma', 'Jest'
];

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'me');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About John Doe
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Developer, Designer, and Lifelong Learner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                data-ai-hint={aboutImage.imageHint}
                width={400}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full aspect-square"
              />
            )}
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold font-headline mb-4">My Journey</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                My journey into technology started with a fascination for how things work, which quickly evolved into a passion for building applications that solve real-world problems. I thrive on the challenge of turning complex ideas into simple, beautiful, and intuitive designs.
              </p>
              <p>
                I have a strong background in full-stack development, with a focus on modern JavaScript frameworks like React and Next.js. My experience spans from building responsive front-end interfaces to designing and implementing robust back-end systems.
              </p>
              <p>
                I believe in continuous learning and am always eager to explore new technologies and methodologies. Collaboration is key to my process; I enjoy working with teams to bring a shared vision to life.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-headline">My Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map(skill => (
                  <li key={skill} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span className="text-muted-foreground">{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}