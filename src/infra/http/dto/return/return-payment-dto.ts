export class ReturnPaymentDto {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  image: string;
  constructor(product: any) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.image = product.image;
  }
}
