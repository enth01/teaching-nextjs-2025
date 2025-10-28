import Image from "next/image";
import Link from "next/link";
import getDB from "@/lib/db";
import { faker } from "@faker-js/faker";

export default async function Home() {
  const join = await getDB()
    .selectFrom("authors")
    .innerJoin("albums", "albums.author_id", "authors.id")
    .select([
      "albums.name as album_name",
      "authors.name as author_name",
      "albums.id as album_id",
      "authors.id as author_id",
    ])
    .execute();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          alt="logo"
          width={64}
          height={64}
          style={{ borderRadius: "50%", margin: "0 auto" }}
          src="/spotify.png"
        />
        <p
          className="text-4xl font-bold"
          style={{ textAlign: "center", width: "100%" }}
        >
          Spotify
        </p>

        <div>
          {join.map((join) => (
            <div
              style={{
                textAlign: "center",
                border: "1px solid grey",
                borderRadius: "8px",
                margin: "2rem 0",
                padding: "2rem 0",
              }}
              key={join.album_id}
            >
              <Image
                width={128}
                height={128}
                unoptimized
                style={{ margin: "1rem auto", width: "128px", height: "128px" }}
                src={faker.image.url()}
                alt="cover"
              />
              <p>
                {join.album_name} - {join.author_name}
              </p>

              <Link
                style={{ textDecoration: "underline" }}
                href={`/album/${join.album_id}`}
              >
                Detail albumu
              </Link>
              <br />
              <Link
                style={{ textDecoration: "underline" }}
                href={`/author/${join.author_id}`}
              >
                Detail autora
              </Link>
            </div>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </div>
  );
}
