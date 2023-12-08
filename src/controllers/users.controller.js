// import { UsersServies } from '../services/users.servies';

export class UsersController {
  // usersServies = new UsersServies();
  getUsers = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const myInfo = await this.usersServies.findFirstUsers({
        where: { Id: +userId },
        select: {
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.status(200).json({
        success: true,
        message: '내 정보 조회에 성공했습니다.',
        data: myInfo,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };
}
