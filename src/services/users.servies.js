import { UsersRepositories } from '../repositories/users.repositories.js';

export class UsersService {
  usersRepositories = new UsersRepositories();
  getUsers = async (userId) => {
    try {
      const myInfo = await this.usersRepositories.getUsers(userId);

      if (!myInfo) {
        return {
          success: false,
          message: '정보 조회 실패',
        };
      }
      return {
        success: true,
        message: '내 정보 조회에 성공했습니다.',
        data: {
          userId: myInfo.userId,
          email: myInfo.email,
          name: myInfo.name,
          createdAt: myInfo.createdAt,
          updatedAt: myInfo.updatedAt,
        },
      };
    } catch (err) {
      next(err);
    }
  };
}
