import { StoreId } from '@src/shared/valueObject/storeId';
import { Store } from '../entity/store';

export interface StoreRepository {
  findById(id: StoreId): Store;
}
