// Importing useState so we could update entries value when user will update it
import { useState } from "react";
// Importing useParams for fetching the id as parameter from url so we could figure which note to edit
import { useParams } from "react-router-dom";

export default function EditNote() {
  // Fetching id from url as parameter with help of useParams
  const { id } = useParams();

  // Fetching notes from localStorage and saving it to the getNotes object
  const getNotes = JSON.parse(localStorage.getItem("notes"));

  // Setting up two variables so we could fetch data from localStorage and then add them as default values to the entries
  let preTitle;
  let preBody;

  // Looping through getNotes so we could add existing title to the preTitle for loading them as default values into entries
  getNotes.map((note) => {
    // If any note's id matches the id we fetched from the url with the help of useParams we will take that note's main content and title and add them to the preTitle and preBody
    if (note.id === id) {
      preBody = note.body;
      preTitle = note.title;
    }
    // And then we are returning preTitle and preBody as we need to return something if we are using map function
    return (preTitle,preBody);
  });

  // Initalizing variables for useState and giving preTitle and preBody as default values
  const [title, setTitle] = useState(preTitle);
  const [body, setBody] = useState(preBody);
  // We are gona set isPending as false as we will later change it in click event
  const [isPending, setIsPending] = useState(false);

  // Click event for the save button
  const handleSave = (e) => {
    // Preventing page for reloading
    e.preventDefault();

    // Making isPending true so the save button's text would change to ``Saving Note...`` so user could get to know that app is saving note
    setIsPending(true);

    // Looping through the getNotes object
    getNotes.map((note) => {
      // saving title and body from the entries to the note as we replace the pervious title and body with the newer title and body
      if (note.id === id) {
        note.title = title;
        note.body = body;
      }
      return (preTitle,preBody);
    });

    // Saving note to the localStorage
    localStorage.setItem("notes", JSON.stringify(getNotes));

    // Changing isPending value to the false so we could change button to normal
    setIsPending(false);

    // Redirecting user to the home page
    window.location = "/";
  };

  return (
    <div className="create sm:m-20 m-6">
      <h2 className="text-3xl text-pink-500 font-medium">Add a New Note</h2>
      <form onSubmit={handleSave}>
        <input
          className="shadow-xl rounded outline-none block bg-white p-1 border-pink-500 border-b-4 text-lg my-10"
          placeholder="Title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="shadow-xl rounded outline-none block bg-white p-1 border-pink-500 border-b-4 text-lg w-6/12 h-4/5 my-10"
          placeholder="Description"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        {!isPending && (
          <button
            className="shadow-xl rounded bg-pink-500 p-1 text-white text-lg"
            style={{ outline: "none" }}
          >
            Save Note
          </button>
        )}
        {isPending && (
          <button
            className="shadow-xl rounded bg-pink-500 p-1 text-white text-lg"
            style={{ outline: "none" }}
            disabled
          >
            Saving Note...
          </button>
        )}
      </form>
    </div>
  );
}
