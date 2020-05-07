const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index.html');
})

router.get('/test', (req, res) => {
    res.send('Page test woking');
})

module.exports = router;