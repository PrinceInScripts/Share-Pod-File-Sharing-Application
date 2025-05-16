import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import morgan from "morgan"
import dotenv from "dotenv"
dotenv.config();

const app=express();

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))


export {app};