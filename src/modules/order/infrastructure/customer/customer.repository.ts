import { Injectable } from '@nestjs/common';
import { Customer } from '../../domain/customer/customer';
import { CustomerRepository } from '../../domain/customer/customerRepository.interface';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  findById(id: string) {
    return new Customer('customerName -' + id);
  }
}
