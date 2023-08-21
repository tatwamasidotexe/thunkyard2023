import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true},
    // adding select false this data wont be retrieved by default
    email: { type: String, required: true, unique: true, select: false},
    password: { type: String, required: true, select: false},
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);