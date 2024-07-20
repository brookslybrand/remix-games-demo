import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

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
  // const { games } = useLoaderData<typeof loader>();
  const games = [];

  return (
    <main className="container mx-auto p-4 flex gap-4">
      <nav className="w-[400px]">
        <ul className="space-y-4">
          {games.map((game) => (
            <li key={game.id} className="p-4 border rounded shadow">
              <span className="text-xl font-semibold">{game.name}</span>
              <p>{game.description}</p>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}

// -------------- code for cheaters --------------

// className="text-blue-500 hover:underline"
// <Link to={`/games/${game.id}`} className="text-blue-500 hover:underline">
// <div><Outlet /></div>
