import Supplier from "../models/supplier.model.js";

export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json({success: true, data: suppliers});
    } catch (error) {
        console.log("Error fetching suppliers:", error.message);
        res.status(500).json({success: false, message: "Error fetching suppliers"});
    }
}

export const createSupplier = async (req, res) => {
    const supplier = req.body;
    if(!supplier.name || !supplier.email || !supplier.phone || !supplier.address) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    const newSupplier = new Supplier(supplier);
    try {
        await newSupplier.save();
        res.status(201).json({success: true, message: "Supplier created successfully", data: newSupplier});
    } catch (error) {
        console.error("Error creating supplier:", error.message);
        res.status(500).json({success: false, message: "Error creating supplier"});
    }
}