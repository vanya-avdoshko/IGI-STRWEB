import express from "express";
import Vacancy from "../models/vacancy.model.js";
import { getVacancies, createVacancy } from "../controllers/vacancy.controller.js";
const router = express.Router();

router.get("/", getVacancies);
router.post("/", createVacancy);


export default router;