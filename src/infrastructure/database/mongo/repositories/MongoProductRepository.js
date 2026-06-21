import { ProductModel } from "../schemas/ProductSchema.js";
import { Product } from "../../../../domain/entities/Product.js";
import { ProductRepository } from "../../../../domain/repositories/ProductRepository.js";

export class MongoProductRepository extends ProductRepository {

    async save(product) {

        const document = await ProductModel.create({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
        });

        return this.#toEntity(document);
    }

    async findAll(filters = {}) {

        const match = {};

        if (filters.name) {
            match.name = {
                $regex: filters.name,
                $options: "i"
            };
        }

        if (filters.minPrice || filters.maxPrice) {

            match.price = {};

            if (filters.minPrice) {
                match.price.$gte = Number(filters.minPrice);
            }

            if (filters.maxPrice) {
                match.price.$lte = Number(filters.maxPrice);
            }
        }

        const pipeline = [
            {
                $match: match
            }
        ];

        const documents = await ProductModel.aggregate(pipeline);

        return documents.map(
            document =>
                new Product({
                    id: document._id.toString(),
                    name: document.name,
                    description: document.description,
                    price: document.price,
                    stock: document.stock,
                })
        );
    }

    async findByIds(ids, session) {

        const query = ProductModel.find({
            _id: { $in: ids }
        });

        if (session) {
            query.session(session);
        }

        const documents = await query;

        return documents.map(
            document => this.#toEntity(document)
        );
    }

    async decreaseStockIfAvailable(
        productId,
        quantity,
        session
    ) {

        const result =
            await ProductModel.findOneAndUpdate(
                {
                    _id: productId,
                    stock: {
                        $gte: quantity
                    }
                },
                {
                    $inc: {
                        stock: -quantity
                    }
                },
                {
                    new: true,
                    session
                }
            );

        return result;
    }

    #toEntity(document) {

        return new Product({
            id: document._id.toString(),
            name: document.name,
            description: document.description,
            price: document.price,
            stock: document.stock,
        });

    }

}