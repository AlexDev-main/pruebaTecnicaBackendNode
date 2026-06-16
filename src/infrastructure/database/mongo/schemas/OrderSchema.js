import mongoose from "mongoose";

const OrderItemSchema =
  new mongoose.Schema(
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      unitPrice: {
        type: Number,
        required: true,
      },
    },
    {
      _id: false,
    }
  );

const OrderSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      orderDate: {
        type: Date,
        required: true,
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      items: [OrderItemSchema],
    },
    {
      timestamps: true,
    }
  );

  export const OrderModel =
  mongoose.model("Order", OrderSchema);