import NoteList from "./NoteList";
import { useState } from "react";

export default function Home() {
  // fetching notes from localStorage
  let rawData;

  // If user is using the app first time the app, we will create a new column for storing notes in localStorage
  if (localStorage.getItem("notes")===null) {
    localStorage.setItem("notes",JSON.stringify([]))
    window.location = "/";
  }
  // else we will just fetch the notes from localStorage
  else{
    rawData = JSON.parse(localStorage.getItem("notes"));
  }

  // We are setting notes from the localStorage as useState because we need to update it every time we edit or create a new note
  const data = useState(rawData);
  return (
    <div className="home">
      {/* Here we are checking if there is no note is made by user we will simply shows a message to the user else we will shows the note by supplying the notes to the NoteList */}
      {data[0].length !== 0?<NoteList notes={data[0]} title="All Notes"/>:<h2 className="text-xl m-20">You didn't made any note...</h2>}
    </div>
  );
}
