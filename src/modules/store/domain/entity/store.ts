import { Product } from '@src/modules/order/domain';
import { ProductId } from '@src/modules/product/domain/value/productId';
import { StoreBlockedError } from '@src/shared/error/storeBlockedError';
import { StoreId } from '@src/shared/valueObject/storeId';

export class Store {
  private id: StoreId;
  private isBlocked: boolean;

  constructor({ id, isBlocked }: { id: StoreId; isBlocked: boolean }) {
    this.id = id;
    this.isBlocked = isBlocked;
  }

  createProduct = (id: ProductId, newProductName: string) => {
    if (this.isBlocked) {
      throw new StoreBlockedError({ message: 'Store is blocked' });
    }
    return new Product({
      id,
      name: newProductName,
      storeId: this.id,
    });
  };
}
