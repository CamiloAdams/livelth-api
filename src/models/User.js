import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
        },
        nombres: String,
        apellidos: String,
        fecha_nacimiento: Date,
        genero: String,
        email: {
            type: String,
            unique: true,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        roles: [
            {
                ref: "Role",
                type: Schema.Types.ObjectId,
            },
        ],
        id_colegio: {
            ref: "School",
            type: Schema.Types.ObjectId,
        },
        puntajes_maximos: {},
        tiempo_invertido: {},
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.statics.encryptPassword = async (password) => {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    return await bcrypt.hash(password, salt);
};
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
