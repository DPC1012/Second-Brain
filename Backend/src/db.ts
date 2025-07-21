import mongoose, {model , Schema} from "mongoose"
import { DATABASE_URL } from "./config"

mongoose.connect(`${DATABASE_URL}`)

const UserSchema = new Schema({
    username : {type: String, required: true, unique: true},
    password : {type: String, required: true}
})

const TagSchema = new Schema({
    title: {type: String, required: true, unique: true}
})

const ContentTypes = ['image', 'video', 'article', 'audio']
const ContentSchema = new Schema({
    link: {type: String},
    type: {type: String, enum:ContentTypes, required: true},
    title: {type: String, required: true},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})


const LinkSchema = new Schema({
    hash: {type: String, required: true},       
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})


export const User = model("User", UserSchema)
export const Tag = model("Tag", TagSchema)
export const Content = model("Content", ContentSchema)
export const Link = model("Link", LinkSchema)

