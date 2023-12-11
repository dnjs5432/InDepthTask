import bcrypt from 'bcrypt';
import { prisma } from '../utils/prisma/index.js';
import { PASSWORD_HASH_SALT_ROUNDS } from '../../constants/security.costant.js';

export class AuthRepositories {
  findUserByEmail = async (email) => {
    const existUser = await prisma.users.findFirst({ where: { email } });

    return existUser;
  };
  signIn = async (email, password) => {
    const signInUser = await prisma.users.findFirst({ where: { email } });

    return signInUser;
  };

  createUser = async (email, password, name) => {
    console.log('password', password);
    const createdUser = await prisma.users.create({
      data: {
        email,
        password,
        name,
      },
    });
    return createdUser;
  };
}
