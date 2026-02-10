"use server"

import getDB from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function skip(song_id: number) {
  await getDB()
    .insertInto("playback_events")
    .values({
      name: "skip",
      date: Date.now(),
      user_id: 1,
      song_id: song_id,
    })
    .execute();
    revalidatePath("history");
}

export async function pausee(song_id: number) {
  await getDB()
    .insertInto("playback_events")
    .values({
      name: "pause",
      date: Date.now(),
      user_id: 1,
      song_id: song_id,
    })
    .execute();
    revalidatePath("history");
}

export async function play(song_id: number) {
  await getDB()
    .insertInto("playback_events")
    .values({
      name: "play",
      date: Date.now(),
      user_id: 1,
      song_id: song_id,
    })
    .execute();
    revalidatePath("history");
}

export async function playback_start(song_id: number) {
  await getDB()
    .insertInto("playback_events")
    .values({
      name: "playback_start",
      date: Date.now(),
      user_id: 1,
      song_id: song_id,
    })
    .execute();
    revalidatePath("history");
}

export async function playback_end(song_id: number) {
  await getDB()
    .insertInto("playback_events")
    .values({
      name: "playback_end",
      date: Date.now(),
      user_id: 1,
      song_id: song_id,
    })
    .execute();
    revalidatePath("history");
}