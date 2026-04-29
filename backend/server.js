import express from "express";
import cors from "cors";
import 'dotenv/config';

const app = express();   // ✅ THIS WAS MISSING

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});