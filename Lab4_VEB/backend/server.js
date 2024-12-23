import express from "express";  
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";
import vacancyRoutes from "./routes/vacancy.route.js";
import supplierRoutes from "./routes/supplier.route.js";
import cors from "cors";  // Импортируем cors
import authRoutes from "./routes/user.route.js";
import authenticateToken from "./middleware/authMiddleware.js";
import bodyParser from "body-parser";

// const session = require('express-session');
// const passport = require('passport');
// const flash = require('connect-flash');


const app = express();

dotenv.config();

// Настройка CORS
app.use(cors());  // Разрешаем все источники для всех маршрутов

// app.use(session({ secret: 'key', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
app.use(express.json());
// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Если нужно разрешить только конкретные источники (например, только с фронтенда на localhost:3000):
// app.use(cors({
//   origin: 'http://localhost:3000',
// }));


//app.use("/auth", authRoutes);

//const authenticateToken = require('./middleware/authMiddleware');



app.use("/api/products", productRoutes);
app.use("/api/vacancies", vacancyRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/auth", authRoutes);

app.get('/api/check-token', authenticateToken, (req, res) => {
    res.sendStatus(200);
});

app.listen(5000, () => {
    connectDB();
    console.log("Server is running at http://localhost:5000");
});
