import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NotesProject.css";
import { ENDPOINTS } from "../../utils/config";

import { getToken } from "../../utils/auth";


export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
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

  return [users, setUsers, loading];
}

export function NotesAddComponent() {
  const [users, setUsers, loading] = useUsers();
  const navigate = useNavigate();

  const addUser = async (name, email) => {
    try {
      const res = await fetch(ENDPOINTS.USER_SUBMIT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const newUser = await res.json();
      if (!res.ok) throw new Error(newUser.error || "Failed to add user");
      setUsers([...users, newUser.user]);
      navigate("/project/list");
    } catch (err) {
      console.error("Error adding user:", err);
      alert(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    addUser(name, email);
  };

  return (
    <div className="Notes-container">
      <h2 className="Notes-heading">Add User</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
        <input name="email" placeholder="Email" type="email" required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
