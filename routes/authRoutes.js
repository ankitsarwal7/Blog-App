import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({
            message: "User registered successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({
                message: "Invalid credentials",
            });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            return res.status(400).json({
                message: "Invalid credentials",
            });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

export default router;
