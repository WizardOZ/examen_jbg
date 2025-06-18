export function getFavorites(name: string): string[] {
  const match = /favorites=([^;]*)/.exec(name);
  return match?.[1]?.split(",") ?? [];
}

export function getFavoritesFromCookie(cookie: string): string[] {
  const match = cookie.match(/favorites=([^;]*)/);
  if (!match || !match[1]) return [];
  return decodeURIComponent(match[1]).split(",");
}

export function setFavoritesCookie(favs: string[]): string {
  const value = encodeURIComponent(favs.join(","));
  return `favorites=${value}; Path=/; HttpOnly; SameSite=Lax`;
}

