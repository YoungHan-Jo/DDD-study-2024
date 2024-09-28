export class Password {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  equals = (password: Password) => {
    return this.value === password.value;
  };
}
