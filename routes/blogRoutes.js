import express from "express"
import User from "../models/User.js"
import router from "./authRoutes.js"

//create a new blog post 
router.post('/', router, async(req, res) =>{
    try {
        const{title, content} = req.body;
        const newBlog = new Blog({
            title,
            content,
            user: req.user.id,
        })
        await newBlog.save();
        res.status(201).json(newBlog)


    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})


//fetch all blog posts 
router.get('/', async(req, res) => {
    try {
     const blog = await User.findById(req.params.id).populate('user', 'username email');
   if (!blog) {
        return res.status(404).json({
        message: 'Blog not found'
})
res.json(blog)

})



    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})