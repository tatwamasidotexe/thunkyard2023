import { InferSchemaType, Schema, model } from "mongoose";

// define schema
const noteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    title : { type: String, required: true },
    text : {type: String},
}, { timestamps : true});
// put the timestamps outside the user-defined schema because mongoose adds that automatically, no need for input

// using type here instead of interface because thats what inferschematype expects from us, it would throw a syntax error otherwise
type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);