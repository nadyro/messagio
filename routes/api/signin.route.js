var express = require('express');
var router = express.Router();
var SigninController = require('../../controllers/signin.controller');

router.put("/", SigninController.getUserByEmail);
module.exports = router;