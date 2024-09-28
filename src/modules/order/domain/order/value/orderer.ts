import { MemberId } from '@src/shared/valueObject';

export class Orderer {
  private memberId: MemberId;
  private name: string;
  private email: string;

  constructor({ name, email }: { name: string; email: string }) {
    this.name = name;
    this.email = email;
  }

  getMemberId = () => {
    return this.memberId;
  };
}
