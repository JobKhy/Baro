import { Router } from "express";
import { pool } from "../DB/DB.js";

const router = Router();

router.get("/ping", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT 1 + 1 AS solution");
    res.json(result);
  } catch (e) {
    res.send("Error: " + e);
  }
});

router.get("/ping/:id", (req, res) => res.send("pong " + req.params.id));

export default router;
