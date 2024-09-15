export class Receiver {
  private name: string;
  private phoneNumber: string;

  constructor({ name, phoneNumber }: { name: string; phoneNumber: string }) {
    this.name = name;
    this.phoneNumber = phoneNumber;
  }

  equals(other: Object) {
    if (other === null) return false;
    if (this === other) return true;
    if (!(other instanceof Receiver)) return false;

    const that = other as Receiver;
    return this.name === that.name && this.phoneNumber === that.phoneNumber;
  }

  getName = () => {
    return this.name;
  };

  getPhoneNumber = () => {
    return this.phoneNumber;
  };
}
