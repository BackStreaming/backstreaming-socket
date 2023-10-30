import { Response, Request } from "express";
import z from "zod";

import { client } from "../../prisma/client";
import { VerifyAuthToken } from "../../services/VerifyAuthToken";

const LottieSchema = z.object({
  actions: z.number(),
  author: z.string(),
  description: z.string(),
  duration: z.number(),
  hate: z.number().min(0).max(10),
  image: z.string(),
  lottie: z.any(),
  preview: z.string(),
  price: z.string(),
  text: z.number(),
  title: z.string(),
  type: z.string(),
  license: z.string(),
});

const resultTokenShema = z.object({
  user_id: z.string(),
  user_email: z.string(),
})

const verifyAuthToken = new VerifyAuthToken()

class LayerController {
  async publicLayers (req: Request, res: Response ) {
    try {
      const lotties = await client.overlays.findMany({
        where: {
          type: "public",
        },
      });
      
      res.status(200).send(lotties);
    } catch (error) {
      res.status(401).send({ message: error });
    }
  }

  async createLayers (req: Request, res: Response ) {
    try {

      const {tokenIsValid} = verifyAuthToken.verify(req, res)

      const { user_email, user_id } = resultTokenShema.parse(tokenIsValid)
      
      const hasLoginWithId = await client.user.findUnique({
        where: {
          user_email,
          user_id
        }
      })

      if(!!hasLoginWithId == false) {
        return res.status(401).send({ message: "Invalid login"})
      }


      const {
        actions,
        author,
        description,
        duration,
        hate,
        image,
        lottie,
        preview,
        price,
        text,
        title,
        type,
        license,
      } = LottieSchema.parse(req.body)

      const created = await client.overlays.create({
        data: {
          title,
          preview,
          image,
          price,
          hate,
          description,
          type,
          author,
          license,
          actions,
          text,
          duration,
          lottie,
          userId: hasLoginWithId.id,
        }
      });

      res.status(201).send(created)
    } catch (error) {
      res.status(401).send({
        message: error
      })
    }
  }
}

export { LayerController }