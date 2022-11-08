import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import School from "../models/School";

/**
 * Used to register a new user in database
 * @param {*} req
 * @param {*} res
 * @returns res.json with the authorization token
 */

export const register = async (req, res) => {
    //Get the parameters stored in req.body
    const {
        username,
        nombres,
        apellidos,
        fecha_nacimiento,
        email,
        password,
        colegio,
    } = req.body;

    //check if username or email already exists
    const userFound = await User.findOne({ username });
    const emailFound = await User.findOne({ email });

    if (userFound)
        return res.status(400).json({ message: "User already in use" });

    if (emailFound)
        return res.status(400).json({ message: "Email already in use" });

    // Create a new user
    const newUser = new User({
        username,
        nombres,
        apellidos,
        fecha_nacimiento,
        email,
        password: await User.encryptPassword(password),
        puntajes_maximos: { 1: 0, 2: 0, 3: 0 },
        tiempo_invertido: { 1: 0, 2: 0, 3: 0 },
    });

    // if (roles) {
    //     const foundRoles = await Role.find({ name: { $in: roles } });
    //     newUser.roles = foundRoles.map((role) => role._id);
    // } else {
    // Assign the user role to the new user
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];

    // }
    const foundSchool = await School.findOne({
        name: colegio,
    });
    if (!foundSchool)
        return res.status(400).json({ message: "Colegio no encontrado" });

    newUser.id_colegio = foundSchool._id;

    // Save new user in db
    const savedUser = await (
        await newUser.save()
    ).populate("roles", {
        _id: 0,
    });
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400,
    });
    const roles = [];

    savedUser.roles.forEach((role) => {
        roles.push(role.name);
    });

    res.json({ token, roles: roles });
};

export const login = async (req, res) => {
    const userFound = await User.findOne({ email: req.body.email }).populate(
        "roles",
        { _id: 0 }
    );

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const matchPassword = await User.comparePassword(
        req.body.password,
        userFound.password
    );

    if (!matchPassword)
        return res
            .status(401)
            .json({ token: null, message: "Wrong credentials" });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400,
    });

    const roles = [];

    userFound.roles.forEach((role) => {
        roles.push(role.name);
    });

    res.json({ token, roles: roles });
};
