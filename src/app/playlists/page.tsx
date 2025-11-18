import getDB from "@/lib/db";
import Link from "next/link";
import RemoveButton from "./removeButton";

export default async function PlaylistsPage() {
  const playlists = await getDB().selectFrom("playlists").selectAll().where('user_id', '=', 1).execute();

  return (
    <main>
      <h1>Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li className="underline" key={playlist.id}>
            <Link href={`/playlist/${playlist.id}`}>
              {playlist.name}
            </Link>
            <RemoveButton playlistId={playlist.id} />
          </li>
        ))}
      </ul>
    </main>
  );
}
