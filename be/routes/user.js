var express = require('express');
var router = express.Router();
let loginController = require('../controllers/loginApi');

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('middle dayn wowk');
  console.log(res.locals.id);
  res.send('respond with a   resource');
});

module.exports = router;
