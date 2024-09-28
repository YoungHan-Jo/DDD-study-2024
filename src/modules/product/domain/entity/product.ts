import { StoreId } from '@src/shared/valueObject/storeId';
import { ProductId } from '../value/productId';

export class Product {
  private id: ProductId;
  private name: string;
  private storeId: StoreId;

  constructor({
    id,
    name,
    storeId,
  }: {
    id: ProductId;
    name: string;
    storeId: StoreId;
  }) {
    this.id = id;
    this.name = name;
    this.storeId = storeId;
  }
}
