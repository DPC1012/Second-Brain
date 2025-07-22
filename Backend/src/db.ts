import mongoose from "mongoose"
import { DATABASE_URL } from "./config"

export async function connect_db()
{
    try
    {
        const check = await mongoose.connect(`${DATABASE_URL}`);
    }
    catch(e)
    {
        console.error("Error to connect the db",e)
    }
}


