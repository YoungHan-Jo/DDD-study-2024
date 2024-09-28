import { NoOrderError } from "@src/shared/error";
import { OrderRepository } from "../../order/repository/orderRepository.interface";
import { ShippingInfo } from "../../order/shippingInfo";
import { OrderId } from "../../order/value/orderId";
import { MemberRepository } from "@src/modules/member/domain/member/repository/memberRepository";

export class ChangeOrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly memberRepository: MemberRepository,
    ) { }

    changeShippingInfo = (id: OrderId, newShippingInfo: ShippingInfo, useNewShippingAddrAsMemberAddr: boolean) => {
        const order = this.orderRepository.findById(id);
        if (order === null) {
            throw new NoOrderError({ message: 'No order found' });
        }
        if (useNewShippingAddrAsMemberAddr) {
            //ID를 통해 참조하는 애그리거트를 구한다.
            const member = this.memberRepository.findById(order.getOrderer().getMemberId());
            member.changeAddress(newShippingInfo.getAddress());
        }
    }
}