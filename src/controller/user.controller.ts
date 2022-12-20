import { Request, Response } from "express";
import { createUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
  } catch (error: any) {
    console.log(error);
    return res.status(409).send(error.message);
  }
}
