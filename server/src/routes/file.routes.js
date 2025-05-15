import express, { Router } from "express"
import upload from "../middlewares/upload.middlewares.js";
import { downloadFile, uploadFiles } from "../controllers/file.controller.js";


const router=Router();

router.post("/upload",upload.single('file'),uploadFiles);
router.get("/download/:fileId",downloadFile);

export default router;