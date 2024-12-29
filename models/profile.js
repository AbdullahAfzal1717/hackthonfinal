import mongoose from "mongoose";

const { Schema } = mongoose

const schema = new Schema({
    uid: { type: String, required: true },
    name: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    role: { type: [String], required: true, default: "customer" },
    status: { type: String, default: "active" },
    bio: { type: String, default: "" },
    imageUrl: { type: String, default: "" }
}, { timestamps: true })

const profile = mongoose.model('Profile', schema)

export { profile };