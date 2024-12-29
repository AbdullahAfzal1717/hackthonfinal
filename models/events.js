import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
    createdBy: { type: String, required: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    category: { type: String, default: "" },
    location: { type: String, default: "" },


}, { timestamps: true })

const Events = mongoose.model('Events', schema)

export { Events }