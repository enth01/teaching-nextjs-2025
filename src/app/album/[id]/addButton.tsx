"use client"

import { addSong } from "@/actions/playlists"

export default function AddButton(props: { playlistId: number, songId: number, playlistName: string }) {
  return <button onClick={() => { addSong(props.playlistId, props.songId) }}>Add to {props.playlistName}</button>
}
