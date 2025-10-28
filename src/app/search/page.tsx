import getDB from "@/lib/db";
import Link from "next/link";

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
    <main>

      {songs.length === 0 && albums.length === 0 && authors.length === 0 && (<p className="text-center">No results</p>)}

      {songs.length > 0 && (
        <>
          <h1>Songs:</h1>
          {songs.map((song) => (
            <div key={song.id}>{song.name}</div>
          ))}
        </>
      )}

      {albums.length > 0 && (
        <>
          <h1>Albums:</h1>
          {albums.map((album) => (
            <Link className="underline block" href={`/album/${album.id}`} key={album.id}>{album.name}</Link>
          ))}
        </>
      )}

      {authors.length > 0 && (
        <>
          <h1>Authors:</h1>
          {authors.map((authors) => (
            <Link className="underline block" href={`/author/${authors.id}`} key={authors.id}>{authors.name}</Link>
          ))}
        </>
      )}
    </main>
  );
}