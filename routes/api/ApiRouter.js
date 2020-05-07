const router = require('express').Router();

router.get('/test', (req, res) => {
    res.send("API working");
})

module.exports = router;