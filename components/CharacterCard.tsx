export default function CharacterCard({ character, favorites }) {
  const isFav = favorites.includes(character.id);
  return (
    <div class = "characterCard" style="display:flex;">
        <div>
            <a href={`/characters/${character.id}`}>
            <img src={character.image} alt={character.name} width={100} />
            </a>
            <form method="POST" action="/favs">
            <input type="hidden" name="id" value={character.id} />
            <button type="submit">
                {isFav ? "fav" : "no fav"}
            </button>
            </form>

        </div>
        
    </div>
  );
}