import { StoreId } from '@src/shared/valueObject/storeId';
import { StoreRepository } from '../../repository/storeRepository';
import { ProductId } from '@src/modules/product/domain/value/productId';
import { randomUUID } from 'crypto';
import { ProductRepository } from '@src/modules/product/domain/repository/productRepository';

export class RegisterProductService {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly productRepository: ProductRepository,
  ) {}
  registerNewProduct(storeId: StoreId, newProductName: string) {
    const store = this.storeRepository.findById(storeId);
    const id = new ProductId(randomUUID());
    const product = store.createProduct(id, newProductName);
    this.productRepository.save(product);
    return id;
  }
}
