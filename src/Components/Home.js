import NoteList from "./NoteList";
import { useState } from "react";

export default function Home() {
  let rawData;
  if (localStorage.getItem("notes")===null) {
    localStorage.setItem("notes",JSON.stringify([]))
    window.location = "/";
  }
  else{
    rawData = JSON.parse(localStorage.getItem("notes"));
  }
  const data = useState(rawData);
  return (
    <div className="home">
      {data[0].length !== 0?<NoteList notes={data[0]} title="All Notes"/>:<h2 className="text-xl m-20">You didn't made any note...</h2>}
    </div>
  );
}
