import Blog from '../models/Blog.js'

export const getAllBlogs = async(req, res) => {
    try {
        const blogs = new Blog.find();
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).jsom({message: error.message})
    }
};

export const createBlog = async(req,res) => {
    const {title, content} = req.body;
    const author = req.user.id;
    try {
        const blog = new Blog({title, content,author})
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};