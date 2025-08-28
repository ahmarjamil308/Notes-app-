import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotesDetail from "./Component/Notes-project/NotesDetail";
import { NotesAddComponent } from "./Component/Notes-project/NotesProject";
import NotesListComponent from "./Component/Notes-project/NotesListComponent";
import ROUTES from "./utils/routes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Component/ProtectedRoute";

function AdminUsers() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Admin - Users</h2>
      <NotesListComponent />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />

          {/* Protected User Routes */}
          <Route
            path={ROUTES.PROJECT_ADD}
            element={
              <ProtectedRoute>
                <NotesAddComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PROJECT_LIST}
            element={
              <ProtectedRoute>
                <NotesListComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PROJECT_VIEW()}
            element={
              <ProtectedRoute>
                <NotesDetail />
              </ProtectedRoute>
            }
          />

          {/* Admin Only Route */}
          <Route
            path={ROUTES.ADMIN_USERS}
            element={
              <ProtectedRoute role="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
