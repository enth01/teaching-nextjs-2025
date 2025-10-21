import getDB from "@/lib/db";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const q = await searchParams;
  const query = q.q;

  const songs = await getDB()
    .selectFrom("songs")
    .selectAll()
    .where("name", "like", `%${query}%`)
    .execute();

  const albums = await getDB()
    .selectFrom("albums")
    .selectAll()
    .where("name", "like", `%${query}%`)
    .execute();

  const authors = await getDB()
    .selectFrom("authors")
    .selectAll()
    .where("name", "like", `%${query}%`)
    .execute();

  return (
    <div>
      <h1>songs:</h1>
      {songs.map((song) => (
        <div key={song.id}>{song.name}</div>
      ))}

      <br />

      <h1>albums:</h1>
      {albums.map((album) => (
        <div key={album.id}>{album.name}</div>
      ))}

      <br />

      <h1>authors:</h1>
      {authors.map((authors) => (
        <div key={authors.id}>{authors.name}</div>
      ))}
    </div>
  );
}
