import { Product } from './product';

export class OrderLine {
  private product: Product;
  private price: number;
  private quantity: number;
  private amounts: number;

  constructor({
    product,
    price,
    quantity,
  }: {
    product: Product;
    price: number;
    quantity: number;
  }) {
    this.product = product;
    this.price = price;
    this.quantity = quantity;
    this.amounts = this.calculateAmounts();
  }

  private calculateAmounts = () => {
    return this.price * this.quantity;
  };

  getAmounts = () => {
    return this.amounts;
  };
}
