import { UserModel } from "../schemas/UserSchema.js";
import { User } from "../../../../domain/entities/User.js";
import { UserRepository } from "../../../../domain/repositories/UserRepository.js";

export class MongoUserRepository extends UserRepository {

  async findByEmail(email) {

    const document = await UserModel.findOne({ email });

    if (!document) {
      return null;
    }

    return new User({
      id: document._id.toString(),
      email: document.email,
      password: document.password,
      role: document.role,
    });
  }

  async save(user) {

    const document = await UserModel.create({
        email: user.email,
        password: user.password,
        role: user.role,
      });

    return new User({
      id: document._id.toString(),
      email: document.email,
      password: document.password,
      role: document.role,
    });
  }

}