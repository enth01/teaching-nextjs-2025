"use client"
import { changePlaylistName } from "@/actions/playlists"

export default function edit(props: {playlistId: number}) {
  let new_name = "";
  return (
    <div>
      <button onClick={() => {
        document.getElementById("edit_dialog")?.classList.remove("hidden")
      }}>edit name</button>

      <div id="edit_dialog" className="hidden" style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "pink",
        padding: "1rem",
        borderRadius: "0.75rem",
        color: "black"
        }}>
        <label htmlFor="playlist_name">new playlist name: </label>
        <input style={{ backgroundColor: "white"}} className="input input-bordered" type="text" name="playlist_name" id="playlist_name" onChange={(e) => {new_name = e.target.value}} />
        <button onClick={async () => {
          await changePlaylistName(props.playlistId, new_name);
          window.location.reload();
        }}>save</button>
      </div>
    </div>
  )
}
