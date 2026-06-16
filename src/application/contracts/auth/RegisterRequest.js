export class RegisterRequest {
  constructor({
    email,
    password,
  }) {
    this.email = email;
    this.password = password;
  }
}