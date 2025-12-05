import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProjects } from '@/lib/projects';
import ProjectCard from '@/components/project-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.slice(0, 3);
  const aboutImage = PlaceHolderImages.find(p => p.id === 'me');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-card py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Nikhil Kumar
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl md:max-w-2xl mx-auto">
            A passionate full-stack developer crafting modern, responsive, and user-friendly web applications.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/projects">View My Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">About Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Me Snippet */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-5">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  data-ai-hint={aboutImage.imageHint}
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg object-cover aspect-square"
                />
              )}
            </div>
            <div className="md:col-span-7">
              <h2 className="font-headline text-3xl font-bold text-foreground">About Me</h2>
              <p className="mt-4 text-muted-foreground text-base leading-relaxed">
                I'm a developer with a knack for creating engaging digital experiences. With a foundation in modern web technologies, I focus on building scalable solutions and beautiful interfaces. My goal is to write clean, efficient code that translates into seamless user interactions.
              </p>
              <p className="mt-4 text-muted-foreground text-base leading-relaxed">
                Beyond coding, I'm always exploring new design trends and looking for innovative ways to solve problems.
              </p>
              <Button asChild variant="link" className="mt-4 px-0 text-accent-foreground/80 hover:text-accent-foreground">
                <Link href="/about">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold text-foreground">Featured Projects</h2>
            <p className="mt-2 text-muted-foreground md:max-w-xl mx-auto">
              Here are a few projects I'm proud of. Check out my projects page for a full list.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
