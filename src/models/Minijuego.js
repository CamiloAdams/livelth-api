import { Schema, model } from "mongoose";

const minijuegoSchema = new Schema(
    {
        name: String,
        numero: Number,
    },
    {
        versionKey: false,
    }
);

export default model("Minijuego", minijuegoSchema);
