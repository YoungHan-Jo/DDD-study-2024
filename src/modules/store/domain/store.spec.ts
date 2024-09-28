import { StoreId } from '@src/shared/valueObject/storeId';
import { randomUUID } from 'crypto';
import { Store } from './entity/store';
import { ProductId } from '@src/modules/product/domain/value/productId';
import { StoreBlockedError } from '@src/shared/error/storeBlockedError';

describe('store domain', () => {
  it('if store is blocked, throw StoreBlockedError', () => {
    // Given
    const store = new Store({
      id: new StoreId(randomUUID()),
      isBlocked: true,
    });

    // When & Then
    expect(() => {
      store.createProduct(new ProductId(randomUUID()), 'new product name');
    }).toThrow(StoreBlockedError);
  });
});
