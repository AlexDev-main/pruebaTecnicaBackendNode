import env from "../../config/env.js";

// Repositories
import { MongoUserRepository }
    from "../database/mongo/repositories/MongoUserRepository.js";

import { MongoProductRepository }
    from "../database/mongo/repositories/MongoProductRepository.js";

import { MongoOrderRepository }
    from "../database/mongo/repositories/MongoOrderRepository.js";

// Security
import { BcryptPasswordHasher }
    from "../security/BcryptPasswordHasher.js";

import { JwtTokenService }
    from "../security/JwtTokenService.js";

// Transactions
import { MongoTransactionManager }
    from "../database/mongo/MongoTransactionManager.js";

// Use Cases
import { RegisterUserUseCase }
    from "../../application/use-cases/auth/RegisterUserUseCase.js";

import { LoginUserUseCase }
    from "../../application/use-cases/auth/LoginUserUseCase.js";

import { CreateProductUseCase }
    from "../../application/use-cases/product/CreateProductUseCase.js";

import { GetProductsUseCase }
    from "../../application/use-cases/product/GetProductsUseCase.js";

import { CreateOrderUseCase }
    from "../../application/use-cases/order/CreateOrderUseCase.js";

//Instancias de infraestructura
const userRepository =
    new MongoUserRepository();

const productRepository =
    new MongoProductRepository();

const orderRepository =
    new MongoOrderRepository();

const passwordHasher =
    new BcryptPasswordHasher();

const tokenService =
    new JwtTokenService(
        env.JWT_SECRET
    );

const transactionManager =
    new MongoTransactionManager();

//Instancias de casos de uso
const registerUserUseCase =
  new RegisterUserUseCase(
    userRepository,
    passwordHasher
  );

const loginUserUseCase =
  new LoginUserUseCase(
    userRepository,
    passwordHasher,
    tokenService
  );

const createProductUseCase =
  new CreateProductUseCase(
    productRepository
  );

const getProductsUseCase =
  new GetProductsUseCase(
    productRepository
  );

const createOrderUseCase =
  new CreateOrderUseCase(
    productRepository,
    orderRepository,
    transactionManager
  );

export const container = {
  tokenService,
  registerUserUseCase,
  loginUserUseCase,
  createProductUseCase,
  getProductsUseCase,
  createOrderUseCase,
};