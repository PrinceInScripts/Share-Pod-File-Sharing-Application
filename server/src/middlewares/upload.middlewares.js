import multer from "multer";
import path from "path";

const storage = multer.memoryStorage(); // ✅ Use memoryStorage

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);

    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4" &&
      ext !== ".avi" &&
      ext !== ".mov" &&
      ext !== ".mkv" &&
      ext !== ".MKV" &&
      ext !== ".mk3d" &&
      ext !== ".mks" &&
      ext !== ".pdf" &&
      ext !== ".mka"
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }

    cb(null, true);
  },
});

export default upload;
