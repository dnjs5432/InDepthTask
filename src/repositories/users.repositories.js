import { prisma } from '../utils/prisma/index.js';

export class UsersRepositories {
  getUsers = async (userId) => {
    const myInfo = await prisma.users.findFirst({
      where: { userId: +userId },
    });
    return myInfo;
  };
}
