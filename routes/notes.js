import express from 'express';
import { Notes } from "../models/notes.js"

const notesRouter = express.Router();


notesRouter.get("/todos/get/:id", async (req, res) => {

    const { id } = req.params
    console.log(id)
    try {
        const todos = await Todo.find({ uid: id })
        console.log("gettting todos", todos)
        res.status(200).json({ todos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
})
notesRouter.get("/todos/get_single/:id", async (req, res) => {

    const { id } = req.params
    console.log(id)
    try {
        const todo = await Todo.find({ id })
        // console.log("gettting todos", todos)
        res.status(200).json({ todo });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
})


notesRouter.post("/todos/create", (req, res) => {
    const todoData = req.body
    console.log("todossss", todoData);
    try {
        const todo = new Notes(todoData);


        todo.save();


        res.status(201).json({ message: "A new item has been successfully created", todo });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }

})

notesRouter.patch("/todos/update/:id", async (req, res) => {
    const todoData = req.body
    const { id } = req.params
    try {
        const todo = await Notes.findOneAndUpdate({ id }, todoData, { new: true })

        res.status(202).json({ todo });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }

})

notesRouter.delete('/todos/delete/:id', async (req, res) => {

    const { id } = req.params
    try {
        const todos = await Notes.findOneAndDelete({ id })

        res.status(200).json({ todos })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
})

export { notesRouter }


