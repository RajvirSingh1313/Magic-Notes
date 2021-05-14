import React from "react";
import { Link } from "react-router-dom";

export default function NoteList({ notes, title }) {
  const handleDeleteNote = (id) =>{
    notes.forEach((note,index) => {
      if (note.id === id) {
        notes.pop(index)
        localStorage.setItem("notes",JSON.stringify(notes))
        window.location = "/";
      }
    })
  }
  const handleMarkImportant = (id) =>{
    notes.forEach((note) => {
      if (note.id === id) {
        if (note.important === false) {
          note.important = true;
        }
        else{
          note.important = false;
        }
        localStorage.setItem("notes",JSON.stringify(notes))
        window.location = "/";
      }
    })
  }
  return (
    <div className="note-list">
      <h2 className="text-3xl ml-20 font-medium text-pink-500">{title}</h2>
      <div className="note-list flex flex-row h-60 ml-10 flex-wrap mr-10">
        {notes.map((note) => (
          <div
            className={(note.important === true)?"note-preview w-60 bg-pink-400 rounded ml-10 p-3 mt-10":"note-preview w-60 bg-white rounded ml-10 p-3 mt-10"}
            key={note.id}
          >
            <Link to={`/note/${note.id}`}>
              <h2
                className={(note.important === true)?"text-3xl text-white font-medium mb-1 overflow-hidden":"text-3xl text-gray-500 font-medium mb-1 overflow-hidden"}
                style={{ height: "4.5rem" }}
              >
                {note.title}
              </h2>
              <p className={(note.important === true)?"text-xl text-gray-50 mb-1 h-28 overflow-hidden":"text-xl text-gray-400 mb-1 h-28 overflow-hidden"}>
                {note.body}
              </p>
            </Link>
            <div className="dropdown">
              <button className="dropbtn">
                <svg
                  width="24"
                  height="24"
                  fill={(note.important === true)?"white":"black"}
                  xmlns="http://www.w3.org/2000/svg"
                  clipRule="evenodd"
                >
                  <path d="M12 16c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z" />
                </svg>
              </button>
              <div className="dropdown-content">
                <Link to={`/note-edit/${note.id}`}>Edit</Link>
                <button onClick={() => handleMarkImportant(note.id)}>{(note.important)?<h1>Mark UnImportant</h1>:<h1>Mark Important</h1>}</button>
                <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
