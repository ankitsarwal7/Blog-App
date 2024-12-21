import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const register = async (req,res) => {
  const{username,email,password} = req.body;
  
  try {
    const user = new User({username,email,password});
    await user.save();
    res.status(201).json({ message: "User Registered Successfully"})
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
 
};

export const login = async (req,res)=> {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"})
       
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid Credential"})

        jwt.sign({id: user._id}, process.env.JTW_SECRET, {expiresIn: '1h'});
        res.status(200).json({token});

    } catch (error) {
        res.status(500).json({message: "error.message"})
    }
}