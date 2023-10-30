import { Response, Request } from "express";
import { z } from "zod";
import { sign } from "jsonwebtoken";

import { client } from "../../prisma/client";
import { UserAuthModel } from "../../model/AuthModel/UserAuth";

const userSchema = z.object({
  user_email: z.string({ required_error: 'required string email'}).email('invalid email'),
  user_id: z.string({ required_error: 'required string id'}).min(20, 'invalid id')
});

const SECRET = process.env.SECRET_KEY

class LoginController {
  async login(req: Request, res: Response) {
    try {
      const { user_email, user_id } = userSchema.parse(req.body)

      const hasUserWithToken = await client.user.findUnique({
        where: {
          user_email,
          user_id,
        }
      })

      const token = sign({
        user_email,
        user_id,
      }, SECRET, {
        expiresIn: '30d',
        algorithm: 'HS256'
      });

      const userAuthModel = new UserAuthModel()

      if(!!hasUserWithToken === false) {
        const user = await userAuthModel.create(token, user_email, user_id)
        
        return res.status(200).send(user)
      }

      const user = await userAuthModel.update(token, user_email, user_id)
        
      return res.status(200).send(user)
    } catch (err) {
      res.send(err.message);
    }
  }
}

export { LoginController };
