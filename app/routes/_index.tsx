import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Games" },
    { name: "description", content: "Get Gaming" },
  ];
};

export default function Index() {
  return <h1 className="text-2xl font-bold mb-4">Select a Game 👈</h1>;
}
