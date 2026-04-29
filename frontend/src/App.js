import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("https://nashik-misal-queue.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUrl(data.url);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Upload Image</h2>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <br /><br />

      <button onClick={handleUpload}>Upload</button>

      <br /><br />

      {url && <img src={url} alt="uploaded" width="300" />}
    </div>
  );
}

export default App;