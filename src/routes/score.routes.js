import { Router } from "express";

import * as scoreCtrl from "../controllers/score.controller";
import { authjwt } from "../middlewares";

const router = Router();

router.post("/", [authjwt.verifyToken], scoreCtrl.createScore);

router.get("/", [authjwt.verifyToken], scoreCtrl.getScores);

router.get("/:scoreId", [authjwt.verifyToken], scoreCtrl.getScoreById);

router.put(
    "/:scoreId",
    [authjwt.verifyToken, authjwt.isAdmin],
    scoreCtrl.updateScoreById
);

router.delete(
    "/:scoreId",
    [authjwt.verifyToken, authjwt.isAdmin],
    scoreCtrl.deleteScoreById
);

export default router;
