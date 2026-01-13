"use server"

import getDB from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function removeSongFromPlaylist(songId: number, playlistId: number) {
  console.log(`Removing song ${songId} from playlist ${playlistId}`);
  const db = getDB();
  await db.deleteFrom('playlists_songs').where('song_id', '=', songId).where('playlist_id', '=', playlistId).execute();
  revalidatePath("playlist/" + playlistId);
}

export async function removePlaylist(playlistId: number) {
  console.log(`Removing playlist ${playlistId}`);
  const db = getDB();
  await db.deleteFrom('playlists_songs').where('playlist_id', '=', playlistId).execute();
  await db.deleteFrom('playlists').where('id', '=', playlistId).execute();
  revalidatePath("playlists");
}

export async function addSong(playlistId: number, song_id: number) {
  console.log(`adding song ${song_id} to playlist ${playlistId}`);
  const db = getDB();
  const exists = await db.selectFrom('playlists_songs').where('playlist_id', '=', playlistId).where('song_id', '=', song_id).selectAll().executeTakeFirst();
  if (exists) return;
  await db.insertInto('playlists_songs').values({ playlist_id: playlistId, song_id: song_id }).execute();
}

export async function changePlaylistName(playlistId: number, name: string) {
  console.log(`Changing playlist ${playlistId} name`);
  const db = getDB();
  await db.updateTable('playlists').set({ name: name }).where('id', '=', playlistId).execute();
}

export async function addPlaylist(name: string, user_id: number) {
  console.log(`Adding playlist ${name}`);
  const db = getDB();
  await db
    .insertInto("playlists")
    .values({
      name:  name,
      user_id: user_id
    })
    .execute();
}
