const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const config = require('../config/database');
const code = "123456";

router.get('/dashboard', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    var filePath = (path.join(__dirname, '../src/admin/dashboard.html'))
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(filePath);
});

router.get('/dashboard/student', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    var filePath = (path.join(__dirname, '../src/admin/dashboard/studentSection.html'));
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(filePath);
});

router.get('/dashboard/student/search', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    var filePath = (path.join(__dirname, '../src/admin/student/searchStudent.html'));
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(filePath);
});

router.get('/dashboard/alumni', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    var filePath = (path.join(__dirname, '../src/admin/dashboard/alumniSection.html'));
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(filePath);
});

router.get('/dashboard/company', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    var filePath = (path.join(__dirname, '../src/admin/dashboard/companySection.html'));
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(filePath);
});

router.post('/register', (req, res) => {
    const passcode = req.body.passcode;
    let newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passcode: passcode
    });
    if (passcode === code) {
        Admin.addAdmin(newAdmin, (err, user) => {
            if (err) {
                let message = "";
                if (err.errors.email) message = "email is already taken. ";
                res.status(403)
                return res.json({
                    success: false,
                    message
                });

            } else {
                res.status(200)
                return res.json({
                    success: true,
                    message: "Admin registration is successful."
                });
            }
        });
    } else {
        res.status(400)
        return res.json({
            success: false,
            message: "Invalid Passcode"
        })
    }

});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Admin.getAdminByEmail(email, (err, admin) => {
        if (err) throw err;
        if (!admin) {
            res.status(400)
            return res.json({
                success: false,
                message: "Admin not found.",
            });
        }

        Admin.comparePassword(password, admin.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                    type: "admin",
                    data: {
                        _id: admin._id,
                        email: admin.email,
                        name: admin.name,
                        passcode: admin.passcode
                    }
                }, config.secret, {
                    expiresIn: 21600 // for 6 hrs time in seconds
                });
                res.status(200);
                return res.json({
                    success: true,
                    token: "JWT " + token
                });
            } else {
                res.status(400)
                return res.json({
                    success: false,
                    message: "Wrong Password."
                });
            }
        });
    });
});

module.exports = router;