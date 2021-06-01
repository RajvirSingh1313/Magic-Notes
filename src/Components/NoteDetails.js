// Importing useParams as we are fetching parameters from the url
import { useParams } from "react-router";
// Importing Links because we have some ``a`` links
import { Link } from "react-router-dom";

export default function NoteDetails() {
  // Fetching the id parameter from the url with the help of the useParams
  const { id } = useParams();

  // Fetching notes from the localStorage
  const notes = JSON.parse(localStorage.getItem("notes"));

  // Delete button click handler
  const handleClick = () => {
    notes.forEach((note, index) => {
      if (note.id === id) {
        notes.pop(index);
        localStorage.setItem("notes", JSON.stringify(notes));
        window.location = "/";
      }
    });
  };

  return (
    <div className="note-details">
      {/* Here is loop with a if and else statement in it, it loops through all the notes and if the note's id matches the id that is provided in the url as parameter we get that note's title and body and put it into our html elements, else we show message to the user */}
      {notes.map((note) => {
        return note.id === id ? (
          <article key={note.id} className="ml-20 mt-13">
            <h2 className="text-5xl text-gray-600">{note.title}</h2>
            <p className="text-2xl mt-5 text-gray-500 font-medium">
              {note.body}
            </p>
            <Link
              className="bg-pink-500 p-2 rounded text-white text-lg mt-5 mr-5 shadow-xl"
              to={`/note-edit/${note.id}`}
            >
              Edit
            </Link>
            <button
              className="bg-pink-500 p-1 rounded text-white text-lg mt-5 shadow-xl"
              onClick={handleClick}
            >
              Delete
            </button>
          </article>
        ) : (
          <div className="not-found ml-20">
            <h2 className="text-3xl">Sorry</h2>
            <p className="text-2xl">That note cannot be found</p>
            <Link className="text-2xl text-pink-500" to="/">
              Back to the homepage...
            </Link>
          </div>
        );
      })}
    </div>
  );
}
