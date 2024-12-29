import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
    createdBy: { type: String, required: true },
    title: { type: String, default: "" },
    discription: { type: String, default: "" },
    location: { type: String, default: "" },
    category: { type: String, default: "" },

}, { timestamps: true })

const Notes = mongoose.model('Notes', schema)

export { Notes }