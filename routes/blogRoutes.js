import express from 'express';
import { getAllBlogs, createBlog } from '../controllers/blogController.js';
import authMiddleware from '../middleware/authmiddleware.js'

const router = express.Router();

router.get('/', getAllBlogs)
router.post('/', authMiddleware, createBlog);

export default router;