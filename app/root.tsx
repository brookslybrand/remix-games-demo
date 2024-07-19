import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { db } from "./db.server";

export async function loader() {
  const games = await db.getBoardGames();
  return { games };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { games } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto p-4 flex gap-4">
      <nav className="w-[400px]">
        <ul className="space-y-4">
          {games.map((game) => (
            <li key={game.id} className="p-4 border rounded shadow">
              <Link
                to={`/games/${game.id}`}
                className="text-blue-500 hover:underline"
              >
                <h2 className="text-xl font-semibold">{game.name}</h2>
              </Link>
              <p>{game.description}</p>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </main>
  );
}
