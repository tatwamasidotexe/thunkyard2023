import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();


// creating an endpoint for a HTTP get request
router.get("/", NotesController.getNotes);

router.get("/:noteId", NotesController.getNote);

router.post("/", NotesController.createNote);

export default router;