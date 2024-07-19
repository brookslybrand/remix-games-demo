// app/routes/games.$id.edit.tsx
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, redirect, Form, json } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const gameId = parseInt(params.id as string, 10);
  return db.getBoardGameById(gameId);
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (typeof params.id !== "string") {
    return { error: "Invalid game ID." };
  }
  const gameId = parseInt(params.id, 10);
  if (isNaN(gameId)) {
    return { error: "Game ID must be a number." };
  }

  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const minPlayers = parseInt(formData.get("minPlayers")?.toString() || "", 10);
  const maxPlayers = parseInt(formData.get("maxPlayers")?.toString() || "", 10);
  const playTime = parseInt(formData.get("playTime")?.toString() || "", 10);

  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    isNaN(minPlayers) ||
    isNaN(maxPlayers) ||
    isNaN(playTime)
  ) {
    return json({ error: "Invalid form data." }, 400);
  }

  db.updateBoardGame(gameId, {
    name,
    description,
    minPlayers,
    maxPlayers,
    playTime,
  });

  return redirect(`/games/${gameId}`);
}

export default function EditGame() {
  const game = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto p-4 w-[300px]">
      <h1 className="text-2xl font-bold mb-4">Edit {game.name}</h1>
      <Form method="post">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue={game.name}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={game.description}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="min-players"
            className="block text-sm font-medium text-gray-700"
          >
            Min Players
          </label>
          <input
            id="min-players"
            type="number"
            name="minPlayers"
            defaultValue={game.minPlayers}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="max-players"
            className="block text-sm font-medium text-gray-700"
          >
            Max Players
          </label>
          <input
            id="max-players"
            type="number"
            name="maxPlayers"
            defaultValue={game.maxPlayers}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="play-time"
            className="block text-sm font-medium text-gray-700"
          >
            Play Time (minutes)
          </label>
          <input
            id="play-time"
            type="number"
            name="playTime"
            defaultValue={game.playTime}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Save
        </button>
      </Form>
    </div>
  );
}
