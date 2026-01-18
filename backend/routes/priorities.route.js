import express from "express";
import {
	getPriorites,
	updatePriorities,
} from "../controllers/priorities.controller.js";

const router = express.Router();

router.get("/", getPriorites);
router.post("/update", updatePriorities);

export default router;
