import Link from "next/link";
import getDB from "@/lib/db";

export default async function AuthorDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const author = await getDB()
  .selectFrom('authors')
  .selectAll()
  .where('id', '=', Number(id))
  .execute()

  const albums = await getDB()
  .selectFrom('albums')
  .selectAll()
  .where('author_id', '=', Number(id))
  .execute()

  return(
    <div>
      <h1 style={{fontSize: "2rem"}}>{author[0].name}</h1>
      <p>bio:{author[0].bio}</p>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            <p>{album.name} <Link href={`/album/${album.id}`}>link</Link> </p>
          </li>
        ))}
      </ul>
    </div>
  );
}