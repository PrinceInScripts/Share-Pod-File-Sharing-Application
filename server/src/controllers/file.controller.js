import mongoose from "mongoose"
import qrcode from "qrcode"
import archiver from "archiver"
import { File } from "../models/file.models.js";

const conn=mongoose.connection;
let gfs;
conn.once('open',()=>{
    gfs=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'uploads',
    });
});

const uploadFiles=async (req,res)=>{
    const fileLinks = [];
  const qrCodes = [];

  for (const file of req.files) {
    const newFile = new File({
      filename: file.filename,
      fileId: file.id,
    });
    await newFile.save();
    const fileLink = `http://localhost:3000/api/files/file/${file.id}`;
    fileLinks.push(fileLink);
    const qrCode = await qrcode.toDataURL(fileLink);
    qrCodes.push(qrCode);
  }

  res.json({ fileLinks, qrCodes }); 
}

const getFile = (req, res) => {
    gfs.find({ _id: mongoose.Types.ObjectId(req.params.id) }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({ err: 'No file exists' });
      }
      gfs.openDownloadStream(mongoose.Types.ObjectId(req.params.id)).pipe(res);
    });
};

const downloadZip = async (req, res) => {
    const { fileIds } = req.body;
  
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });
  
    archive.on('error', (err) => {
      throw err;
    });
  
    res.attachment('files.zip');
  
    archive.pipe(res);
  
    for (const fileId of fileIds) {
      const fileStream = gfs.openDownloadStream(mongoose.Types.ObjectId(fileId));
      const fileMeta = await gfs.find({ _id: mongoose.Types.ObjectId(fileId) }).toArray();
      archive.append(fileStream, { name: fileMeta[0].filename });
    }
  
    archive.finalize();
};

export {
    uploadFiles,
    getFile,
    downloadZip
}