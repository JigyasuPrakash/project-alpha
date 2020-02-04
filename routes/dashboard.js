const express = require('express');
const router = express.Router();
const fs = require('fs');

function renderHTML(path, res) {
    fs.readFile(path, null, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    })
}

router.get('/', (req, res) => {
    renderHTML('./src/blank/blank1.html', res);
});

router.get('/student', (req, res) => {
    renderHTML('./src/blank/blank2.html', res);
});
router.get('/student/search', (req, res) => {
    renderHTML('./src/blank/blank3.html', res);
});
router.get('/student/result', (req, res) => {
    renderHTML('./src/blank/blank3.html', res);
});
router.get('/alumni', (req, res) => {
    renderHTML('./src/blank/blank2.html', res);
});
router.get('/company', (req, res) => {
    renderHTML('./src/blank/blank2.html', res);
});

module.exports = router;