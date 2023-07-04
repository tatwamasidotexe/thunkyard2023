import { InferSchemaType, Schema, model } from "mongoose";

// define schema
const noteSchema = new Schema({
    title : { type: String, required: true },
    text : {type: String},
}, { timestamps : true});
// put the timestamps outside the user-defined schema because mongoose adds that automatically, no need for input

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);