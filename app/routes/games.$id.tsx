// app/routes/games.$id.tsx
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const gameId = Number(params.id);
  return db.getBoardGameById(gameId);
}

export default function GameDetail() {
  const game = useLoaderData<typeof loader>();

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{game.name}</h1>
      <p>{game.description}</p>
      <p>
        Players: {game.minPlayers} - {game.maxPlayers}
      </p>
      {game.playTime && <p>Play Time: {game.playTime} minutes</p>}
      <Link
        to={`/games/${game.id}/edit`}
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        Edit Game
      </Link>
    </div>
  );
}
