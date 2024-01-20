import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

import cors from "cors";
import { env } from "./config/environment.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRouters from "./routes/cartRouters.js";
import uploadRouters from "./routes/uploadRouters.js";
const port = 4000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@famstore.bc1gtb2.mongodb.net/famstore`
);

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRouters);

// Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Create upload endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/api/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  res.json({
    success: 1,
    image_url: `https://famstorebackend.onrender.com/images/${req.file.filename}`,
  });
});

// API Creation
app.get("/", (req, res) => {
  res.send("Fam Store is running");
});

// Implement global error handler
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
