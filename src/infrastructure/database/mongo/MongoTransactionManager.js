import mongoose from "mongoose";
import { TransactionManager }from "../../../domain/repositories/TransactionManager.js";

export class MongoTransactionManager
  extends TransactionManager {

  async execute(callback) {

    const session = await mongoose.startSession();

    try {

      let result;

      await session.withTransaction(
        async () => {
          result =
            await callback(session);
        }
      );

      return result;

    } finally {

      await session.endSession();

    }

  }

}