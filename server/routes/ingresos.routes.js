import { Router } from "express";
import { updateIngreso } from "../controllers/ingresos.controller.js";


const router = Router();

router.get("/updateIngreso/:ingreso", updateIngreso)

export default router;