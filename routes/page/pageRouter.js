const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index.html');
})

router.get('/test', (req, res) => {
    res.send('Page test woking');
})

router.get('/homepage', (req, res) => {
    res.render('homepage.html');
})

router.get('/developer', (req, res) => {
    res.render('developer.html');
})

router.get('/login', (req, res) => {
    res.render('login.html');
})

router.get('/signup', (req, res) => {
    res.render('signup.html');
})

module.exports = router;