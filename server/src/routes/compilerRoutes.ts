import express from "express";
import { saveCode } from "../controllers/compilerController";

const router = express.Router();

router.post("/save", saveCode);

export default router;
