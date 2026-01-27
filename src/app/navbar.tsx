"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const handler = () => {
    router.push(`/search?q=${searchInput}`);
  }

  return (
    <div className="navbar fixed bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href={"/"}>Domov</Link>
        &nbsp;&nbsp;
        <Link href={"/playlists"}>Playlists</Link>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          name="search"
          id="search"
          className="input input-bordered w-24 md:w-auto"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handler();
            }
          }}
        />
        <Link
          style={{ lineHeight: "40px" }}
          href={{
            pathname: "/search",
            query: { q: searchInput },
          }}
        >
          search
        </Link>
      </div>
    </div>
  );
}
