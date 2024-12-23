import express from "express";
import Product from "../models/product.model.js";
import { createProduct, getProducts, deleteProduct, updateProduct, getProductById } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);


export default router;