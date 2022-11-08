import Minijuego from "../models/Minijuego";
import Role from "../models/Role";
import School from "../models/School";
import User from "../models/User.js";

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;

        const values = await Promise.all([
            new Role({ name: "user" }).save(),
            new Role({ name: "moderator" }).save(),
            new Role({ name: "admin" }).save(),
        ]);
        console.log(values);
    } catch (error) {
        console.error(error);
    }
};

export const createSchools = async () => {
    try {
        const count = await School.estimatedDocumentCount();

        if (count > 0) return;

        const values = await Promise.all([
            new School({ name: "COLEGIO MONTESSORI BRITISH SCHOOl" }).save(),
            new School({ name: "COLEGIO ABRAHAM LINCOLN" }).save(),
            new School({ name: "COLEGIO ACADEMIA SANTA SOFIA" }).save(),
            new School({ name: "COLEGIO ADOLFO LEON GOMEZ" }).save(),
        ]);
        console.log(values);
    } catch (error) {
        console.error(error);
    }
};

export const createMiniGames = async () => {
    try {
        const count = await Minijuego.estimatedDocumentCount();

        if (count > 0) return;

        const values = await Promise.all([
            new Minijuego({
                name: "Atrapa la comida saludable",
                numero: 1,
            }).save(),
            new Minijuego({
                name: "Memoriza la actividad física",
                numero: 2,
            }).save(),
            new Minijuego({ name: "Laberinto", numero: 3 }).save(),
        ]);
        console.log(values);
    } catch (error) {
        console.error(error);
    }
};

export const createAdminUser = async () => {
    const userFound = await User.findOne({ email: "admin@livelth" });

    if (userFound) return;

    const newUser = new User({
        username: "admin",
        nombres: "admin",
        apellidos: "admin",
        fecha_nacimiento: "2000-05-01",
        email: "admin@livelth",
        password: await User.encryptPassword("livelth"),
        puntajes_maximos: {},
        tiempo_invertido: {},
    });

    const foundSchool = await School.find({
        name: "COLEGIO ACADEMIA SANTA SOFIA",
    });

    const foundRoles = await Role.find({ name: "admin" });

    newUser.id_colegio = foundSchool._id;

    newUser.roles = foundRoles.map((role) => role._id);

    const admin = await newUser.save();

    console.log("Admin user created", admin);
};
