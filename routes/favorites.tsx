import { Handlers, PageProps } from "$fresh/server.ts";
import { getFavorites } from "../lib/api.ts";
import CharacterCard from "../components/CharacterCard.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const favorites = getFavorites(req.headers.get("cookie") || "");
    const res = await fetch("https://hp-api.onrender.com/api/characters");
    const characters = await res.json();
    const filtered = characters.filter((char: any) => favorites.includes(char.id));
    return ctx.render({ characters: filtered, favorites });
  },
};

export default function Favorites({ data }: PageProps) {
  const { characters, favorites } = data;
  return (
    <div>
      <div style="background-color: grey;color:black;">
        <a href="/"> Todos </a> <a href="/favorites"> Favoritos</a>
      </div>
      {characters.map((c : string) => (
        <CharacterCard character={c} favorites={favorites} />
      ))}
    </div>
  );
}
