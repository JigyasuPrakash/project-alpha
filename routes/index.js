var express = require('express');
var fs = require('fs');
var router = express.Router();

function renderHTML(path, res) {
    fs.readFile(path, null, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    })
}

router.get('/', (req, res) => {
    renderHTML('./src/index.html', res);
});

router.get('/login', (req, res) => {
    renderHTML('./src/login.html', res);
})

router.get('/signup', (req, res) => {
    renderHTML('./src/signup.html', res);
})

module.exports = router;