import Joi from "joi";

export const createOrderSchema =
  Joi.object({

    items: Joi.array()
      .items(

        Joi.object({

          productId: Joi.string()
            .required(),

          quantity: Joi.number()
            .integer()
            .positive()
            .required(),

        })

      )
      .min(1)
      .required(),

  });