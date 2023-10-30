import { client } from "../../prisma/client";

class UserAuthModel {
  async create(token: string, user_email: string, user_id: string) {
    const create = await client.user.create({
      data: {
        token,
        user_email,
        user_id,
      },
    });

    return create;
  }

  async update(token: string, user_email: string, user_id: string) {
    const update = await client.user.update({
      where: {
        user_email, 
        user_id,
      },
      data: {
        token,
      },
    });

    return update;
  }
}

export { UserAuthModel };
