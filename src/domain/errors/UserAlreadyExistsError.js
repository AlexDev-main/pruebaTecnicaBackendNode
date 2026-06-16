export class UserAlreadyExistsError extends Error {
  constructor(email) {
    super(`User with email ${email} already exists`);

    this.name = "UserAlreadyExistsError";
  }
}