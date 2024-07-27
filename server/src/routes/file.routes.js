import express, { Router } from "express"
import upload from "../middlewares/upload.middlewares.js";
import { downloadZip, getFile, uploadFiles } from "../controllers/file.controller.js";


const router=Router();

router.post("/upload",upload.array('files',10),uploadFiles);
router.get("/file/:id",getFile);
router.get("/download-zip",downloadZip)

export default router;