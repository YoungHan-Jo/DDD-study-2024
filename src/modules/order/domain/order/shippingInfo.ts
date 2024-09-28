import { Address } from './address';
import { Receiver } from './receiver';

export class ShippingInfo {
  private receiver: Receiver;
  private address: Address;

  constructor({ receiver, address }: { receiver: Receiver; address: Address }) {
    this.receiver = receiver;
    this.address = address;
  }

  getAddress = () => {
    return this.address;
  };
}
