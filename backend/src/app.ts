import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
}));

app.use("/api/notes", requiresAuth, notesRoutes);

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