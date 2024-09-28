import { PasswordNotMatchError } from '@src/shared/error/passwordNotMatchError';
import { Member } from './member';
import { Password } from './password';

describe('Member', () => {
  it('change password', () => {
    // Given
    const currentPassword = 'password';
    const newPassword = 'newPassword';
    const member = new Member(currentPassword);

    // When
    member.changePassword(currentPassword, newPassword);

    // Then
    expect(member.getPassword().equals(new Password(newPassword))).toBeTruthy();
  });

  it('If wrong currentPassword, throw PasswordNotMatchError', () => {
    // Given
    const member = new Member('password');

    // When & Then
    expect(() => {
      member.changePassword('wrongPassword', 'newPassword');
    }).toThrow(PasswordNotMatchError);
  });
});
