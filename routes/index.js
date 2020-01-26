var express = require('express');
var fs = require('fs');
var router = express.Router();

function renderHTML(path, res) {
  fs.readFile(path, null, function (error, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  })
}

/* GET home page. */
router.get('/', function (req, res, next) {
  renderHTML('./public/index.html', res);
});

router.get('/login', function (req, res, next) {
  renderHTML('./public/login.html', res);
});

router.get('/signup', function (req, res, next) {
  renderHTML('./public/signup.html', res);
});

module.exports = router;
