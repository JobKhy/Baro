import { Router } from "express";
import { getUser, createUser, checkSession, setProfile, logout } from "../controllers/users.controller.js";

const router = Router();

// post a new user
router.post("/", createUser)
router.post("/setProfile", setProfile)
router.post('/getUser', getUser)

router.get("/checkSession", checkSession)
router.get("/logout", logout)


export default router;