const Home = () => {
  return (
    <div className="block-container">
      <h2 className="block-heading">Welcome to Notes Project App</h2>
      <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px" }}>
        Manage your Notes — Add, Edit, View, and Delete notes easily.
      </p>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>📌 Click on <strong>Add Notes</strong> to create a new Notes.</p>
        <p>📌 Click on <strong>Notes List</strong> to see all Notes.</p>
      </div>
    </div>
  );
};

export default Home;
