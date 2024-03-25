import { User } from './entities/user.entity';

export const getUserWithoutPassword = (user: User) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
