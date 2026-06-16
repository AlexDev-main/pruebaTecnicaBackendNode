import { ROLES } from "../../../domain/constants/roles.js";
import { UserAlreadyExistsError } from "../../../domain/errors/UserAlreadyExistsError.js";
import { User } from "../../../domain/entities/User.js";

export class RegisterUserUseCase {

  constructor(
    userRepository,
    passwordHasher
  ) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute(registerRequest) {

    const existingUser =
      await this.userRepository.findByEmail(
        registerRequest.email
      );

    if (existingUser) {
        throw new UserAlreadyExistsError(
          registerRequest.email
        );
    }

    const hashedPassword =
      await this.passwordHasher.hash(
        registerRequest.password
      );

    const user = new User({
      email: registerRequest.email,
      password: hashedPassword,
      role: ROLES.CUSTOMER
    });

    await this.userRepository.save(user);

    return {
      message: "User registered successfully"
    };
  }

}