export class ShippingInfo {
  private receiverName: string;
  private receiverPhoneNumber: string;
  private shippingAddress1: string;
  private shippingAddress2: string;
  private shippingZipCode: string;

  constructor({
    receiverName,
    receiverPhoneNumber,
    shippingAddress1,
    shippingAddress2,
    shippingZipCode,
  }: {
    receiverName: string;
    receiverPhoneNumber: string;
    shippingAddress1: string;
    shippingAddress2: string;
    shippingZipCode: string;
  }) {
    this.receiverName = receiverName;
    this.receiverPhoneNumber = receiverPhoneNumber;
    this.shippingAddress1 = shippingAddress1;
    this.shippingAddress2 = shippingAddress2;
    this.shippingZipCode = shippingZipCode;
  }
}
