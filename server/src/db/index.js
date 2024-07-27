import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import dotenv from "dotenv"

dotenv.config();

const connectDB=async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
          console.log(`\n DB Host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectDB;