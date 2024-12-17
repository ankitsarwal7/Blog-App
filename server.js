import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from './routes/authRoutes.js'
import blogRoutes from './routes/blogRoutes.js'

dotenv.config(); 
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)


mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => {
    console.error("MongoDB connection error:", err);  
  })
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

