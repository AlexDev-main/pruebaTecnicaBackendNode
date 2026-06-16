import { InvalidCredentialsError }
  from "../../../domain/errors/InvalidCredentialsError.js";

export class LoginUserUseCase {

  constructor(
    userRepository,
    passwordHasher,
    tokenService
  ) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
  }

  async execute(loginRequest) {

    const user =
      await this.userRepository.findByEmail(
        loginRequest.email
      );

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const validPassword =
      await this.passwordHasher.compare(
        loginRequest.password,
        user.password
      );

    if (!validPassword) {
      throw new InvalidCredentialsError();
    }

    const token =
      this.tokenService.generate({
        userId: user.id,
        role: user.role
      });

    return {
      token
    };
  }

}