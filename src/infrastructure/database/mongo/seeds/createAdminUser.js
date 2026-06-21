import { env } from "../../../../infrastructure/config/env.js";
import { UserModel } from "../schemas/UserSchema.js";
import { ROLES } from "../../../../domain/constants/roles.js";
import { BcryptPasswordHasher } from "../../../security/BcryptPasswordHasher.js";

export async function createAdminUser() {

  const adminExists = await UserModel.findOne({
      email: env.adminEmail,
    });

  if (adminExists) {
    console.log("Admin user already exists");
    return;
  }

  const passwordHasher = new BcryptPasswordHasher();
  const hashedPassword = await passwordHasher.hash(env.adminPassword);

  await UserModel.create({
    email: env.adminEmail,
    password: hashedPassword,
    role: ROLES.ADMIN,
  });

  console.log("Admin user created");

}