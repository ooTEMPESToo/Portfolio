import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gamepad2 } from "lucide-react";

const games = [
  {
    id: "snake",
    name: "Retro Snake",
    description: "The classic Nokia era game rebuilt with React.",
    playUrl: "/games/snake", // You would create this route
    thumbnail: "/images/snake-thumb.png",
  },
  // Add more games here
];

export default function GamesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="bg-primary/10 p-3 rounded-full mb-4 w-fit mx-auto">
          <Gamepad2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-4xl font-bold">Game Arcade</h1>
        <p className="text-muted-foreground mt-4">
          Interactive experiences and mini-games.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card key={game.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle>{game.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{game.description}</p>
              <Button asChild className="w-full">
                <Link href={game.playUrl}>Play Now</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
