import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NotesProject.css";
import { ENDPOINTS } from "../../utils/config";
// import { ENDPOINTS } from "../../../utils/config";
import { getToken } from "../../utils/auth";
// import { getToken } from "../../../utils/auth";

function NotesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(ENDPOINTS.USER_BY_ID(id), {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch");
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <h2>No user found.</h2>;

  return (
    <div className="block-container">
      <h2>User Detail</h2>
      <h3>ID: {user._id}</h3>
      <h3>Name: {user.name}</h3>
      <p>Email: {user.email}</p>
      <button className="Notes-button" onClick={() => navigate("/project/list")}>
        Back
      </button>
    </div>
  );
}

export default NotesDetail;
