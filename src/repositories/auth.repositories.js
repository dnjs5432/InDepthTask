import bcrypt from 'bcrypt';
import { prisma } from '../utils/prisma/index.js';

export class AuthRepositories {
  signIn = async (email, password) => {
    const user = await prisma.Users.findUnique({ where: { email } });

    return user;
  };
  createUser = async (email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await prisma.Users.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return createdUser;
  };
}
