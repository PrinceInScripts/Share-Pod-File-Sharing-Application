import { File } from '../models/file.models.js';
import s3 from "../config/s3.js";
import bcrypt from "bcryptjs";
import AWS from "aws-sdk";



const uploadFiles = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    const { isPassword, password, hasExpiry, expiresAt, customFileName } = req.body;
    console.log(customFileName);
    

    try {

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
    const file = req.file;

    // Extract extension from original filename
    const originalName = file.originalname;
    const extension = originalName.substring(originalName.lastIndexOf('.')) || '';

    // Use custom filename or fallback to original name (make sure to append extension)
    const finalFileName = customFileName
      ? customFileName.trim() + extension
      : originalName;
      console.log(finalFileName);
      

         const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `file-share-app/${finalFileName}`, // <-- Folder path
      Body: file.buffer, // ✅ Important: actual file content
      ContentType: file.mimetype,
      // ACL: 'public-read', // ✅ Important: set the file to be publicly readable
    };
 

    const s3Result = await s3.upload(params).promise();
    if (s3Result.error) {
        return res.status(500).json({ error: 'Error uploading file to S3' });
    }
    const fileUrl = s3Result.Location;
    console.log("File uploaded to S3:", fileUrl);


    const fileObj = { 
      path: fileUrl,
      name: finalFileName,
      type: req.file.mimetype,
      size: req.file.size,
      hasExpiry: hasExpiry === 'true',
       expiresAt: expiresAt
        ? new Date(Date.now() + expiresAt * 3600000)
        : new Date(Date.now() + 10 * 24 * 3600000), // default 10 days
      status: 'active'
    };
    if (isPassword === 'true') {
        const hashedPassword = await bcrypt.hash(password, 10);
        fileObj.password = hashedPassword;
        fileObj.isPasswordProtected = true;
        fileObj.password = hashedPassword;

    }

    const newFile = new File(fileObj);
    const savedFile = await newFile.save();

    return res.status(201).json({
      message: "File uploaded successfully",
      fileId: savedFile._id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed" });
  }


}






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