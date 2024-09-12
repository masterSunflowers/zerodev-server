import express from "express";
import {
    generateCode
} from "../controllers/generate.js";

import {
    completeCode
} from "../controllers/completion.js";

const router = express.Router();

router.route("/v1/api/gen").post(generateCode);
router.route("/v1/api/completion").post(completeCode);

export default router