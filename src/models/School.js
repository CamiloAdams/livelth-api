import { Schema, model } from "mongoose";

const schoolSchema = new Schema(
    {
        name: String,
    },
    {
        versionKey: false,
    }
);

export default model("School", schoolSchema);
