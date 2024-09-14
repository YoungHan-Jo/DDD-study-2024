import { IllegalArgumentError, IllegalStateError } from '@src/shared/error';
import { Money } from '@src/shared/valueObject';
import { Order } from './order';
import { OrderLine } from './orderLine';
import { Product } from './product';
import { ShippingInfo } from './shippingInfo';
import { EOrderState } from './orderState';

describe('Order', () => {
    const product = new Product({ name: 'sample product A' });
    const priceA = 1000;
    const quantityA = 2;
    const priceB = 2000;
    const quantityB = 3;

    const receiverName = 'nameA';
    const receiverPhoneNumber = '07011112222';
    const shippingAddress1 = 'address A1';
    const shippingAddress2 = 'address A2';
    const shippingZipCode = '123-1234';

    const orderLineA = generateOrderLine(product, priceA, quantityA);
    const orderLineB = generateOrderLine(product, priceB, quantityB);
    const shippingInfo = generateShippingInfo({
        receiverName,
        receiverPhoneNumber,
        shippingAddress1,
        shippingAddress2,
        shippingZipCode,
    });

    it('new Order', () => {
        // Given

        // When
        const order = new Order({
            orderLines: [orderLineA, orderLineB],
            shippingInfo,
            state: EOrderState.PAYMENT_WAITING
        });

        // Then
        expect(order.getTotalAmounts()).toEqual(
            new Money(priceA * quantityA + priceB * quantityB),
        );
    });

    it('if no orderLines, throw illegalArgumentError', () => {
        // Given

        // When & Then
        expect(() => {
            new Order({ orderLines: [], shippingInfo, state: EOrderState.PAYMENT_WAITING });
        }).toThrow(IllegalArgumentError);
    });

    it('if no shippingInfo, throw illegalArgumentError', () => {
        // Given

        // When & Then
        expect(() => {
            new Order({ orderLines: [orderLineA], shippingInfo: null, state: EOrderState.PAYMENT_WAITING });
        }).toThrow(IllegalArgumentError);
    });

    it('if state is PAYMENT_WAITING, can change shippingInfo', () => {
        // Given
        const state = EOrderState.PAYMENT_WAITING;

        const newShippingInfo = generateShippingInfo({
            receiverName: 'nameB',
            receiverPhoneNumber: '07033334444',
            shippingAddress1: 'address B1',
            shippingAddress2: 'address B2',
            shippingZipCode: '567-5678',
        });

        const order = new Order({
            orderLines: [orderLineA, orderLineB],
            shippingInfo,
            state,
        });

        // When
        order.changeShippingInfo(newShippingInfo);

        // Then
        expect(order.getShippingInfo()).toEqual(newShippingInfo);



    })

    it('If state is PREPARING, can change shippingInfo', () => {
        // Given
        const state = EOrderState.PREPARING

        const newShippingInfo = generateShippingInfo({
            receiverName: 'nameB',
            receiverPhoneNumber: '07033334444',
            shippingAddress1: 'address B1',
            shippingAddress2: 'address B2',
            shippingZipCode: '567-5678',
        });

        const order = new Order({
            orderLines: [orderLineA, orderLineB],
            shippingInfo,
            state,
        });

        // When
        order.changeShippingInfo(newShippingInfo);

        // Then
        expect(order.getShippingInfo()).toEqual(newShippingInfo);
    })

    it('If state is SHIPPED, throw IllegalStateError', () => {
        // Given
        const state = EOrderState.SHIPPED;

        const newShippingInfo = generateShippingInfo({
            receiverName: 'nameB',
            receiverPhoneNumber: '07033334444',
            shippingAddress1: 'address B1',
            shippingAddress2: 'address B2',
            shippingZipCode: '567-5678',
        });

        const order = new Order({
            orderLines: [orderLineA, orderLineB],
            shippingInfo,
            state,
        });

        // When & Then
        expect(() => {
            order.changeShippingInfo(newShippingInfo);
        }).toThrow(IllegalStateError);
    })
    it('If state is DELIVERING, throw IllegalStateError', () => {
        // Given
        const state = EOrderState.DELIVERING;

        const newShippingInfo = generateShippingInfo({
            receiverName: 'nameB',
            receiverPhoneNumber: '07033334444',
            shippingAddress1: 'address B1',
            shippingAddress2: 'address B2',
            shippingZipCode: '567-5678',
        });

        const order = new Order({
            orderLines: [orderLineA, orderLineB],
            shippingInfo,
            state,
        });

        // When & Then
        expect(() => {
            order.changeShippingInfo(newShippingInfo);
        }).toThrow(IllegalStateError);
    })
    it('If state is DELIVERY_COMPLETED, throw IllegalStateError', () => {
        // Given
        const state = EOrderState.DELIVERY_COMPLETED;

        const newShippingInfo = generateShippingInfo({
            receiverName: 'nameB',
            receiverPhoneNumber: '07033334444',
            shippingAddress1: 'address B1',
            shippingAddress2: 'address B2',
            shippingZipCode: '567-5678',
        });

        const order = new Order({
            orderLines: [orderLineA, orderLineB],
            shippingInfo,
            state,
        });

        // When & Then
        expect(() => {
            order.changeShippingInfo(newShippingInfo);
        }).toThrow(IllegalStateError);
    })
    it('If state is CANCELED, throw IllegalStateError', () => {
        // Given
        const state = EOrderState.CANCELED;

        const newShippingInfo = generateShippingInfo({
            receiverName: 'nameB',
            receiverPhoneNumber: '07033334444',
            shippingAddress1: 'address B1',
            shippingAddress2: 'address B2',
            shippingZipCode: '567-5678',
        });

        const order = new Order({
            orderLines: [orderLineA, orderLineB],
            shippingInfo,
            state,
        });

        // When & Then
        expect(() => {
            order.changeShippingInfo(newShippingInfo);
        }).toThrow(IllegalStateError);
    })

});

function generateShippingInfo({
    receiverName,
    receiverPhoneNumber,
    shippingAddress1,
    shippingAddress2,
    shippingZipCode,
}: {
    receiverName: string;
    receiverPhoneNumber: string;
    shippingAddress1: string;
    shippingAddress2: string;
    shippingZipCode: string;
}) {
    return new ShippingInfo({
        receiverName,
        receiverPhoneNumber,
        shippingAddress1,
        shippingAddress2,
        shippingZipCode,
    });
}

function generateOrderLine(
    product: Product,
    priceA: number,
    quantityA: number,
) {
    return new OrderLine({
        product: product,
        price: priceA,
        quantity: quantityA,
    });
}
