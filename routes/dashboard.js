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
    renderHTML('./src/blank.html', res);
});


module.exports = router;