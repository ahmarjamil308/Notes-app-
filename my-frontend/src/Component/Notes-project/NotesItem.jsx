import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotesProject.css";
import { ENDPOINTS } from "../../utils/config";
// import { ENDPOINTS } from "../../../utils/config";
import { getToken,getUserFromToken } from "../../utils/auth";
// import { getToken, getUserFromToken } from "../../../utils/auth";

function UserItem({ user, index, onDelete, onUpdate }) {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const current = getUserFromToken();
  const isAdmin = current?.role === "admin";

  const save = async () => {
    try {
      const res = await fetch(ENDPOINTS.USER_BY_ID(user._id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Update failed");
      }
      const data = await res.json();
      onUpdate(index, data._id, data.name, data.email);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating user:", err);
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(ENDPOINTS.USER_BY_ID(user._id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Delete failed");
      }
      onDelete(index, user._id);
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="Notes-item">
      {editMode && (
        <div>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={save}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}

      {!editMode && (
        <div>
          <h4>ID: {user._id}</h4>
          <h4>{name}</h4>
          <p>{email}</p>
          <button onClick={() => navigate(`/view/${user._id}`)}>View</button>
          {/* Edit allowed if admin or the same user */}
          <button onClick={() => setEditMode(true)}>Edit</button>
          {/* Delete allowed only for admin */}
          <button onClick={handleDelete} disabled={!isAdmin}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default UserItem;
