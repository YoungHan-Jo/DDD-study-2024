import { IllegalArgumentError } from '@src/shared/error';
import { Money } from '@src/shared/valueObject';
import { Order } from './order';
import { OrderLine } from './orderLine';
import { Product } from './product';
import { ShippingInfo } from './shippingInfo';

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

    it('new Order', () => {
        // Given
        const orderLineA = generateOrderLine(product, priceA, quantityA);
        const orderLineB = generateOrderLine(product, priceB, quantityB);

        const shippingInfo = generateShippingInfo({
            receiverName,
            receiverPhoneNumber,
            shippingAddress1,
            shippingAddress2,
            shippingZipCode,
        });

        // When
        const order = new Order({
            orderLines: [orderLineA, orderLineB],
            shippingInfo,
        });

        // Then
        expect(order.getTotalAmounts()).toEqual(
            new Money(priceA * quantityA + priceB * quantityB),
        );
    });

    it('if no orderLines, throw illegalArgumentError', () => {
        // Given
        const shippingInfo = generateShippingInfo({
            receiverName,
            receiverPhoneNumber,
            shippingAddress1,
            shippingAddress2,
            shippingZipCode,
        });

        // When & Then
        expect(() => {
            new Order({ orderLines: [], shippingInfo });
        }).toThrow(IllegalArgumentError);
    });

    it('if no shippingInfo, throw illegalArgumentError', () => {
        // Given
        const orderLineA = generateOrderLine(product, priceA, quantityA);

        // When & Then
        expect(() => {
            new Order({ orderLines: [orderLineA], shippingInfo: null });
        }).toThrow(IllegalArgumentError);
    });
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
