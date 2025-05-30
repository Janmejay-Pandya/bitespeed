// src/controllers/identifyController.ts

import { Request, Response } from "express";
import { identifyUser } from "../services/identifyService";

export const handleIdentify = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber } = req.body;
    const result = await identifyUser({ email, phoneNumber });
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
