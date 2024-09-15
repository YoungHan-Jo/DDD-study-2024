export class Receiver {
  private name: string;
  private phoneNumber: string;

  constructor({ name, phoneNumber }: { name: string; phoneNumber: string }) {
    this.name = name;
    this.phoneNumber = phoneNumber;
  }

  getName = () => {
    return this.name;
  };

  getPhoneNumber = () => {
    return this.phoneNumber;
  };
}
