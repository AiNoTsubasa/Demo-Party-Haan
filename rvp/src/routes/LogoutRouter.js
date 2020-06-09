const express = require('express');
const cookieParser = require('cookie-parser');

const router = express();
router.use(cookieParser());

router.get('/', function (req, res) {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;