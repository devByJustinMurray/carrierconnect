import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "../server/routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js";

const app = express ();
const port = process.env.PORT || 4000;

connectDB();

const allowOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowOrigins, credentials: true }));
//Api endpoints
app.get('/', (reg, res)=> res.send("API working"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.listen(port, ()=> console.log(`App listening on port ${port}`));
