import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const allowedExtensions = [
  '.jpg', '.jpeg', '.webp', '.png',
  '.mp4', '.avi', '.mov', '.mkv', '.mk3d', '.mks', '.mka',
  '.pdf'
];

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error(`❌ Unsupported file type: ${ext}`));
    }
    cb(null, true);
  }
});

export default upload;
