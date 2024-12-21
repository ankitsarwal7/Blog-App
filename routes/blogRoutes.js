import express from "express"
import User from "../models/User.js"
import router from "./authRoutes.js"

//create a new blog post 
router.post('/', router, async(req, res) => {
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
   const blogs = await User.find().populate("user", 'username email' )
    res.json(blogs)
   } catch (error) {
    res.status(500).json({
        error: error.message
    })
   }

})

 //fetch a single blog post by id
 router.get('/:id', async(req, res) => {
    try {
       const blog = await User.findById(req.params.id).populate('user', 'username email')
       if(!blog) return res.status(404).json({ message: 'blog not found' })
       res.json(blog)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
 });
    
 //update a blog post 
 router.put('/id', router, async(req, res) => {
    try {
        const {title, content} = req.body;
        // find the blog post by id
        const blog = await findById(req.params.id);
        if(!blog) return res.status(404).json({message: "blog not found"})
        // Check if the logged-in user is the blog author
        if(blog.user.toString() !== req.params.id) {
            return res.status(403).json({
                message: "Not authorized to update this blog "
            })
        }
           //update the blog post 
           blog.title = title || blog.title;
           blog.content = content || blog.content;

           await blog.save();  //save the update blog 
           





    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
 })


 export default router