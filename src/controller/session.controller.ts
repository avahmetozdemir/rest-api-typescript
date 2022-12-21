import { Request, Response } from "express";
import { createSession, findSessions } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
export async function createUserSessionHandler(req: Request, res: Response) {
  //valide the user's password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  //create a session
  const session = await createSession(user._id, req.get("user-agent") || "");
  //create an access token

  const time = config
    .get<string>("accessTokenTtl")
    .split(String.raw`\n`)
    .join("\n");

  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: time,
    }
  );

  //create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: time,
    }
  );
  //return access and refresh token

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: false });

  return res.send(sessions);
}
