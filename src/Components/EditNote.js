import { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditNote() {
  const { id } = useParams();
  const getNotes = JSON.parse(localStorage.getItem("notes"));
  let preTitle;
  let preBody;

  getNotes.map((note) => {
    if (note.id === id) {
      preBody = note.body;
      preTitle = note.title;
    }
    return (preTitle,preBody);
  });
  const [title, setTitle] = useState(preTitle);
  const [body, setBody] = useState(preBody);
  const [isPending, setIsPending] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsPending(true);

    getNotes.map((note) => {
      if (note.id === id) {
        note.title = title;
        note.body = body;
      }
      return (preTitle,preBody);
    });

    localStorage.setItem("notes", JSON.stringify(getNotes));

    setIsPending(false);
    window.location = "/";
  };

  return (
    <div className="create m-20">
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
