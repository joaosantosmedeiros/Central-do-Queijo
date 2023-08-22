import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailInUseException extends HttpException {
  constructor() {
    super('Email already in use', HttpStatus.BAD_REQUEST);
  }
}
