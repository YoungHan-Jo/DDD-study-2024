import { PasswordNotMatchError } from '@src/shared/error/passwordNotMatchError';
import { Member } from './member/entity/member';
import { Password } from './member/value/password';
import { Address } from '@src/modules/order/domain/order/address';

describe('Member', () => {
  const address = new Address({
    address1: 'address1',
    address2: 'address2',
    zipCode: 'zipCode',
  });

  it('change password', () => {
    // Given
    const currentPassword = 'password';
    const newPassword = 'newPassword';
    const member = new Member({
      address: address,
      password: currentPassword,
    });

    // When
    member.changePassword(currentPassword, newPassword);

    // Then
    expect(member.getPassword().equals(new Password(newPassword))).toBeTruthy();
  });

  it('If wrong currentPassword, throw PasswordNotMatchError', () => {
    // Given
    const member = new Member({
      address: address,
      password: 'password',
    });

    // When & Then
    expect(() => {
      member.changePassword('wrongPassword', 'newPassword');
    }).toThrow(PasswordNotMatchError);
  });
});
