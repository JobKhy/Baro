import { Router } from "express";
import { createGastoDiario } from "../controllers/gastos.controller.js";

const router = Router();

router.post("/createGastoDiario", createGastoDiario)

export default router;