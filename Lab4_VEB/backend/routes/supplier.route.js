import express from "express";
import Supplier from "../models/supplier.model.js";
import { getSuppliers, createSupplier } from "../controllers/supplier.controller.js";
const router = express.Router();

router.get("/", getSuppliers);
router.post("/", createSupplier);


export default router;