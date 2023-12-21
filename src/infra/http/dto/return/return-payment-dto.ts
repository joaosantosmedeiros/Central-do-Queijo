export class ReturnPaymentDto {
  id: string;
  code: string;
  paymentDate?: Date;
  status: string;
  price: number;
  finalPrice: number;
  discount: number;
  constructor(payment: any) {
    this.id = payment.id;
    this.code = payment.code;
    this.paymentDate = payment.paymentDate;
    this.status = payment.status;
    this.price = payment.price;
    this.finalPrice = payment.finalPrice;
    this.discount = payment.discount;
  }
}
