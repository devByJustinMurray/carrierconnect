import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";

// 🛣 Import Routes
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import loadRouter from "./routes/loadRoutes.js"; // New: Load Routes

const app = express();
const port = process.env.PORT || 4000;

// 🧠 Connect to MongoDB
connectDB();

// 🌐 CORS Setup
const allowOrigins = ['http://localhost:5173'];
app.use(cors({ origin: allowOrigins, credentials: true }));

// 🧼 Middleware
app.use(express.json());
app.use(cookieParser());

// 🚀 API Endpoints
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/loads', loadRouter); // New: Loads API

// 🏁 Start Server
app.listen(port, () => console.log(`App listening on port ${port}`));
