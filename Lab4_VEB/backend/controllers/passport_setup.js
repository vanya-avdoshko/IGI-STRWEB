// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const User = require('../models/user.js');
// const jwt = require('jsonwebtoken');

import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';


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
