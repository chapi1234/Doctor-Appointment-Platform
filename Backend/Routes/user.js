
import express from "express"
import {updateUser, deleteUser, getSingleUser, getAllUser, getUserProfile, getMyAppointments} from "../controllers/userController.js"
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id",authenticate, restrict(['patient']), getSingleUser);
router.get("/",authenticate, restrict(['admin']), getAllUser);
router.put("/:id",authenticate, restrict(['patient']), updateUser);
router.delete("/:id",authenticate, restrict(['patient']), deleteUser);
router.get("/profile/me",authenticate, restrict(['patient']), getUserProfile);
router.delete("/appointments/my-appointments",authenticate, restrict(['patient']), getMyAppointments);
router.get("appointments/my-appointments",authenticate, restrict(['patient']), getMyAppointments);

export default router; 
