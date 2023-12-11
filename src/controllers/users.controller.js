import { UsersService } from '../services/users.servies.js';

export class UsersController {
  usersService = new UsersService();
  getUsers = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;

      const myInfo = await this.usersService.getUsers(userId);

      return res.status(200).json(myInfo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };
}
