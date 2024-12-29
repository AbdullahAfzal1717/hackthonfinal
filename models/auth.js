import mongoose from "mongoose"

const { Schema } = mongoose

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: [String], required: true, default: "customer" },
    status: { type: String, default: "active" },
}, { timestamps: true })

const auth = mongoose.model("Users", schema)

export { auth }