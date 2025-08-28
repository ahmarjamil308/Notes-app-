import React, { useState } from "react";
import "./NotesProject.css";

function NotesForm({ onAdd }) {
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert("Please fill in all fields");
      return;
    }
    onAdd(formData.title, formData.content);
    setFormData({ title: "", content: "" });
  };

  return (
    <div className="Notes-form-container">
      <div className="Notes-form-card">
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            type="text"
            className="Notes-input"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <textarea
            name="content"
            className="Notes-textarea"
            placeholder="Content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
          <button className="Notes-button" type="submit">
            Add Notes
          </button>
        </form>
      </div>
    </div>
  );
}

export default NotesForm;
