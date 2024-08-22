// app/routes/games.$id.tsx
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  useLoaderData,
  Link,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { db } from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const gameId = Number(params.id);

  const game = await db.getBoardGameById(gameId);

  if (!game) {
    throw new Response("Game not found", { status: 404 });
  }

  return { game };
}

export default function GameDetail() {
  const { game } = useLoaderData<typeof loader>();

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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
