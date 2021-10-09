// Importing useState so we could update entries value when user will update it
import { useState } from "react";
// Importing React Natives exclusive opacity effect component
import { TouchableOpacity } from "react-native";

export default function Create() {
  // Initalizing variables for useState

  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');
  // isPending is use for if adding note to localStorage take some time so we could show user that we are adding note
  const [isPending, setIsPending] = useState(false);

  // Handle event for the add button
  const handleSubmit = (e) => {

    // Preventing app for reloading
    e.preventDefault();

    // We are changing isPending value so we could change the text inside the add button to show ``adding``
    setIsPending(true);

    // Fetching notes from localStorage
    const getNotes = JSON.parse(localStorage.getItem("notes"))

    // getting id by adding 1 to the existing getNotes length, and then adding it to the note object with title, body and important with default false value
    const note = {"id":(getNotes.length+1).toString(),title,body,"important":false};

    // pushing note object to the getNotes
    getNotes.push(note);

    // stringifying getNotes and updating notes in localStorage with getNotes
    localStorage.setItem("notes", JSON.stringify(getNotes))

    // Changing the isPending value to false so the add button text could change from ``Adding`` to default text
    setIsPending(false);

    // Redirecting the user to the home page
    window.location = "/";
  }

  return (
    <div className="create sm:m-20 m-6">
      <h2 className="text-3xl text-pink-500 font-medium">Add a New Note</h2>
      <form onSubmit={handleSubmit}>
        <input className="shadow-xl rounded outline-none block bg-white p-1 border-pink-500 border-b-4 text-lg my-10" placeHolder="Title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>

        <textarea className="create-textarea shadow-xl rounded outline-none block bg-white p-1 border-pink-500 border-b-4 text-lg h-4/5 my-10" placeHolder="Description" required value={body} onChange={(e) => setBody(e.target.value)}></textarea>

        {/* Here we are checking isPending value every time it changes if it is changes to true then we change add button's text to ``Adding note...``  else we make it simple add button with some styles from tailwindcss*/}
        {!isPending && <TouchableOpacity style={{position: "absolute" }}><button className="shadow-xl rounded bg-pink-500 p-1 text-white text-lg" style={{outline:'none'}}>Add Note</button></TouchableOpacity>}
        {isPending && <button disabled>Adding Note...</button>}
      </form>
    </div>
  );
}
