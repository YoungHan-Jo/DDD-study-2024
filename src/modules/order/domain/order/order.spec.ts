import { IllegalArgumentError, IllegalStateError } from '@src/shared/error';
import { Money, OrderId } from '@src/shared/valueObject';
import { OrderLine } from './value/orderLine';
import { Product } from '../../../product/domain/entity/product';
import { ShippingInfo } from './shippingInfo';
import { EOrderState } from './orderState.enum';
import { Receiver } from './receiver';
import { Address } from './address';
import { Order } from './entity/order';
import { StoreId } from '@src/shared/valueObject/storeId';
import { ProductId } from '@src/modules/product/domain/value/productId';
import { randomUUID } from 'crypto';

describe('Order', () => {
  const orderId = new OrderId('1234');
  const product = new Product({
    id: new ProductId(randomUUID()),
    storeId: new StoreId('storeId'),
    name: 'sample product A',
  });
  const priceA = new Money(1000);
  const quantityA = 2;
  const priceB = new Money(2000);
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
      orderId: orderId,
      orderLines: [orderLineA, orderLineB],
      shippingInfo,
      state: EOrderState.PREPARING,
    });

    // Then
    expect(
      order
        .getTotalAmounts()
        .equals(priceA.multiply(quantityA).plus(priceB.multiply(quantityB))),
    ).toEqual(true);
    expect(order.getState()).toEqual(EOrderState.PREPARING);
  });

  it('If state is optional, state would be PAYMENT_WAITING', () => {
    // Given & When
    const order = new Order({
      orderId: orderId,
      orderLines: [orderLineA, orderLineB],
      shippingInfo,
    });
    // Then
    expect(order.getState()).toEqual(EOrderState.PAYMENT_WAITING);
  });

  it('if no orderLines, throw illegalArgumentError', () => {
    // Given

    // When & Then
    expect(() => {
      new Order({
        orderId: orderId,
        orderLines: [],
        shippingInfo,
        state: EOrderState.PAYMENT_WAITING,
      });
    }).toThrow(IllegalArgumentError);
  });

  it('if no shippingInfo, throw illegalArgumentError', () => {
    // Given

    // When & Then
    expect(() => {
      new Order({
        orderId: orderId,
        orderLines: [orderLineA],
        shippingInfo: null,
        state: EOrderState.PAYMENT_WAITING,
      });
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
      orderId: orderId,
      orderLines: [orderLineA, orderLineB],
      shippingInfo,
      state,
    });

    // When
    order.changeShippingInfo(newShippingInfo);

    // Then
    expect(order.getShippingInfo()).toEqual(newShippingInfo);
  });

  it('If state is PREPARING, can change shippingInfo', () => {
    // Given
    const state = EOrderState.PREPARING;

    const newShippingInfo = generateShippingInfo({
      receiverName: 'nameB',
      receiverPhoneNumber: '07033334444',
      shippingAddress1: 'address B1',
      shippingAddress2: 'address B2',
      shippingZipCode: '567-5678',
    });

    const order = new Order({
      orderId: orderId,
      orderLines: [orderLineA, orderLineB],
      shippingInfo,
      state,
    });

    // When
    order.changeShippingInfo(newShippingInfo);

    // Then
    expect(order.getShippingInfo()).toEqual(newShippingInfo);
  });

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
      orderId: orderId,
      orderLines: [orderLineA, orderLineB],
      shippingInfo,
      state,
    });

    // When & Then
    expect(() => {
      order.changeShippingInfo(newShippingInfo);
    }).toThrow(IllegalStateError);
  });
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
      orderId: orderId,
      orderLines: [orderLineA, orderLineB],
      shippingInfo,
      state,
    });

    // When & Then
    expect(() => {
      order.changeShippingInfo(newShippingInfo);
    }).toThrow(IllegalStateError);
  });
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
      orderId: orderId,
      orderLines: [orderLineA, orderLineB],
      shippingInfo,
      state,
    });

    // When & Then
    expect(() => {
      order.changeShippingInfo(newShippingInfo);
    }).toThrow(IllegalStateError);
  });
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
      orderId: orderId,
      orderLines: [orderLineA, orderLineB],
      shippingInfo,
      state,
    });

    // When & Then
    expect(() => {
      order.changeShippingInfo(newShippingInfo);
    }).toThrow(IllegalStateError);
  });

  it('change orderLines', () => {
    // Given
    const newOrderLineA = generateOrderLine(product, priceA, 3);

    // When
    const order = new Order({
      orderId: orderId,
      orderLines: [orderLineA, orderLineB],
      shippingInfo,
    });
    order.changeOrderLines([newOrderLineA]);

    // Then
    expect(
      order.getTotalAmounts().equals(newOrderLineA.getAmounts()),
    ).toBeTruthy();
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
  const receiver = new Receiver({
    name: receiverName,
    phoneNumber: receiverPhoneNumber,
  });
  const address = new Address({
    address1: shippingAddress1,
    address2: shippingAddress2,
    zipCode: shippingZipCode,
  });

  return new ShippingInfo({
    receiver,
    address,
  });
}

function generateOrderLine(product: Product, priceA: Money, quantityA: number) {
  return new OrderLine({
    product: product,
    price: priceA,
    quantity: quantityA,
  });
}
