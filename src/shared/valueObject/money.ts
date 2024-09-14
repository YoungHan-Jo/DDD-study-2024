export class Money {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  getValue = () => {
    return this.value;
  };

  plus = (money: Money) => {
    return new Money(this.value + money.getValue());
  };

  minus = (money: Money) => {
    return new Money(this.value - money.getValue());
  };

  multiply = (multiplier: number) => {
    return new Money(this.value * multiplier);
  };

  isGreaterThanOrEqual = (money: Money) => {
    return this.value >= money.getValue();
  };

  isLessThanOrEqual = (money: Money) => {
    return this.value <= money.getValue();
  };

  isGreaterThan = (money: Money) => {
    return this.value > money.getValue();
  };

  isLessThan = (money: Money) => {
    return this.value < money.getValue();
  };

  equals = (money: Money) => {
    return this.value === money.getValue();
  };
}
