import { Handlers, PageProps } from "$fresh/server.ts";
import { getFavorites } from "../../lib/api.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const id = ctx.params.id;
    const res = await fetch("https://hp-api.onrender.com/api/character/" + id);
    const character = await res.json();
    const favorites = getFavorites(req.headers.get("cookie") || "");
    return ctx.render({ character, favorites });
  },
};

export default function CharacterPage({ data }: PageProps) {
  const { character, favorites } = data;
  const isFav = favorites.includes(character.id);

  return (
    
    <div>
        <div style="background-color: grey;">
            <button> Todos </button><button> Favoritos</button>
        </div>
        <h2>{data.id}</h2>
      <a href="/">Volver</a>
      
      <form method="POST" action="/favs">
            <input type="hidden" name="id" value={character.id} />
            <button type="submit">
                {isFav ? "fav" : "no fav"}
            </button>
        </form>

    </div>
  );
}