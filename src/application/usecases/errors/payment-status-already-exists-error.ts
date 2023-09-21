export class PaymentStatusAlreadyExistsError extends Error {
  constructor() {
    super('Payment Status already exists.');
  }
}
