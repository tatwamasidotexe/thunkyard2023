import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertisDefined } from "../util/assertisDefined";

// creating an endpoint for a HTTP get request
export const getNotes : RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertisDefined(authenticatedUserId);
        const notes = await NoteModel.find({ userId: authenticatedUserId}).exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNote: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    const noteId = req.params.noteId;
    try {
        assertisDefined(authenticatedUserId);

        if(!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid node ID.")
        }
        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found.");
        }

        if(!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note!")
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }

};

interface CreateNoteBody {
    title?:  string,
    text?: string,
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;
    
    try {
        assertisDefined(authenticatedUserId);

        if (!title) {
            throw createHttpError(400, "Note must have a title.");
        }

        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
            title : title,
            text : text,
        });
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

interface UpdateNoteParams {
    noteId: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string,
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const authenticatedUserId = req.session.userId;

    try {
        assertisDefined(authenticatedUserId);

        if(!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid node ID.")
        }

        if (!newTitle) {
            throw createHttpError(400, "Note must have a title.");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found.");
        }

        if(!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note!")
        }

        // update note
        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;

    try {
        assertisDefined(authenticatedUserId);

        if(!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid node ID.")
        }
        const note = await NoteModel.findById(noteId).exec();
        if(!note) {
            throw createHttpError(404, "Note not found.");
        }

        if(!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note!")
        }

        await note.deleteOne().then(() => {
            res.sendStatus(204);
        });
    } catch (error) {
        next(error);
    }
}