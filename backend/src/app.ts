import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";

const app = express();

app.use(express.json());

app.use("/api/notes", notesRoutes);

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