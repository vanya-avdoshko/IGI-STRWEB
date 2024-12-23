import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },    
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier", // Ссылка на модель Supplier
        default: null,   // Для существующих записей будет null
    },
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
