// We have some ``a`` tags so we need to use Link to work with react-router-dom
import { Link } from "react-router-dom";

export default function NoteList({ notes, title }) {

  // Delete handler for notes as we are also having a option for deleting,editing and marking note as important from home page without opening the note itself
  const handleDeleteNote = (id) =>{
    // We are looping through the notes so if note.id matches the id which is provided to the function we will just use pop function to remove that note with index provided by the map function
    notes.forEach((note,index) => {
      if (note.id === id) {
        notes.pop(index)

        // Updating localStorage
        localStorage.setItem("notes",JSON.stringify(notes))

        // Reloading the home page
        window.location = "/";
      }
    })
  }

  // Function for marking notes important or unimportant
  const handleMarkImportant = (id) =>{
    // We will take the id of that note
    // and we will loop through the notes if note's id matches the id we are provided with then we will check whether the note's important value is true or false if the value is true then we will change it to false vice-versa
    notes.forEach((note) => {
      if (note.id ===  id) {
        if (note.important === false) {
          note.important = true;
        }
        else{
          note.important = false;
        }
        // Saving the changes to the localStorage
        localStorage.setItem("notes",JSON.stringify(notes))

        // Reloading the page
        window.location = "/";
      }
    })
  }
  return (
    <div className="note-list">
      <h2 className="text-3xl sm:ml-20 ml-6 font-medium text-pink-500">{title}</h2>
      <div className="note-list flex flex-row h-60 sm:ml-10 ml-2 flex-wrap mr-10">
        {notes.map((note) => (
          <div
            className={(note.important === true)?"note-preview w-60 bg-pink-400 rounded sm:ml-10 ml-2 p-3 sm:mt-10 mt-2":"note-preview w-60 bg-white rounded sm:ml-10 ml-2 p-3 mt-10"}
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
