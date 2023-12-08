import bcrypt from 'bcrypt';
import { AuthRepositories } from '../../repositories/auth.repositories.js';

export class AuthService {
  authRepositories = new AuthRepositories();

  SingIn = async (email, password) => {
    const user = await prisma.Users.findUnique({ where: email });

    if (!user) {
      return null;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return null;
    }
    return user;
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

    const existedUser = await Users.findUnique({ where: { email } });

    if (existedUser) {
      return {
        success: false,
        message: '이미 가입 된 이메일입니다.',
      };
    }

    const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);

    const newUser = await this.authRepositories.createUser({
      email,
      password: hashedPassword,
      name,
    });

    delete newUser.password;
  };
}
