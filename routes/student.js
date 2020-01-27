var express = require('express');
var fs = require('fs');
var router = express.Router();

function renderAdminHTML(path, res) {
  fs.readFile(path, null, function (error, data) {
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  })
}

function renderUnauthorizedAccess(path, res) {
  fs.readFile(path, null, function (error, data) {
    res.writeHeader(401, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  })
}

/* GET users listing. */
router.get('/search', function (req, res, next) {
  const uid = req.query.accessId;
  //only admin@tnp.com has access to Admin Dashboard!!
  if (uid == '3btcfJeRxsa1HlFrpIXACWAJYrD2') {
    renderAdminHTML('./public/admin/student/searchStudent.html', res);
  } else {
    renderUnauthorizedAccess('./public/unauthorizedAccess.html', res);
  }
});

module.exports = router;
