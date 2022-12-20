import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";

export async function createUserSessionHandler(req: Request, res: Response) {
  //valide the user's password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  //create a session
  //create an access token
  //create a refresh token
  //return access and refresh token
}
