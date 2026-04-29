import express from "express";
import cors from "cors";
import multer from "multer";
import cloudinary from "./cloudinary.js";
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 DEBUG: Check if env variables are loading
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);

// 🔹 Multer config
const upload = multer({ dest: "uploads/" });

// 🔹 Health check
app.get("/", (req, res) => {
  res.send("API running...");
});

// 🔹 Upload API (SAFE VERSION)
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // 🔥 Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto"
    });

    res.json({
      url: result.secure_url
    });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});