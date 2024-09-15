import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class EOrderState extends EnumType<EOrderState>() {
  static readonly PAYMENT_WAITING = new EOrderState('PAYMENT_WAITING');
  static readonly PREPARING = new EOrderState('PREPARING');
  static readonly SHIPPED = new EOrderState('SHIPPED');
  static readonly DELIVERING = new EOrderState('DELIVERING');
  static readonly DELIVERY_COMPLETED = new EOrderState('DELIVERY_COMPLETED');
  static readonly CANCELED = new EOrderState('CANCELED');

  private constructor(readonly _code: string) {
    super();
  }

  isNotYetShipped = (): boolean => {
    return this === EOrderState.PAYMENT_WAITING || this === EOrderState.PREPARING;
  }

  get code(): string {
    return this._code;
  }
}
