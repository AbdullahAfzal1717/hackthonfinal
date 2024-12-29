import express from 'express';
import { Events } from "../models/events.js"


const eventsRouter = express.Router();


eventsRouter.get("/get", async (req, res) => {


    try {
        const events = await Events.find()
        console.log("gettting events", events)
        res.status(200).json({ events });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
})


eventsRouter.post("/create", async (req, res) => {
    const eventData = req.body
    console.log("data", eventData);
    try {
        const event = new Events(eventData);
        await event.save();
        res.status(201).json({ message: "A new item has been successfully created", event });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }

})
export { eventsRouter }


