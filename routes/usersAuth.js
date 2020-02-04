const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/database');

router.get('/dashboard', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    var filePath = (path.join(__dirname, '../src/user/dashboard.html'))
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(filePath);
});


router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            let message = "";
            if (err.errors.email) message = "Email already exists.";
            return res.json({
                success: false,
                message
            });
        } else {
            return res.json({
                success: true,
                message: "User registration is successful."
            });
        }
    });
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                message: "User not found."
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                    type: "user",
                    data: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                    }
                }, config.secret, {
                    expiresIn: 604800 // for 1 week time in milliseconds
                });
                return res.json({
                    name: user.name,
                    email: user.email,
                    success: true,
                    token: "JWT " + token
                });
            } else {
                return res.json({
                    success: true,
                    message: "Wrong Password."
                });
            }
        });
    });
});

module.exports = router;