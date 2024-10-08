import { NoCustomerError } from '@src/shared/error';
import { CalculateDiscountService } from './calculateDiscount.service';
import { RuleDiscounter } from './ruleDiscounter.interface';
import { CustomerRepository } from '../../customer/customerRepository.interface';

describe('calculateDiscountService', () => {
  const stubRepo: CustomerRepository = { findById: jest.fn() };

  const stubRule: RuleDiscounter = {
    applyRules: () => {
      return null;
    },
  };

  it('If no customer, throw NoCustomerError', () => {
    // Given
    (stubRepo.findById as jest.Mock).mockReturnValue(null);

    const calDisSvc = new CalculateDiscountService(stubRepo, stubRule);

    // When & Then
    expect(() => {
      calDisSvc.calculateDiscount([], 'noCustomerId');
    }).toThrow(NoCustomerError);
  });
});
