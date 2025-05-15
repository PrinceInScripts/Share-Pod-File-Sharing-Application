import express, { Router } from "express"
import upload from "../middlewares/upload.middlewares.js";
import { deleteFile, downloadFile, generateQR, generateShareShortenLink, getDownloadCount, getFileDetails, resolveShareLink, searchFiles, sendLinkEmail, showUserFiles, updateFileExpiry, updateFilePassword, updateFileStatus, uploadFiles, verifyFilePassword ,  } from "../controllers/file.controller.js";


const router=Router();

router.post("/upload",upload.single('file'),uploadFiles);
router.get("/download/:fileId",downloadFile);
router.delete("/delete/:fileId",deleteFile);
router.put("/update/:fileId",updateFileStatus);
router.get("/getFileDetails/:fileId",getFileDetails);
router.post('/generateShareShortenLink', generateShareShortenLink);
router.post('/sendLinkEmail', sendLinkEmail);

router.post('/updateFileExpiry', updateFileExpiry);
router.post('/updateFilePassword', updateFilePassword);
router.get('/searchFiles', searchFiles);
router.get('/showUserFiles', showUserFiles);

router.get('/generateQR/:fileId', generateQR);
router.get('getDownloadCount/:fileId', getDownloadCount);


router.get('/resolveShareLink/:shortUrl', resolveShareLink);
router.post('/verifyFilePassword', verifyFilePassword);






export default router;