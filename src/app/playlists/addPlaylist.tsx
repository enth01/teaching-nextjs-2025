"use client"
import { addPlaylist } from "@/actions/playlists";

export default function AddPlaylist() {
  let name = "";
  return (
    <div>
      <button onClick={() => { document.getElementById("add_playlist_dialog")?.classList.remove("hidden") }}>Add playlist</button>
      <div id="add_playlist_dialog" className="hidden" style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "pink",
        padding: "1rem",
        borderRadius: "0.75rem",
        color: "black"
      }}>
        <label htmlFor="playlist_name">playlist name: </label>
        <input className="input input-bordered" type="text" name="playlist_name" id="playlist_name" onChange={(e) => { name = e.target.value }} />
        <button onClick={async () => {
          await addPlaylist(name, 1);
          window.location.reload();
          }}>save</button>
      </div>
    </div>
  )
}