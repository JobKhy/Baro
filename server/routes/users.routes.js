import { Router } from "express";
import { getUserById, createUser, checkSession } from "../controllers/users.controller.js";

const router = Router();

// post a new user
router.post("/", createUser)

router.get('/users/:id', getUserById)

router.get("/checkSession", checkSession)

export default router;