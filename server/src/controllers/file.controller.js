import { File } from '../models/file.models.js';



const uploadFiles = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
 
  const fileObj={
    path: req.file.path,
    name: req.file.originalname, 
    type: req.file.mimetype, 
    size: req.file.size
  }
  const SERVER_URL=process.env.SERVER_URL;

  try {
    const file=await File.create(fileObj);
    res.status(200).json({
        msg:"File Uploaded Successfully",
        path:`${SERVER_URL}/file/${file._id}`,
        data:file
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
};

const downloadFile=async (req,res)=>{
    try {
        const file=await File.findById(req.params.fileId);
        file.downloadedContent++;
        await file.save();
        res.download(file.path,file.name);
    } catch (error) {
        console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}


export {uploadFiles,downloadFile}