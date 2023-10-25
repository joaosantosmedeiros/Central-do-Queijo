import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryInUseException extends HttpException {
  constructor() {
    super('This category is in use.', HttpStatus.BAD_REQUEST);
  }
}
