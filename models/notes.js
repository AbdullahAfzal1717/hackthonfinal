import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
    createdBy: { type: String, required: true },
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    category: { type: String, default: "" },

}, { timestamps: true })

const Notes = mongoose.model('Notes', schema)

export { Notes }