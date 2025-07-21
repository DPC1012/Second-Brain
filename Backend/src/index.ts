import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"  
import bcrypt from "bcrypt"
import { Content, User } from "./db"
import { SignupSchema } from "./validation"
import { JWT_SECRET } from "./config"
const app = express()

app.use(express.json())
app.post("/api/v1/signup" , async(req,res) => {
    const result = SignupSchema.safeParse(req.body);

    if(!result.success)
    {
        return res.status(411).json({
            message : "Please enter the correct inputs",
        })
    }

    const {username , password} = result.data

    const UserExist = await User.findOne({
        username: username,
    })

    if(UserExist)
    {
        return res.status(403).json({
            message : "User is already exists with this username"
        })
    }

    try
    {
       const HashedPassword =  await bcrypt.hash(password , 10)

       const user = await User.create({
            username,
            password: HashedPassword
        })

        return res.status(200).json({
            message: "User created successfully"
        })
    }
    catch(e)
    {
        return res.status(500).json({
            message : "Internal server error"
        })
    }
})

app.post("/api/v1/signin" , async(req,res) => {
    const {username} = req.body


    try
    {
        const UserExist = await User.findOne({
            username,
        })

        if(UserExist)
        {
            const token = jwt.sign({id : UserExist._id} , JWT_SECRET)
            return res.json({
                token: token
            })
        }
        else
        {
            return res.status(403).json({
                message: "User doesn't exist"
            })
        }
    }
    catch(e)
    {
        console.log(e)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})


app.post("/api/v1/content" , async(req,res) => {
    const {type, link, title, tags} = req.body;
    
    try
    {
        await Content.create({
            type,
            link,
            title,
            tags
        })
    }
    catch(e)
    {
        return res.status(500).json({
            message: "internal server error"
        })
    }
})

app.get("/api/v1/content" , (req,res) => {
    res.send("hellooo")
})

app.delete("/api/v1/content" , (req,res) => {
    
})


app.post("/api/v1/brain/share" , (req,res) => {
    
})

app.get("/api/v1/brain/:sharelink" , (req,res) => {
    
})


app.listen(3000)