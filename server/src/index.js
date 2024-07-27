import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import fileRoutes from "./routes/file.routes.js"


dotenv.config();

const PORT=process.env.PORT || 5600;

// connectDB()
// .then(()=>{
//     app.listen(PORT,()=>{
//         console.log(`server is running at port : http://localhost:${PORT}`);
//     })
//   })
//   .catch((err)=>{
//     console.log("MONGO db connection faild !! ",err);
//   })
      
const startServer = async () => {
    await connectDB();
    
    // Routes
    app.use('/api/files', fileRoutes);
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  };
  
  startServer();