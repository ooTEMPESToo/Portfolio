import { getProjectBySlug, getProjects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const image = PlaceHolderImages.find(p => p.id === project.imageUrl);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {project.name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
        
        {/* Image */}
        {image && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={image.imageUrl}
              alt={project.name}
              data-ai-hint={image.imageHint}
              width={1200}
              height={800}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Long Description and Link */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold font-headline mb-4">About this project</h2>
            <div className="prose prose-invert max-w-none text-muted-foreground">
              <p>{project.longDescription}</p>
            </div>
          </div>
          <div>
            {project.liveUrl && (
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  View Live Project <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        {/* Iframe for simple projects */}
        {project.iframeUrl && (
          <div className="mt-12">
             <h2 className="text-2xl font-bold font-headline mb-4">Live Preview</h2>
             <Card>
                <div className="aspect-video">
                  <iframe 
                    src={project.iframeUrl} 
                    title={project.name}
                    className="w-full h-full border-0 rounded-lg"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
