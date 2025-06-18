import { HandlerContext } from "$fresh/server.ts";
import { getFavoritesFromCookie, setFavoritesCookie } from "../lib/api.ts";

export const handler = async (req: Request, _ctx: HandlerContext) => {
  const form = await req.formData();
  const id = form.get("id")?.toString();
  const cookie = req.headers.get("cookie") || "";
  let favorites = getFavoritesFromCookie(cookie);

  if (!id) return new Response("Missing ID", { status: 400 });

  // Toggle
  if (favorites.includes(id)) {
    favorites = favorites.filter((fav) => fav !== id);
  } else {
    favorites.push(id);
  }

  // Responder con redirección y nueva cookie
  const headers = new Headers();
  headers.set("Location", req.headers.get("Referer") || "/");
  headers.set("Set-Cookie", setFavoritesCookie(favorites));

  return new Response(null, {
    status: 303,
    headers,
  });
};
