import * as express from "express";
import { Code } from "../models/Code";

export const saveCode = async (req: express.Request, res: express.Response) => {
  try {
    const { fullCode } = req.body;
    const newCode = await Code.create({
      fullCode,
    });

    return res
      .status(201)
      .json({ message: "Code Saved Successfully !!", newCode });
  } catch (error) {
    return res.status(500).json({ message: "Error saving code", error });
  }
};
