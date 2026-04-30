import express from "express";
import cors from "cors";
import multer from "multer";
import cloudinary from "./cloudinary.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Use memory storage (IMPORTANT FIX)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔹 Health check
app.get("/", (req, res) => {
  res.send("API running...");
});

// 🔹 Upload API (BUFFER BASED)
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 🔥 Convert buffer → base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI);

    return res.json({
      url: result.secure_url,
    });
  } catch (err) {
    console.error("Upload error:", err);

    return res.status(500).json({
      error: err.message || "Upload failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});