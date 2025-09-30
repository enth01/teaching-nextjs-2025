import getDB from "@/lib/db";

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

  return(
    <div>
      <h1 style={{fontSize: "2rem"}}>{album[0].name}</h1>
      <ul>
        {songs.map(song => (
          <li key={song.id}>
            <p>{song.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}