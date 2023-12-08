import { AuthService } from '../services/auth.services.js';

export class AuthController {
  authService = new AuthService();
  // 로그인
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: '이메일 입력이 필요합니다.',
        });
      }

      if (!password) {
        return res.status(400).json({
          success: false,
          message: '비밀번호 입력이 필요합니다.',
        });
      }

      const user = (await Users.findUnique({ where: { email } }))?.toJSON();
      const hashedPassword = user?.password ?? '';
      const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);

      const isCorrectUser = user && isPasswordMatched;

      if (!isCorrectUser) {
        return res.status(401).json({
          success: false,
          message: '일치하는 인증 정보가 없습니다.',
        });
      }

      const accessToken = jwt.sign(
        { userId: user.id },
        JWT_ACCESS_TOKEN_SECRET,
        {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
        },
      );

      return res.status(200).json({
        success: true,
        message: '로그인에 성공했습니다.',
        data: { accessToken },
      });
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
          message: '',
        });
      }

      const newUser = await this.authService.createUser(
        email,
        password,
        passwordConfirm,
        name,
      );

      return res.status(201).json({
        success: true,
        message: '회원가입에 성공했습니다.',
        data: newUser,
      });
    } catch (err) {
      next(err);
    }
  };
}
