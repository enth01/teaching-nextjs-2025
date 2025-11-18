"use client"

import { removePlaylist } from "@/actions/playlists"

export default function RemoveButton(props: { playlistId: number }) {
  return <button onClick={() => { removePlaylist(props.playlistId) }}>Remove</button>
}
