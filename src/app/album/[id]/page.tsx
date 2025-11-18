import getDB from "@/lib/db";
import Link from "next/link";
import AddButton from "./addButton";

export default async function AlbumDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const songs = await getDB()
    .selectFrom('songs')
    .selectAll()
    .where('album_id', '=', Number(id))
    .execute()

  const album = await getDB()
    .selectFrom('albums')
    .selectAll()
    .where('id', '=', Number(id))
    .execute()

  const author = await getDB()
    .selectFrom('authors')
    .selectAll()
    .where('id', '=', album[0].author_id)
    .execute()

  const playlists = await getDB().selectFrom("playlists").selectAll().where('user_id', '=', 1).execute();

  return (
    <main>
      <h1>{album[0].name}</h1>
      <p className="text-center">autor: <Link className="underline" href={`/author/${author[0].id}`}>{author[0].name}</Link></p>
      <ul>
        {songs.map(song => (
          <li key={song.id}>
            <p>{song.name}</p>
            <details className="dropdown">
              <summary className="btn m-1">add to album</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {playlists.map(playlist => (
                  <li key={playlist.id}>
                    <AddButton playlistId={playlist.id} songId={song.id} playlistName={playlist.name} />
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </main>
  );
}