import express from 'express'
import z from 'zod'
import { prisma } from '../prisma/prisma-client'

const userRouter = express.Router()

userRouter.post('/user/login/:id', async (req, res) => {
  const bodyProps = z.object({
    name: z.string()
  })

  const { id } = req.params
  const { name } = bodyProps.parse(req.body)

  const hasUser = await prisma.user.findUnique({
    where: {
      uuid: id
    },
  })

  console.log(!!hasUser, hasUser)

  if(!!hasUser === false) {
    const user = prisma.user.create({
      data: {
        name,
        uuid: id
      }
    })

    res.status(201).json(user)
  } 
  // else {
  //   res.status(204).json({
  //     error: 'usuario existente'
  //   })
  // }
})

export { userRouter }