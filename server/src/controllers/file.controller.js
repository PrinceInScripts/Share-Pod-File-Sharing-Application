import { File } from '../models/file.models.js';
import s3 from "../config/s3.js";
import bcrypt from "bcryptjs";
import AWS from "aws-sdk";
import nodemailer from "nodemailer";
import shortid from "shortid";
import QRCode from "qrcode";
import { User } from '../models/user.models.js';
import path from "path";



const uploadFiles = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const { isPassword, password, hasExpiry, expiresAt, userId } = req.body;

  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const savedFiles = [];
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    for (const file of req.files) {
      const originalName = file.originalname;
      const extension = path.extname(originalName);
      const uniqueSuffix = shortid.generate();
      const finalFileName = `${originalName.replace(/\s+/g, '_')}_${uniqueSuffix}${extension}`;

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `file-share-app/${finalFileName}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const s3Result = await s3.upload(params).promise();
      const fileUrl = s3Result.Location;
      const shortCode = shortid.generate();

      const fileObj = {
        path: fileUrl,
        name: finalFileName,
        type: file.mimetype,
        size: file.size,
        hasExpiry: hasExpiry === 'true',
        expiresAt: hasExpiry === 'true'
          ? new Date(Date.now() + expiresAt * 3600000)
          : new Date(Date.now() + 10 * 24 * 3600000),
        status: 'active',
        shortUrl: `/f/${shortCode}`,
        createdBy: userId,
      };

      if (isPassword === 'true') {
        const hashedPassword = await bcrypt.hash(password, 10);
        fileObj.password = hashedPassword;
        fileObj.isPasswordProtected = true;
      }

      const newFile = new File(fileObj);
      const savedFile = await newFile.save();
      savedFiles.push(savedFile);

      // Update user stats
      user.totalUploads += 1;
      if (file.mimetype.startsWith('image/')) user.imageCount += 1;
      else if (file.mimetype.startsWith('video/')) user.videoCount += 1;
      else if (file.mimetype.startsWith('application/')) user.documentCount += 1;
    }

    await user.save();

    return res.status(201).json({
      message: "Files uploaded successfully",
      fileIds: savedFiles.map(f => f._id),
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};

const downloadInfo = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const file = await File.findOne({ shortUrl: `/f/${shortCode}` });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    if (file.status !== 'active') {
      return res.status(403).json({ error: 'This file is not available for download' });
    }
    if (file.expiresAt && new Date(file.expiresAt) < new Date()) {
      return res.status(410).json({ error: 'This file has expired' });
    }
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `file-share-app/${file.name}`,
      Expires: 24 * 60 * 60, // 24 hours
    };
    const downloadUrl = s3.getSignedUrl('getObject', params);
    if (!downloadUrl) {
      return res.status(500).json({ error: 'Error generating download URL' });
    }
    file.downloadedContent++;
    await file.save();
    // Update user download count
    const user = await User.findById(file.createdBy);
    if (user) {
      user.totalDownloads += 1;
      await user.save();
    }
    return res.status(200).json({ 
      downloadUrl,
      id: file._id,
      name: file.name,
      size: file.size,
      type: file.type || 'file', // fallback if missing
      path: file.path,
      isPasswordProtected: file.isPasswordProtected || false,
      expiresAt: file.expiresAt || null,
      status: file.status || 'active',
      shortUrl: file.shortUrl,
      downloadedContent: file.downloadedContent,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt
    });

  } catch (error) {
    console.error("Download error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}






const downloadFile = async (req, res) => {
    const { fileId } = req.params;
    const { password } = req.body;
    try {
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

         if (file.status !== 'active') {
          return res.status(403).json({ error: 'This file is not available for download' });
        }

        if (file.expiresAt && new Date(file.expiresAt) < new Date()) {
      return res.status(410).json({ error: 'This file has expired' });
    }

       if (file.isPasswordProtected) {
      if (!password) {
        return res.status(401).json({ error: 'Password required' });
      }

      const isMatch = await bcrypt.compare(password, file.password);
      if (!isMatch) {
        return res.status(403).json({ error: 'Incorrect password' });
      }
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    const key = `file-share-app/${file.name}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Expires: 24 * 60 * 60,
    };

    const downloadUrl = s3.getSignedUrl('getObject', params);
    if (!downloadUrl) {
        return res.status(500).json({ error: 'Error generating download URL' });
    }

    file.downloadedContent++;
    await file.save();

    // Update user download count
    const user = await User.findById(file.createdBy);
    if (user) {
      user.totalDownloads += 1;
      await user.save();
    }

    return res.status(200).json({ downloadUrl });

       
    }catch (error) {
        console.error("Download error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


const deleteFile = async (req, res) => {
     const { fileId } = req.params;

     try {
        const file=await file.findById(fileId);

        if(!file){
          return res.status(404).json({error:'File not found'});
        }

        if(file.status==='deleted'){
          return res.status(400).json({error:'File already deleted'});
        }

        const s3 =new AWS.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION
        })

        const params={
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `file-share-app/${file.name}`
        }

        await s3.deleteObject(params).promise();
        
         await File.deleteOne({ _id: fileId });

        return res.status(200).json({message:'File deleted successfully'});
     }catch(error) {
        console.error("Delete error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
}

}

const updateFileStatus = async (req, res) => {
     const {fileId} = req.params;
     const {status} = req.body;

     try{

         if (!['active', 'inactive'].includes(status)) {
          return res.status(400).json({ error: 'Invalid status' });
        }

        const file=await File.findById(fileId);

        if(!file){
          return res.status(404).json({error:'File not found'});
        }

        if(file.status===status){
          return res.status(400).json({error:'File already has this status'});
        }

        file.status=status;
        await file.save();

        return res.status(200).json({message:'File status updated successfully'});
     }catch(error) {
        console.error("Update error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
     }
}

const updateFileExpiry = async (req, res) => {
    const {fileId} = req.params;
    const { expiresAt} = req.body;

    try{
       const file=await File.findById(fileId);
        if(!file){
            return res.status(404).json({error:'File not found'});
        }

        if (expiresAt) {
          file.expiresAt = new Date(Date.now() + expiresAt * 3600000); // Convert hours to milliseconds
        }

        await file.save();

    return res.status(200).json({ message: 'File expiry updated successfully' });
    }catch(error) {
        console.error("Update error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateAllFileExpiry = async (req, res) => {
    const files = await File.find();
  
    try {
        if (!files || files.length === 0) {
            return res.status(404).json({ error: 'No files found' });
        }

        const updatedFiles = [];
        for (const file of files) {
          if (file.status === 'deleted') continue; // Skip deleted files
           if (file?.expiresAt && new Date(file.expiresAt) < new Date()) {
              file.status = 'expired';
              file.hasExpiry = true; // Keep this if expired files should still have expiry set
          } else {
              file.expiresAt = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 days from now
              file.hasExpiry = true;
          }
            await file.save();
            updatedFiles.push(file);
        }

        return res.status(200).json({ message: 'All file expiries updated successfully', files: updatedFiles });
    } catch (error) {
        console.error("Update all expiry error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}



const updateFilePassword = async (req, res) => {
  const { fileId } = req.params;
  const { newPassword } = req.body;

  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (!newPassword) {
      return res.status(400).json({ error: 'New password is required' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    file.password = hashedPassword;
    await file.save();

    return res.status(200).json({ message: 'File password updated successfully' });

  } catch (error) {
    console.error("Update password error:", error);
    return res.status(500).json({ error: "Error updating file password" });
  }
};


const searchFiles = async (req, res) => {
  const { query } = req.query; // Search query string

  try {
    const files = await File.find({
      name: { $regex: query, $options: 'i' }, // Case-insensitive search
    });

    if (!files.length) {
      return res.status(404).json({ message: 'No files found' });
    }

    return res.status(200).json(files);

  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ error: "Error searching files" });
  }
};

const showUserFiles = async (req, res) => {
  const { userId } = req.params;

  try {
    const files = await File.find({ createdBy: userId });

    if (!files.length) {
      return res.status(404).json({ message: 'No files found' });
    }

    return res.status(200).json(files);

  } catch (error) {
    console.error("List files error:", error);
    return res.status(500).json({ error: "Error fetching user files" });
  }
};

const getFileDetails = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    return res.status(200).json(file);
  }
  catch (error) {
    console.error("Get file details error:", error);
    return res.status(500).json({ error: "Error fetching file details" });
  }
}

const generateShareShortenLink = async (req, res) => {
  const { fileId } = req.body;
  try {
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });

    const shortCode = shortid.generate();
    file.shortUrl = `${process.env.BASE_URL}/f/${shortCode}`;
    await file.save();

    res.status(200).json({ shortUrl: file.shortUrl });
  } catch (error) {
    console.error('Shorten link error:', error);
    res.status(500).json({ error: 'Error generating short link' });
  }
}; 

const sendLinkEmail = async (req, res) => {
  const { fileId, email } = req.body;
  try {
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

   const mailOptions = {
  from: `"File Share App" <${process.env.MAIL_USER}>`,
  to: email,
  subject: 'Your Shared File Link',
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>📎 You've received a file!</h2>
      <p>Hello,</p>
      <p>You have been sent a file using <strong>File Share App</strong>.</p>
      <p><strong>File Name:</strong> ${file.name}</p>
      <p><strong>File Type:</strong> ${file.type}</p>
      <p><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
      <p><strong>Download Link:</strong></p>
      <p><a href="${file.path}" target="_blank" style="color: #3366cc;">Click here to download your file</a></p>
      ${
        file.expiresAt
          ? `<p><strong>Note:</strong> This link will expire on <strong>${new Date(
              file.expiresAt
            ).toLocaleString()}</strong>.</p>`
          : ''
      }
      <p>Thank you for using File Share App!</p>
    </div>
  `
};


    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Link sent successfully' });
  } catch (error) {
    console.error('Resend link error:', error);
    res.status(500).json({ error: 'Error resending link' });
  }
};

const generateQR = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });

    const fileUrl = file.path;

    const qrDataUrl = await QRCode.toDataURL(fileUrl);

    res.status(200).json({ qr: qrDataUrl });
  } catch (error) {
    console.error('QR generation error:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

const getDownloadCount = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.status(200).json({ downloadCount: file.downloadedContent });
  }
  catch (error) {
    console.error('Get download count error:', error);
    res.status(500).json({ error: 'Failed to get download count' });
  }
}


const resolveShareLink = async (req, res) => {
  const { code } = req.params;
const shortUrl = `${process.env.BASE_URL}/f/${code}`;
const file = await File.findOne({ shortUrl });

  try {
    const file = await File.findOne({ shortUrl });

    if (!file) {
      return res.status(404).json({ error: "Invalid or expired link" });
    }

    // Check expiry
    if (file.expiresAt && new Date() > file.expiresAt) {
      file.status = "expired";
      await file.save();
      return res.status(410).json({ error: "This file has expired." });
    }

    return res.status(200).json({
      fileId: file._id,
      name: file.name,
      size: file.size,
      type: file.type || "file", // fallback if missing
      previewUrl: file.path,
      isPasswordProtected: file.isPasswordProtected || false,
      expiresAt: file.expiresAt || null,
      status: file.status || "active",
    });
  } catch (error) {
    console.error("Error resolving share link:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const verifyFilePassword = async (req, res) => {
  const { fileId, password } = req.body;

  try {
    const file = await File.findById(fileId);
    if (!file || !file.isPasswordProtected)
      return res.status(400).json({ error: "File not protected or not found" });

    const isMatch = await bcrypt.compare(password, file.password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

    return res.status(200).json({ message: "Password verified" });
  } catch (error) {
    console.error("Password verification error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserFiles = async (req, res) => {

  const { userId } = req.params;
  try {
    const files = await File.find({ createdBy: userId });

    if (!files.length) {
      return res.status(404).json({ message: 'No files found' });
    }

    return res.status(200).json(files);

  } catch (error) {
    console.error("List files error:", error);
    return res.status(500).json({ error: "Error fetching user files" });
  }
}



export {
    uploadFiles,
    downloadFile,
    deleteFile,
    updateFileStatus,
    updateFileExpiry,
    updateFilePassword,
    searchFiles,
    showUserFiles,
    getFileDetails,
    generateShareShortenLink,
    sendLinkEmail,
    generateQR,
    getDownloadCount,
    resolveShareLink,
    verifyFilePassword,
    getUserFiles,
    updateAllFileExpiry,
    downloadInfo
}