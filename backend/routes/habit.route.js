import express from "express";
import {
	getAllHabits,
	createHabit,
	updateCompletedDates,
	getCompletedDates,
} from "../controllers/habit.controller.js";

const router = express.Router();

router.get("/", getAllHabits);
router.post("/create", createHabit);
router.get("/:id/completedDates", getCompletedDates);
router.post("/:id/updateCompletedDates", updateCompletedDates);

export default router;
