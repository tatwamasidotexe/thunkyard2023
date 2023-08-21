import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRoutes);

app.use("/api/users", userRoutes);

// fires when we try to access an endpoint that we didnt set up
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found."));
})

// another endpoint for error handling
app.use((error: unknown, req : Request, res: Response, next : NextFunction) => {
    console.log(error);
    let errMsg = "An unknown error occurred.";
    let statusCode = 500;
    if(isHttpError(error)) {
        statusCode = error.status;
        errMsg = error.message;
    }
    res.status(statusCode).json({ error : errMsg });
});

export default app;