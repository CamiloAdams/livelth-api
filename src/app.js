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
import statsRoutes from "./routes/stats.routes";
import userRoutes from "./routes/user.routes";

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
app.use("/api/stats", statsRoutes);
app.use("/api/user", userRoutes);

export default app;
