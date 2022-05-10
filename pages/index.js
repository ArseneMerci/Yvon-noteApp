import { useEffect, useState } from "react";
import axios from "axios";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notes, setNotes] = useState([]);

  //useEffect gets called each time the page is loaded so it will fetch the notes from database
  useEffect(() => {
    // fetches notes from database
    axios
      .get("/api/note")
      .then((res) => {
        setNotes(res.data.data);
      })
      .catch((err) => {
        return alert("SERVER_ERROR");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title === "" || body === ""){ return alert("Please fill in all fields!") }
    //adds note to database
    axios
      .post("api/note", {
        title,
        body,
      })
      .then((res) => {
        setNotes([...notes, res.data.data]);
        setTitle("");
        setBody("");
        return alert("Note added!");
      })
      .catch((err) => {
        alert("Error adding note!");
      });
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    const confirm = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirm) {
      //deletes note from database
      axios
        .delete("api/note", { params: { id } })
        .then((res) => {
          setNotes(notes.filter((note) => note._id !== id));
          return alert("Note deleted!");
        })
        .catch((err) => {
          return alert("Error deleting note!");
        });
    } else return;
  };

  return (
    <div className="allContainer">
      <div id="wrapper">
        <div id="note-editor">
          <h2 id="note-editor-title">Create Note</h2>
          <label>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Breaking Bad"
            //storing the value of the user input in the state
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Body:</label>
          <textarea
            rows="10"
            cols="42"
            id="message"
            name="message"
            value={body}
            placeholder="I am not in danger, Skyler. I am the danger!"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <div id="button">
            {/* button for sending note to the backend */}
            <button id="add-btn" onClick={handleSubmit}>
              Create Note
            </button>
          </div>
        </div>

        <div id="notes-section">
          <h2>All Notes</h2>
          <hr/>
          <ul id="notes">
            {notes.map((note) => {
              // mapping the fetched notes to the list
              return (
                <li key={note._id} className="card">
                  <div className="note-title">{note.title}</div>
                  <div className="note-body">{note.body}</div>
                  <div className="">
                    <button className="btnDelete" onClick={(e) => handleDelete(note._id, e)}>
                      Delete Note
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
