import { Order } from "../../../domain/entities/Order.js";
import { OrderItem } from "../../../domain/entities/OrderItem.js";
import { ProductNotFoundError } from "../../../domain/errors/ProductNotFoundError.js";
import { InsufficientStockError } from "../../../domain/errors/InsufficientStockError.js";

export class CreateOrderUseCase {

  constructor(
    productRepository,
    orderRepository,
    transactionManager
  ) {
    this.productRepository = productRepository;
    this.orderRepository = orderRepository;
    this.transactionManager = transactionManager;
  }

  async execute(
    createOrderRequest,
    userId
  ) {

    return this.transactionManager.execute(
      async (session) => {

        const productIds = createOrderRequest.items.map(
          item => item.productId
        );

        const products = await this.productRepository.findByIds(
          productIds
        );

        let totalAmount = 0;

        const orderItems = [];

        for (const requestItem of createOrderRequest.items) {

          const product = products.find(
            p => p.id === requestItem.productId
          );

          if (!product) {
            throw new ProductNotFoundError(
              requestItem.productId
            );
          }

          if (product.stock < requestItem.quantity) {
            throw new InsufficientStockError(
              product.id
            );
          }

          totalAmount += product.price * requestItem.quantity;

          orderItems.push(
            new OrderItem({
              productId: product.id,
              quantity: requestItem.quantity,
              unitPrice: product.price,
            })
          );

          await this.productRepository
            .decreaseStock(
              product.id,
              requestItem.quantity,
              session
            );
        }

        const order = new Order({
          userId,
          orderDate: new Date(),
          totalAmount,
          items: orderItems,
        });

        await this.orderRepository.save(
          order,
          session
        );

        return order;
      }
    );

  }

}