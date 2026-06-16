import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN } from "../../domain/constants/jwt.js";

export class JwtTokenService {

  constructor(secret) {
    this.secret = secret;
  }

  generate(payload) {

    return jwt.sign(
      payload,
      this.secret,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

  }

}