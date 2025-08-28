import React, { useEffect, useState } from "react";
import UserItem from "./NotesItem";
import "./NotesProject.css";
import { ENDPOINTS } from "../../utils/config";
// import { ENDPOINTS } from "../../../utils/config";
import { getToken,getUserFromToken } from "../../utils/auth";
// import { getToken, getUserFromToken } from "../../../utils/auth";

function NotesList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const current = getUserFromToken();
  const role = current?.role || "guest";

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Admin can fetch /users, regular users can view only partial list via same endpoint if backend permits.
        const headers = {};
        const token = getToken();
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(ENDPOINTS.GET_ALL_USERS, { headers });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch users");
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (index, id) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
  };

  const handleUpdate = (index, id, name, email) => {
    const updated = [...users];
    updated[index] = { _id: id, name, email };
    setUsers(updated);
  };

  if (loading) return <p>Loading...</p>;

  // If guest and no token, show a message or an empty list
  if (role === "guest") return <p>Please login to view users.</p>;

  return (
    <div className="Notes-list">
      {users.map((user, index) => (
        <UserItem
          key={user._id}
          user={user}
          index={index}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

export default NotesList;
