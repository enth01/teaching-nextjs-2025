"use client"

import { removeSongFromPlaylist } from "@/actions/playlists"

export default function RemoveButton(props: { songId: number; playlistId: number }) {
  return <button onClick={() => { removeSongFromPlaylist(props.songId, props.playlistId) }}>Remove</button>
}