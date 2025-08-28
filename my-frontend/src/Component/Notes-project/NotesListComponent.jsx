import NotesList from "./NotesList";
import "./NotesProject.css";

const NotesListComponent = () => {
  return (
    <div className="Notes-container">
      <h2 className="Notes-heading">Users List</h2>
      <NotesList />
    </div>
  );
};

export default NotesListComponent;
