import express from "express";
import { register, login } from "../controllers/user.controller.js";
import { check } from "express-validator";
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { getUserInfo } from "../controllers/user.controller.js";


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(new GoogleStrategy({
    
}, async(accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = new User({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                password: ' ',
                authProvider: profile.provider
            });
            await user.save();
        }
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        done(null, { user, token });
    } catch (error) {
        done(error, null);
    }
}));

const router = express.Router();

router.get('/user-info', getUserInfo);

router.post(
  "/register",
  [
    check("username").notEmpty().withMessage("Имя обязательно"),
    check("email").isEmail().withMessage("Неправильная почта"),
    check("password")
      .isLength({ min: 4, max: 12 })
      .withMessage("Пароль должен быть в пределах от 4 до 12 символов"),
  ],
  register
);

router.post("/login", login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    (req, res) => {
        const token = req.user.token;
        res.redirect(`http://localhost:3000?token=${token}`);
    }
);

export default router;
