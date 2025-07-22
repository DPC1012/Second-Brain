import mongoose, { model, Schema } from "mongoose"


const ContentTypes = ['image', 'video', 'article', 'audio']
const ContentSchema = new Schema({
    link: {type: String},
    type: {type: String, enum:ContentTypes, required: true},
    title: {type: String, required: true},
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
},{timestamps: true})


export const Content = model("Content", ContentSchema)