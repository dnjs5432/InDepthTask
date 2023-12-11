import { AuthService } from '../services/auth.services.js';

export class AuthController {
  authService = new AuthService();
  // 로그인
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const signInUser = await this.authService.signIn(email, password);

      if (signInUser.accessToken) {
        return res.status(200).json({
          success: true,
          message: '로그인에 성공했습니다.',
          data: signInUser.accessToken,
        });
      } else if (!signInUser.success) {
        return res.status(400).json(signInUser);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, name } = req.body;

      if (!email || !password || !passwordConfirm || !name) {
        return res.status(400).json({
          success: false,
          message: '빈칸을 모두 채워주세요.',
        });
      }

      const newUser = await this.authService.createUser(
        email,
        password,
        passwordConfirm,
        name,
      );
      if (newUser.id) {
        return res.status(201).json({
          success: true,
          message: '회원가입에 성공했습니다.',
          data: newUser,
        });
      } else if (!newUser.success) {
        return res.status(400).json(newUser);
      }
    } catch (err) {
      next(err);
    }
  };
}
