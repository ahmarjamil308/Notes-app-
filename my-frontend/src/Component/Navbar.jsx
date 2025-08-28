import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { getUserFromToken,removeToken } from "../utils/auth";


const Navbar = () => {
  const navigate = useNavigate();
  const current = getUserFromToken();
  const role = current?.role || "guest";

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Router</h1>
      <div className="navbar-links">
        <button onClick={() => navigate("/")} className="btn">Home</button>
        <button onClick={() => navigate("/about")} className="btn">About</button>
        <button onClick={() => navigate("/contact")} className="btn">Contact</button>

        {role === "guest" && (
          <>
            <button onClick={() => navigate("/login")} className="btn">Login</button>
            <button onClick={() => navigate("/signup")} className="btn">Sign Up</button>
          </>
        )}

        {role === "user" && (
          <>
            <button onClick={() => navigate("/project/add")} className="btn">Add Notes</button>
            <button onClick={() => navigate("/project/list")} className="btn">Notes List</button>
            <button onClick={handleLogout} className="btn">Logout</button>
          </>
        )}

        {role === "admin" && (
          <>
            <button onClick={() => navigate("/project/add")} className="btn">Add Notes</button>
            <button onClick={() => navigate("/project/list")} className="btn">Notes List</button>
            <button onClick={() => navigate("/admin/users")} className="btn">Manage Users</button>
            <button onClick={handleLogout} className="btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
