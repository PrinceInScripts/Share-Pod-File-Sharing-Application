import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import fileRoutes from "./routes/file.routes.js"
import userRoutes from "./routes/user.routes.js"
import path from 'path';
const __dirname = path.resolve();

import express from "express"
import cors from "cors"
import { File } from "./models/file.models.js";


dotenv.config();

const PORT=process.env.PORT || 5600;

      
const startServer = async () => {
     try {
    await connectDB();

    // Register routes
    app.use("/api/files", fileRoutes);
    app.use("/api/users", userRoutes); // 👈 Now you can use /api/users endpoints

    app.use(express.static(path.join(__dirname, '/client')));

app.get('/f/:shortCode', async (req, res) => {

      const { shortCode } = req.params;
      if (!shortCode) {
        return res.status(400).send('Short code is required');
      }
      console.log("Short code:", shortCode);
      // Handle the download logic here
      try {
         const file=await File.findOne({ shortUrl: `${process.env.BASE_URL}/f/${shortCode}` });
          if (!file) {
            return res.status(404).send('File not found');
          }
          // just return that all file info
         res.json(file);
      } catch (error) {
        console.error("Error fetching file:", error);
        res.status(500).send('Internal Server Error');
      }

});

    app.listen(PORT, () => {
      console.log(`✅ Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
  };
  
  startServer();