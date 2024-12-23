import Product from "../models/product.model.js";
import Supplier from "../models/supplier.model.js";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("supplier", "name email phone address");
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ success: false, message: "Error fetching products" });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).populate("supplier", "name email phone address");
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error fetching product:", error.message);
        res.status(500).json({ success: false, message: "Error fetching product" });
    }
};


// export const createProduct = async (req, res) => {
//     const product = req.body;
//     if(!product.name || !product.price || !product.image || !product.category) {
//         return res.status(400).json({success: false, message: "All fields are required"});
//     }
//     const newProduct = new Product(product);
//     try {
//         await newProduct.save();
//         res.status(201).json({success: true, message: "Product created successfully", data: newProduct});
//     } catch (error) {
//         console.error("Error creating product:", error.message);
//         res.status(500).json({success: false, message: "Error creating product"});
//     }
// }

//const { body, validationResult } = require('express-validator');

export const createProduct = [
    // Валидация данных
    body('name')
        .notEmpty().withMessage('Название продукта обязательно')
        .isLength({ min: 3 }).withMessage('Название должно быть не менее 3 символов'),
    body('price')
        .notEmpty().withMessage('Цена обязательна')
        .isNumeric().withMessage('Цена должна быть числом')
        .custom((value) => value > 0).withMessage('Цена должна быть больше 0'),
    body('image')
        .notEmpty().withMessage('Изображение обязательно')
        .isURL().withMessage('Введите корректный URL для изображения'),
    body('category')
        .notEmpty().withMessage('Категория обязательна'),
    body('supplier')
        .notEmpty().withMessage('Поставщик обязателен')
        .isMongoId().withMessage('Некорректный ID поставщика')
        .custom(async (supplierId) => {
            const supplier = await Supplier.findById(supplierId);
            if (!supplier) {
                throw new Error('Поставщик не найден');
            }
        }),

    // Обработчик маршрута
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, price, image, category, supplier } = req.body;

        try {
            const newProduct = new Product({ name, price, image, category, supplier });
            await newProduct.save();
            res.status(201).json({ success: true, message: 'Продукт успешно создан', data: newProduct });
        } catch (error) {
            console.error('Ошибка при создании продукта:', error.message);
            res.status(500).json({ success: false, message: 'Ошибка при создании продукта' });
        }
    }
];


export const deleteProduct = async (req, res) => { 
    const {id} = req.params;
    console.log("id:", id);
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"});
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({success: false, message: "Error deleting product"});
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image, category, supplier } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    try {
        // Проверяем, существует ли поставщик
        if (supplier) {
            const existingSupplier = await Supplier.findById(supplier);
            if (!existingSupplier) {
                return res.status(404).json({ success: false, message: "Supplier not found" });
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, image, category, supplier },
            { new: true }
        ).populate("supplier", "name email phone address");

        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Error updating product" });
    }
};
