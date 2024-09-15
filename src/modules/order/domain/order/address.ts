export class Address {
  private address1: string;
  private address2: string;
  private zipCode: string;

  constructor({
    address1,
    address2,
    zipCode,
  }: {
    address1: string;
    address2: string;
    zipCode: string;
  }) {
    this.address1 = address1;
    this.address2 = address2;
    this.zipCode = zipCode;
  }

  getAddress1 = () => {
    return this.address1;
  };

  getAddress2 = () => {
    return this.address2;
  };

  getZipCode = () => {
    return this.zipCode;
  };
}
