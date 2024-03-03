import express from "express";
import { loadCode, saveCode } from "../controllers/compilerController";

const router = express.Router();

router.post("/save", saveCode);
router.post("/load", loadCode);

export default router;
