import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const image = PlaceHolderImages.find(p => p.id === project.imageUrl);

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          {image && (
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src={image.imageUrl}
                alt={project.name}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
               <div className="absolute top-4 right-4 bg-background/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-foreground" />
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-xl font-semibold mb-2">{project.name}</CardTitle>
          <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
