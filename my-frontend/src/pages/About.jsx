const About = () => {
  return (
    <div className="block-container">
      <h2 className="block-heading">About Notes Project App</h2>
      <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px" }}>
        The Notes Project App is a simple React-based application that lets you manage Notes of content.
      </p>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>✅ Add new Notes with a unique ID and title.</p>
        <p>✅ Edit or delete existing Notes easily.</p>
        <p>✅ Search Notes by title.</p>
        <p>✅ View details of each Notes on a separate page.</p>
        <p>✅ Data is saved in <strong>localStorage</strong> for persistence.</p>
      </div>
    </div>
  );
};

export default About;
