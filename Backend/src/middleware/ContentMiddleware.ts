import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";



export const ContentMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"]

    if(!header)
    {
        return res.status(401).json({
            message: "Authorization header is missing"
        })
    }

    const token  = header.split(" ")[1]

    try
    {   
        const Decoded = jwt.verify(token, JWT_SECRET) as {id: string}
        if(Decoded)
        { 
            req.userId = Decoded.id
        }
        next()
    }
    catch(e)
    {
        return res.status(403).json({
            message: "Invalid or expired token"
        })
    }
}