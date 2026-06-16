import bcrypt from "bcrypt";
import { PasswordHasher } from "../../domain/services/PasswordHasher";

export class BcryptPasswordHasher extends PasswordHasher {

  async hash(password) {
    return bcrypt.hash(password, 10);
  }

  async compare(password, hash) {
    return bcrypt.compare(password, hash);
  }

}