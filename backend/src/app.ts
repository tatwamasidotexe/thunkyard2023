import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";

import NoteModel from "./models/note";


const app = express();

// creating an endpoint for a HTTP get request
app.get("/", async (req, res, next) => {

    try {
        // throwing an error to demo error handling
        throw Error('BAZINGA!');
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
});

app.use((req, res, next) => {
    next(Error("Endpoint not found."))
})

// another endpoint for error handling
app.use((error: unknown, req : Request, res: Response, next : NextFunction) => {
    console.log(error);
    let errMsg = "An unknown error occurred.";
    if (error instanceof Error) errMsg = error.message;
    res.status(500).json({ error : errMsg });
});

export default app;