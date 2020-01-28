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

function renderNormalHTML(path, res) {
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
router.get('/', function (req, res, next) {
  const uid = req.query.accessId;
  //only admin@tnp.com has access to Admin Dashboard!!
  if (uid == '3btcfJeRxsa1HlFrpIXACWAJYrD2') {
    renderAdminHTML('./public/admin/dashboard.html', res);
  } else {
    renderNormalHTML('./public/user/dashboard.html', res);
  }
});

router.get('/student', function (req, res, next) {
  const uid = req.query.accessId;
  if (uid == '3btcfJeRxsa1HlFrpIXACWAJYrD2') {
    renderAdminHTML('./public/admin/dashboard/studentSection.html', res);
  } else {
    renderUnauthorizedAccess('./public/unauthorizedAccess.html', res);
  }
});

router.get('/alumni', function (req, res, next) {
  const uid = req.query.accessId;
  if (uid == '3btcfJeRxsa1HlFrpIXACWAJYrD2') {
    renderAdminHTML('./public/admin/dashboard/alumniSection.html', res);
  } else {
    renderUnauthorizedAccess('./public/unauthorizedAccess.html', res);
  }
});

router.get('/company', function (req, res, next) {
  const uid = req.query.accessId;
  if (uid == '3btcfJeRxsa1HlFrpIXACWAJYrD2') {
    renderAdminHTML('./public/admin/dashboard/companySection.html', res);
  } else {
    renderUnauthorizedAccess('./public/unauthorizedAccess.html', res);
  }
});


module.exports = router;
