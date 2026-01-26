import express from "express";
import { getRoles, createRole, updateRole } from "../controllers/roleController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getRoles);
router.post("/", createRole);
router.put("/:id", updateRole);

export default router;
