const express = require('express');
const router = express.Router();
const cors = require('cors');
const config = require('../config/database');
const passport = require('passport');

// this endpoint would be accessed by /api/admin/fetch/data/{pathname}
// and requires JSON WEB TOKENS for authentication..
/*
router.get('/{pathname}', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    //create logic here
    //use req.query.{key} to get data from request


    //send response
    res.setHeader('Content-Type', 'text/html');
    res.sendJSON();
});
*/
router.get('/searchStudent', (req, res) => {
    //handle requset


    //send response
    res.setHeader('Content-Type', 'text/html');
    res.json({
        messsage: 'Nice'
    })
});

module.exports = router;