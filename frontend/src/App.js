import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch(
        "https://nashik-misal-queue.onrender.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      // 🔍 Handle non-JSON response (important fix)
      const text = await res.text();
      console.log("Raw response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Invalid JSON response from server");
      }

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      console.log("Parsed response:", data);

      setUrl(data.url);
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Upload Image</h2>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <br /><br />

      {url && (
        <>
          <p>Uploaded Image:</p>
          <img src={url} alt="uploaded" width="300" />
        </>
      )}
    </div>
  );
}

export default App;