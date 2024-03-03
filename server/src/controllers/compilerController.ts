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
      .json({ message: "Code Saved Successfully !!", url: newCode._id });
  } catch (error) {
    return res.status(500).json({ message: "Error saving code", error });
  }
};

export const loadCode = async (req: express.Request, res: express.Response) => {
  try {
    const { codeId } = req.body;

    const existingCode = await Code.findById(codeId);

    if (!existingCode) {
      return res.status(404).json({ message: "Code not found !" });
    }

    return res.status(200).json({ fullCode: existingCode.fullCode });
  } catch (error) {
    res.status(500).json({ message: "Error loading Code", error });
  }
};
