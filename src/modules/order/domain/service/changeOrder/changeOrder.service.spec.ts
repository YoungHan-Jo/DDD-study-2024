import { Member } from '@src/modules/member/domain/member/entity/member';
import { MemberRepository } from '@src/modules/member/domain/member/repository/memberRepository';
import { NoOrderError } from '@src/shared/error';
import { MemberId, OrderId } from '@src/shared/valueObject';
import { Address } from '../../order/address';
import { OrderRepository } from '../../order/repository/orderRepository.interface';
import { ChangeOrderService } from './changeOrder.service';

describe('changeOrderService', () => {
  const stubOrderRepo: OrderRepository = {
    findById: jest.fn(),
    findByNumber: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const stubMemberRepo: MemberRepository = {
    findById: jest.fn(),
  };

  it('If no order, throw NoOrderError', () => {
    // Given
    (stubOrderRepo.findById as jest.Mock).mockReturnValue(null);

    const changeOrderService = new ChangeOrderService(
      stubOrderRepo,
      stubMemberRepo,
    );
    // When & Then
    expect(() => {
      changeOrderService.changeShippingInfo(
        new OrderId('noOrderId'),
        null,
        true,
      );
    }).toThrow(NoOrderError);
  });

  it('success to change shippingInfo', () => {
    const member = new Member({
      password: 'password',
      address: new Address({
        address1: 'address1',
        address2: 'address2',
        zipCode: 'zipCode',
      }),
    });
    // Given
    (stubMemberRepo.findById as jest.Mock).mockReturnValue(member);
    const newAddress = new Address({
      address1: 'newAddress1',
      address2: 'newAddress2',
      zipCode: 'newZipCode',
    });

    // When
    const foundMember = stubMemberRepo.findById(new MemberId('memberId'));
    foundMember.changeAddress(newAddress);

    // Then
    expect(foundMember.getAddress()).toEqual(newAddress);
  });
});
