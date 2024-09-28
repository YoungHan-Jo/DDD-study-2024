import { PasswordNotMatchError } from '@src/shared/error/passwordNotMatchError';
import { Password } from './password';

export class Member {
  private password: Password;

  constructor(password: string) {
    this.password = new Password(password);
  }

  changePassword = (currentPassword: string, newPassword: string) => {
    if (!this.password.equals(new Password(currentPassword))) {
      throw new PasswordNotMatchError({
        message: 'Current password does not match',
      });
    }
    this.password = new Password(newPassword);
  };

  getPassword = () => {
    return this.password;
  };
}
