import express from "express"
import cors from "cors"
import { connectDb } from './config/db.js'
import { authRouter } from "./routes/auth.js"
import { notesRouter } from "./routes/notes.js"


const app = express()

connectDb()

app.use(express.json())
app.use(cors())



app.use("/auth", authRouter)
app.use("/", notesRouter)