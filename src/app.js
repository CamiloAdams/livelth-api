import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import cors from "cors";

import {
    createRoles,
    createAdminUser,
    createSchools,
    createMiniGames,
} from "./libs/initialSetup";

import authRoutes from "./routes/auth.routes";
import scoreRoutes from "./routes/score.routes";

const app = express();

createRoles();
createSchools();
createAdminUser();
createMiniGames();

app.set("pkg", pkg);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        name: app.get("pkg").name,
        author: app.get("pkg").author,
        description: app.get("pkg").description,
        version: app.get("pkg").version,
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);

export default app;
