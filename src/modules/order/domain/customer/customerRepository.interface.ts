import { Customer } from './customer';

export interface CustomerRepository {
  findById(id: string): Customer;
}
