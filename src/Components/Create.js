import { useState } from "react";

export default function Create() {
  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    const getNotes = JSON.parse(localStorage.getItem("notes"))
    const note = {"id":(getNotes.length+1).toString(),title,body,"important":false};

    getNotes.push(note);

    localStorage.setItem("notes", JSON.stringify(getNotes))

    setIsPending(false);
    window.location = "/";
  }

  return (
    <div className="create m-20">
      <h2 className="text-3xl text-pink-500 font-medium">Add a New Note</h2>
      <form onSubmit={handleSubmit}>
        <input className="shadow-xl rounded outline-none block bg-white p-1 border-pink-500 border-b-4 text-lg my-10" placeHolder="Title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>

        <textarea className="create-textarea shadow-xl rounded outline-none block bg-white p-1 border-pink-500 border-b-4 text-lg h-4/5 my-10" placeHolder="Description" required value={body} onChange={(e) => setBody(e.target.value)}></textarea>

        {!isPending && <button className="shadow-xl rounded bg-pink-500 p-1 text-white text-lg" style={{outline:'none'}}>Add Note</button>}
        {isPending && <button disabled>Add Note...</button>}
      </form>
    </div>
  );
}
