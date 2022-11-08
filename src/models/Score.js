import { Schema, model } from "mongoose";

const scoreSchema = new Schema(
    {
        id_usuario: {
            ref: "User",
            type: Schema.Types.ObjectId,
        },
        puntos: Number,
        minijuego: {
            ref: "Minijuego",
            type: Schema.Types.ObjectId,
        },
        tiempo: Number,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Score", scoreSchema);
