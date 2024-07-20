import { Link } from "@remix-run/react";
import type { BoardGame } from "./db.server";

export function GameDetails({ game }: { game: BoardGame }) {
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
