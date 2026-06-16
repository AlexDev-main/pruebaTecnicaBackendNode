import { OrderModel } from "../schemas/OrderSchema.js";
import { Order } from "../../../../domain/entities/Order.js";
import { OrderRepository } from "../../../../domain/repositories/OrderRepository.js";

export class MongoOrderRepository  extends OrderRepository {

  async save(order, session) {

    const document =
      await OrderModel.create(
        [
          {
            userId: order.userId,
            orderDate: order.orderDate,
            totalAmount: order.totalAmount,
            items: order.items,
          }
        ],
        {
          session
        }
      );

    return new Order({
      id: document[0]._id.toString(),
      userId: document[0].userId,
      orderDate: document[0].orderDate,
      totalAmount: document[0].totalAmount,
      items: document[0].items,
    });

  }

}