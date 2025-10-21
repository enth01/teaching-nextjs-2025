"use client";
import Link from "next/link";
import { useState } from "react";

export function NavBar() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href={"/"}>Domov</Link>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <Link
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
