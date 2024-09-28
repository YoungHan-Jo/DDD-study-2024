import { Product } from '../entity/product';

export interface ProductRepository {
  save(product: Product): void;
}
