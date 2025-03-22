let productModel = require('../schemas/product');
let categoryModel = require('../schemas/category');

module.exports = {
    GetAllProducts: async function () {
        return await productModel.find().populate('category', 'name description');
    },

    GetProductById: async function (id) {
        let product = await productModel.findById(id).populate('category', 'name description');
        if (!product) throw new Error("Product k tồn tại!");
        return product;
    },

    CreateAProduct: async function (name, price, quantity, categoryId) {
        try {
            let category = await categoryModel.findById(categoryId);
            if (!category) {
                throw new Error("Category k tồn tại!");
            }
            let product = new productModel({
                name: name,
                price: price,
                quantity: quantity,
                category: categoryId
            });

            return await product.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    UpdateAProduct: async function (id, data) {
        try {
            let product = await productModel.findById(id);
            if (!product) {
                throw new Error("Product k tồn tại!");
            }

            let allowedFields = ["name", "price", "quantity", "category"];
            for (const key of Object.keys(data)) {
                if (allowedFields.includes(key)) {
                    product[key] = data[key];
                }
            }

            return await product.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    DeleteAProduct: async function (id) {
        try {
            let product = await productModel.findByIdAndDelete(id);
            if (!product) {
                throw new Error("Product k tồn tại!");
            }
            return { message: "Product đã đc xóa!" };
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
