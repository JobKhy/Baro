import { Router } from "express";
import { createGastoDiario, getGastos } from "../controllers/gastos.controller.js";

const router = Router();

router.post("/createGastoDiario", createGastoDiario)
router.get("/getGastos", getGastos)

export default router;