import { Money } from '@src/shared/valueObject';
import { Product } from './product';

export class OrderLine {
  private product: Product;
  private price: Money;
  private quantity: number;
  private amounts: Money;

  constructor({
    product,
    price,
    quantity,
  }: {
    product: Product;
    price: Money;
    quantity: number;
  }) {
    this.product = product;
    this.price = price;
    this.quantity = quantity;
    this.amounts = this.calculateAmounts();
  }

  private calculateAmounts = () => {
    return this.price.multiply(this.quantity);
  };

  getAmounts = () => {
    return this.amounts;
  };
}
