import Score from "../models/Score";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Minijuego from "../models/Minijuego";

export const createScore = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token)
            return res.status(403).json({ message: "No token provided" });

        const decoded = await jwt.verify(token, config.SECRET);

        const user = await User.findById(decoded.id, { password: 0 });

        if (!user) return res.status(404).json({ message: "No user found" });

        const { numero_minijuego, puntaje, tiempo } = req.body;

        if (numero_minijuego == 2) {
            let puntajesMaximos = user.puntajes_maximos;
            if (
                user.puntajes_maximos[numero_minijuego] == 0 ||
                puntaje < user.puntajes_maximos[numero_minijuego]
            ) {
                puntajesMaximos[numero_minijuego] = puntaje;
                const updateHighScore = await User.findByIdAndUpdate(
                    decoded.id,
                    { puntajes_maximos: puntajesMaximos },
                    { new: true }
                );
                console.log(updateHighScore);
            }
        } else if (puntaje > user.puntajes_maximos[numero_minijuego]) {
            let puntajesMaximos = user.puntajes_maximos;
            for (const key in puntajesMaximos) {
                if (key == numero_minijuego) puntajesMaximos[key] = puntaje;
            }
            const updateHighScore = await User.findByIdAndUpdate(
                decoded.id,
                { puntajes_maximos: puntajesMaximos },
                { new: true }
            );
            console.log(updateHighScore);
        }

        let tiempos = user.tiempo_invertido;
        for (const key in tiempos) {
            if (key == numero_minijuego) tiempos[key] += tiempo;
        }
        const updateTime = await User.findByIdAndUpdate(
            decoded.id,
            { tiempo_invertido: tiempos },
            { new: true }
        );
        console.log(updateTime);

        const minijuego = Minijuego.findOne({ numero: numero_minijuego });

        if (!minijuego)
            return res.status(404).json({ message: "minijuego not found" });

        const newScore = new Score({
            id_usuario: decoded.id,
            minijuego: minijuego._id,
            puntos: puntaje,
            tiempo: tiempo,
        });

        const scoreSaved = await newScore.save();

        res.status(201).json(scoreSaved);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const getScores = async (req, res) => {
    const scores = await Score.find();
    res.json(scores);
};

export const getScoreById = async (req, res) => {
    await Score.findById(req.params.scoreId, function (err, data) {
        if (!err) {
            res.status(200).json(data);
        } else {
            console.error;
            res.status(500).json("An error has ocurred");
        }
    })
        .clone()
        .catch(function (err) {
            console.log("An error has ocurred");
        });
};

export const updateScoreById = async (req, res) => {
    try {
        const updatedScore = await Score.findByIdAndUpdate(
            req.params.scoreId,
            req.body,
            { new: true }
        );
        if (!updatedScore)
            return res.status(400).json({ message: "Score not found" });
        res.status(200).json(updatedScore);
    } catch (error) {
        console.log(error);
    }
};

export const deleteScoreById = async (req, res) => {
    const { scoreId } = req.params;
    await Score.findByIdAndDelete(scoreId);
    res.status(204).json();
};
