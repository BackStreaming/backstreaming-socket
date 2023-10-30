import { Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY;

class VerifyAuthToken {
  verify (req: Request, res: Response): {
    tokenIsValid: string | JwtPayload, 
    hasToken: string, 
    token: string
  } {
    const hasToken = req.headers.authorization;
    
    const [, token] = hasToken.split(" ");

    const tokenIsValid = verify(token, SECRET);

    return { tokenIsValid, hasToken, token }
  }
}

export { VerifyAuthToken }