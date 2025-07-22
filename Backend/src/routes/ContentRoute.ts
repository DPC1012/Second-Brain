import express from "express"
import { ContentMiddleware} from "../middleware/ContentMiddleware";
import { Content } from "../models/Content.model";
import { connect_db } from "../db";
const ContentRoute = express.Router()
connect_db()

ContentRoute.post("/createcontent", ContentMiddleware, async(req,res) => {
    const {type, link, title, tags} = req.body;
    try
    {
        await Content.create({
            type,
            link,
            title,
            userId: req.userId,
            tags: []
        })

        return res.json({
            message: "Content is added"
        })
    }
    catch(e)
    {
        return res.status(500).json({
            message: "internal server error"
        })
    }
})

ContentRoute.get("/getcontent", ContentMiddleware,async(req,res) => {
    const userId = req.userId
    try
    {
        const content = await Content.find({
            userId
        }).populate("userId","username")

        res.json({
            content
        })
    }
    catch(e)
    {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

ContentRoute.delete("/delete content", ContentMiddleware,async(req,res) => {
    const contentId  = req.body.contentId
    try
    {
        await Content.deleteMany({
            contentId,
            userId: req.userId
        })

        return res.json({
            message: "Content is deleted"
        })
    }
    catch(e)
    {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})


export default ContentRoute;