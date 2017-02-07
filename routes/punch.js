/**
 * Created by jim on 2017/2/7.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('punch.html');
});

module.exports = router;