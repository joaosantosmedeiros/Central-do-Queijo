export class PasswordDontMatchError extends Error {
  constructor() {
    super("Passwords don't match.");
  }
}
