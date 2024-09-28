import { PasswordNotMatchError } from '@src/shared/error/passwordNotMatchError';
import { Password } from '../value/password';
import { Address } from '@src/modules/order/domain/order/address';

export class Member {
  private password: Password;
  private address: Address;

  constructor({ password, address }: { password: string; address: Address }) {
    this.password = new Password(password);
    this.address = address;
  }
  getPassword = () => {
    return this.password;
  };

  getAddress = () => {
    return this.address;
  };

  changePassword = (currentPassword: string, newPassword: string) => {
    if (!this.password.equals(new Password(currentPassword))) {
      throw new PasswordNotMatchError({
        message: 'Current password does not match',
      });
    }
    this.password = new Password(newPassword);
  };

  changeAddress = (address: Address) => {
    this.address = address;
  };
}
