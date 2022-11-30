import { Router } from "express";
import { createGastoDiario, getGastos, getSemanas } from "../controllers/gastos.controller.js";

const router = Router();

router.post("/createGastoDiario", createGastoDiario)
router.get("/getGastos", getGastos)
router.get("/getSemanas", getSemanas)

export default router;