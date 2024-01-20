import multer from "multer";
import path from "path";

// Image storage engine
const createStorageEngine = (destination) => {
  return multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
};

const createUploader = (storage) => {
  return multer({ storage: storage });
};

// export const upload = multer({ storage: storage });

const imageUpload = (req, res) => {
  console.log(req.file);
  res.json({
    success: 1,
    image_url: `http://localhost:4000/images/${req.file.filename}`,
  });
};

export { createStorageEngine, createUploader, imageUpload };