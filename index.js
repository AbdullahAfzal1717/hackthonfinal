import express from "express"
import cors from "cors"
import { connectDb } from './config/db.js'
import { authRouter } from "./routes/auth.js"
import { eventsRouter } from "./routes/events.js"


const app = express()

connectDb()


app.use(express.json())
app.use(cors())

app.get('/', () => {
    console.log("vercel is working")
})

const { PORT = 8000 } = process.env;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
app.use("/auth", authRouter)
app.use("/events", eventsRouter)