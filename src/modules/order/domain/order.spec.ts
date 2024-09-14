import { IllegalArgumentError } from '@src/shared/error';
import { Money } from '@src/shared/valueObject';
import { Order } from './order';
import { OrderLine } from './orderLine';
import { Product } from './product';

describe('Order', () => {
    const product = new Product({ name: 'sample product A' });

    it('new Order', () => {
        const priceA = 1000;
        const quantityA = 2;
        const priceB = 2000;
        const quantityB = 3;

        // Given
        const orderLineA = generateOrderLine(product, priceA, quantityA);
        const orderLineB = generateOrderLine(product, priceB, quantityB);

        // When
        const order = new Order({ orderLines: [orderLineA, orderLineB] });

        // Then
        expect(order.getTotalAmounts()).toEqual(
            new Money(priceA * quantityA + priceB * quantityB),
        );
    });

    it('throw illegalArgumentError', () => {
        expect(() => {
            new Order({ orderLines: [] })
        }).toThrow(IllegalArgumentError)
    })
});

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
