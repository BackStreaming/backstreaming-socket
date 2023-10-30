import { Response, Request } from "express";
import { decode } from "jsonwebtoken";
import z from "zod"

import { client } from "../../prisma/client";
import { VerifyAuthToken } from "../../services/VerifyAuthToken";

const jwtSchema = z.object({
  user_email: z.string(),
  user_id: z.string(),
})

const verifyAuthToken = new VerifyAuthToken()

class PlaylistController {
  async User(req: Request, res: Response) {
    try {

      const { token } = verifyAuthToken.verify(req, res)

      const { user_email, user_id } = jwtSchema.parse(decode(token));

      const lotties = await client.user.findMany({
        where: {
          user_email,
          user_id,
        },
        include: {
          lotties: true,
        },
      });

      res.status(200).send(lotties);
    } catch (erro) {
      res.send({ message: erro });
    }
  }
}

export { PlaylistController };
