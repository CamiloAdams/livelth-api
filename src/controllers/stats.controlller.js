import Score from "../models/Score";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import School from "../models/School";

export const getUserStats = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token)
            return res.status(403).json({ message: "No token provided" });

        const decoded = await jwt.verify(token, config.SECRET);

        const user = await User.findById(decoded.id, {
            password: 0,
            roles: 0,
        });

        if (!user) return res.status(404).json({ message: "No user found" });

        res.status(201).json({
            tiempo_total_invertido:
                user.tiempo_invertido[1] +
                user.tiempo_invertido[2] +
                user.tiempo_invertido[3],
            minijuego1: {
                puntaje_maximo: user.puntajes_maximos[1],
                tiempo_invertido: user.tiempo_invertido[1],
            },
            minijuego2: {
                puntaje_maximo: user.puntajes_maximos[2],
                tiempo_invertido: user.tiempo_invertido[2],
            },
            minijuego3: {
                puntaje_maximo: user.puntajes_maximos[3],
                tiempo_invertido: user.tiempo_invertido[3],
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const getAdminStats = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token)
            return res.status(403).json({ message: "No token provided" });

        const decoded = await jwt.verify(token, config.SECRET);

        const user = await User.findById(decoded.id, {
            password: 0,
            roles: 0,
        });

        if (!user) return res.status(404).json({ message: "No user found" });

        // const usersAvg = await usersAverageScore();
        // const usersHighScoreAvg = await usersAverageHighScore();

        res.status(201).json({
            hombres_vs_mujeres: {
                hombres: await (await User.find({ genero: "H" })).length,
                mujeres: await (await User.find({ genero: "M" })).length,
            },
            usuarios_x_colegio: await getUsersXSchool(),
            promedio_puntajes_maximos: await usersAverageScore(),
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const usersAverageScore = async (req, res) => {
    let min1 = 0;
    let min2 = 0;
    let min3 = 0;

    const users = await User.find();

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.id_colegio == undefined) {
            continue;
        }
        min1 += element.puntajes_maximos[1];
        min2 += element.puntajes_maximos[2];
        min3 += element.puntajes_maximos[3];
    }

    min1 /= users.length - 1;
    min2 /= users.length - 1;
    min3 /= users.length - 1;

    return {
        minijuego1: min1,
        minijuego2: min2,
        minijuego3: min3,
    };
};

async function getUsersXSchool() {
    const schools = await School.find();
    const users = await User.find().populate("id_colegio");
    let objectSchools = {};

    for (let index = 0; index < schools.length; index++) {
        const element = schools[index];
        objectSchools[element.name] = 0;
    }

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.id_colegio == undefined) {
            continue;
        }
        objectSchools[element.id_colegio.name]++;
    }
    return objectSchools;
}

async function userAverageScore(userId) {
    const scores = await Score.find({ id_usuario: userId });
    var averageScore = 0;

    for (let index = 0; index < scores.length; index++) {
        const element = scores[index];
        averageScore += element.respuestas_correctas;
    }

    return (averageScore /= scores.length);
}

async function userScoreHistory(userId) {
    const scores = await Score.find(
        { id_usuario: userId },
        { _id: 0, id_usuario: 0, updatedAt: 0 }
    );
    return scores;
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

async function getGuidesXHighScore() {
    const guides = Guide.find();
    const users = await User.find();
    var guidesObject = createGuidesXHighScoreObject((await guides).length);

    for (let index = 0; index < users.length; index++) {
        const position = users[index].guias_completadas.length;
        guidesObject[position] = {
            num_usuarios: guidesObject[position].num_usuarios + 1,
            sum_high_score:
                guidesObject[position].sum_high_score + users[index].high_score,
        };
    }

    for (var key in guidesObject) {
        var element = guidesObject[key];

        guidesObject[key] = {
            num_usuarios: element.num_usuarios,
            avg_high_score:
                element.sum_high_score /
                (element.num_usuarios == 0 ? 1 : element.num_usuarios),
        };
    }

    return guidesObject;
}

function createGuidesXHighScoreObject(numGuias) {
    var guidesObject = {};
    for (let index = 0; index <= numGuias; index++) {
        guidesObject[index] = { num_usuarios: 0, sum_high_score: 0 };
    }
    return guidesObject;
}

async function getAgeXHighScore() {
    return await getUsersScoresAndAge();
}

async function getUsersScoresAndAge() {
    const users = await User.find(
        {},
        {
            _id: 0,
            username: 0,
            nombres: 0,
            apellidos: 0,
            email: 0,
            password: 0,
            roles: 0,
            guias_completadas: 0,
            createdAt: 0,
            updatedAt: 0,
        }
    );

    let ageMin = getAge(users[0].fecha_nacimiento);
    let ageMax = getAge(users[0].fecha_nacimiento);

    for (let index = 0; index < users.length; index++) {
        let element = users[index];
        users[index] = {
            high_score: element.high_score,
            age: getAge(element.fecha_nacimiento),
        };
        if (users[index].age > ageMax) ageMax = users[index].age;
        if (users[index].age < ageMin) ageMin = users[index].age;
    }
    let m = getNumIntervalos(users.length);
    let r = getRango(ageMax, ageMin);
    let c = getAmplitud(r, m);

    let statsObjectj = crearObjetoIntervalos(ageMax, ageMin, m, r, c);

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        for (var key in statsObjectj) {
            let value = statsObjectj[key];
            if (element.age == ageMin) {
                statsObjectj[key].num_usuarios += 1;
                statsObjectj[key].high_score_avg += element.high_score;
                statsObjectj[key].usuarios.push(element);
                break;
            }

            if (element.age > value.edad_min && element.age <= value.edad_max) {
                statsObjectj[key].num_usuarios += 1;
                statsObjectj[key].high_score_avg += element.high_score;
                statsObjectj[key].usuarios.push(element);
                break;
            }
        }
    }

    for (var key in statsObjectj) {
        let element = statsObjectj[key];
        statsObjectj[key].high_score_avg =
            element.high_score_avg /
            (element.num_usuarios == 0 ? 1 : element.num_usuarios);
    }
    return {
        age_min: ageMin,
        age_max: ageMax,
        num_users: users.length,
        stats: statsObjectj,
    };
}

//numero de intervalos
function getNumIntervalos(n) {
    return Math.ceil(1 + 3.3 * Math.log10(n));
}

//rango
function getRango(xmax, xmin) {
    return xmax - xmin;
}

//amplitud del intervalo
function getAmplitud(r, m) {
    return Math.ceil(r / m);
}

function crearObjetoIntervalos(xmax, xmin, m, r, c) {
    console.log(m * c - r);
    if (m * c > r) xmin -= m * c - r;
    let statsObject = {};

    console.log(xmin);
    statsObject[`${xmin} - ${xmin + c}`] = {
        high_score_avg: 0,
        num_usuarios: 0,
        edad_min: xmin,
        edad_max: (xmin += c),
        usuarios: [],
    };
    for (let index = 1; index < m; index++) {
        statsObject[`${xmin}.1 - ${xmin + c}`] = {
            high_score_avg: 0,
            num_usuarios: 0,
            edad_min: xmin,
            edad_max: (xmin += c),
            usuarios: [],
        };
    }
    console.log(statsObject);

    return statsObject;
}
