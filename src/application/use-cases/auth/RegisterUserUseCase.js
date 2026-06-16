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
      throw new Error("User already exists");
    }

    const hashedPassword =
      await this.passwordHasher.hash(
        registerRequest.password
      );

    const user = new User({
      email: registerRequest.email,
      password: hashedPassword,
      role: "CUSTOMER"
    });

    await this.userRepository.save(user);

    return {
      message: "User registered successfully"
    };
  }

}