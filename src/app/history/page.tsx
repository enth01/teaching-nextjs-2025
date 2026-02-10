import getDB from "@/lib/db";

export default async function AlbumDetail() {

  const events = await getDB()
    .selectFrom('playback_events')
    .selectAll()
    .where('user_id', '=', 1)
    .execute()


  return (
    <main style={{ paddingBottom: "20rem" }}>
      <h1>History</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name}, {new Date(event.date).toDateString()}, song_id: {event.song_id}
          </li>
        ))}
      </ul>
    </main>
  );
}