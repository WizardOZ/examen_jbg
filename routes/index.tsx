import { Handlers, PageProps } from "$fresh/server.ts";
import CharacterCard from "../components/CharacterCard.tsx";
import { getFavorites } from "../lib/api.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const res = await fetch("https://hp-api.onrender.com/api/characters");
    const characters = await res.json();
    const favorites = getFavorites(req.headers.get("cookie") || "");
    return ctx.render({ characters, favorites });
  },
};

export default function Home({ data }: PageProps) {
  const { characters, favorites } = data;
  return (
    <div >
      <div style="background-color: grey;color:black;">
        <a href="/"> Todos </a> <a href="/favorites"> Favoritos</a>
      </div>
      {characters.map((c: string) => (
        <CharacterCard character={c} favorites={favorites} />
      ))}
    </div>
  );
}