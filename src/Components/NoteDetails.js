import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function NoteDetails() {
  const { id } = useParams();
  const notes = JSON.parse(localStorage.getItem("notes"));

  const handleClick = () => {
    notes.forEach((note,index) => {
      if (note.id === id) {
        notes.pop(index)
        localStorage.setItem("notes",JSON.stringify(notes))
        window.location = "/";
      }
    })
  };

  return (
    <div className="note-details">
      {notes.map((note) => {
        return note.id === id ? (
          <article key={note.id} className="ml-20 mt-13">
            <h2 className="text-5xl text-gray-600">{note.title}</h2>
            <p className="text-2xl mt-5 text-gray-500 font-medium">{note.body}</p>
            <Link className="bg-pink-500 p-2 rounded text-white text-lg mt-5 mr-5 shadow-xl" to={`/note-edit/${note.id}`}>Edit</Link>
            <button className="bg-pink-500 p-1 rounded text-white text-lg mt-5 shadow-xl" onClick={handleClick}>Delete</button>
          </article>
        ) : (
          ""
        );
      })}
    </div>
  );
}
