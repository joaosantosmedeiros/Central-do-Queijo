import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordDontMatchException extends HttpException {
  constructor() {
    super("Passwords don't match", HttpStatus.BAD_REQUEST);
  }
}
