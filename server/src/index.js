import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js"


dotenv.config();

const PORT=process.env.PORT || 5600;

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port : http://localhost:${PORT}`);
    })
  })
  .catch((err)=>{
    console.log("MONGO db connection faild !! ",err);
  })
      
