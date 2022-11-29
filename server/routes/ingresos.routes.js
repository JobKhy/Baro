import { Router } from "express";
import { updateIngreso } from "../controllers/ingresos.controller.js";


const router = Router();

router.post("/updateIngreso", updateIngreso)

export default router;