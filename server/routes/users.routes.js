import { Router } from "express";
import {
  getUser,
  createUser,
  checkSession,
  setProfile,
  logout,
  updatePhoto,
  updateUser,
  cleanAccount,
  deleteAccount,
} from "../controllers/users.controller.js";
import mymulter from "../multer.js";

const router = Router();

// post a new user
router.post("/", createUser);
router.post("/setProfile", setProfile);
router.post("/getUser", getUser);

router.get("/checkSession", checkSession);
router.get("/logout", logout);

router.post("/updatePhoto", mymulter.single("profilePic"), updatePhoto);
router.get("/updateUser/:name", updateUser);

router.get("/cleanAccount", cleanAccount);
router.post("/deleteAccount", deleteAccount)

export default router;
