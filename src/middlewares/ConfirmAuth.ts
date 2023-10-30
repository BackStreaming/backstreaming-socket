import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

require('dotenv').config()

const SECRET = process.env.SECRET_KEY;

class ConfirmAuth {
  async tokenVerify (req: Request, res: Response, _next: NextFunction) {
    const hasToken = req.headers.authorization;

    if (!hasToken) {
      return res.status(401).send({
        message: "missin token",
      });
    }

    const [, token] = hasToken.split(" ");

    const tokenIsValid = verify(token, SECRET);

    if (!tokenIsValid) {
      return res.status(401).send({
        message: "missin token",
      });
    }

    return _next()
  }
}

export { ConfirmAuth }