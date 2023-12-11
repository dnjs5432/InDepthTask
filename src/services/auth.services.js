import bcrypt from 'bcrypt';
import { AuthRepositories } from '../repositories/auth.repositories.js';
import {
  PASSWORD_HASH_SALT_ROUNDS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../../constants/security.costant.js';

import jwt from 'jsonwebtoken';

export class AuthService {
  authRepositories = new AuthRepositories();

  findUserByEmail = async (email) => {
    const user = await this.authRepositories.findUserByEmail(email);
    return user;
  };

  signIn = async (email, password) => {
    if (!email || !password) {
      return {
        success: false,
        message: '이메일과 비밀번호를 입력해주세요.',
      };
    }

    const user = await this.authRepositories.findUserByEmail(email);

    const hashedPassword = user?.password ?? '';
    const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);

    console.log('password', password);
    console.log('hashedPassword', hashedPassword);

    const isCorrectUser = user && isPasswordMatched;
    console.log('user', user);
    console.log('isPasswordMatched', isPasswordMatched);
    if (!isCorrectUser) {
      return {
        success: false,
        message: '일치하는 인증 정보가 없습니다.',
      };
    }
    const accessToken = jwt.sign({ userId: user.id }, JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
    return {
      accessToken,
    };
  };

  createUser = async (email, password, passwordConfirm, name) => {
    if (!email || !password || !passwordConfirm || !name) {
      return {
        success: false,
        message: '양식을 모두 채워주세요.',
      };
    }

    if (password !== passwordConfirm) {
      return {
        success: false,
        message: '입력 한 비밀번호가 서로 일치하지 않습니다.',
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: '비밀번호는 최소 6자리 이상입니다.',
      };
    }

    let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
    const isValidEmail = emailValidationRegex.test(email);
    if (!isValidEmail) {
      return {
        success: false,
        message: '올바른 이메일 형식이 아닙니다.',
      };
    }

    const existedUser = await this.authRepositories.findUserByEmail(email);

    if (existedUser) {
      return {
        success: false,
        message: '이미 가입 된 이메일입니다.',
      };
    }

    const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);

    const newUser = await this.authRepositories.createUser(
      email,
      hashedPassword,
      name,
    );
    delete newUser.password;
    console.log('newUser', newUser);
    return newUser;
  };
}
