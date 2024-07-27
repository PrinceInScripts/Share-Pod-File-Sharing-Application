import multer from "multer"
import {GridFsStorage} from "multer-gridfs-storage"
import crypto from "crypto"
import path from "path"
import dotenv from "dotenv"
import { DB_NAME } from "../constant.js"

dotenv.config();


const storage=new GridFsStorage({
    url:`${process.env.MONGODB_URL}/${DB_NAME}`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          };
          resolve(fileInfo);
        });
      });
    }
})

const upload=multer({storage})

export default upload;