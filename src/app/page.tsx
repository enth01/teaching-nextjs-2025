import { DB } from "@/lib/db-types";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import Image from "next/image";

export default async function Home() {
  const dialect = new SqliteDialect({ database: new SQLite("db.sqlite") });
  const db = new Kysely<DB>({ dialect });
  const join = await db
  .selectFrom('authors')
  .innerJoin('albums', 'albums.author_id', 'authors.id')
  .select(['albums.name as album_name', 'authors.name as author_name', 'albums.id as album_id'])
  .execute()

  console.log(join)

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image alt="logo" width={64} height={64} src="/spotify.png" />
        <p className="text-4xl font-bold">Spotify</p>

        <div>
          {join.map(join => (
          <div key={join.album_id}><Image width={128} height={128} src="/cover.jpg" alt="cover" />{join.album_name} - {join.author_name}</div>
          ))}
        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </div>
  );
}
