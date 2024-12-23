import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const secretKey = '1337';

export const register = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const user = new User({ name, password, email });
        await user.save();
        console.log('Пользователь сохранен:', user);
        res.status(201).send("Пользователь зарегистрирован");
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        res.status(500).send("Ошибка при регистрации");
    }
};

export const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).send(`Пользователь ${name} не найден`);
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send("Введен неверный пароль");
        }
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: "Вход выполнен успешно", token });
    } catch (error) {
        res.status(500).send("Ошибка при входе");
    }
};

export const getUserInfo = async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }
    try {
        const decoded = jwt.verify(token, '1337');
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Ошибка при проверке токена:', error);
        res.status(401).json({ error: 'Неверный токен' });
    }
};
