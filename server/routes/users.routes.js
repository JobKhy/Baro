import { Router } from "express";
import { getUserById, insertNewUser } from "../controllers/users.controller.js";

const router = Router();

// post a new user
router.post("/users", insertNewUser)

router.get('/users/:id', getUserById)

export default router;