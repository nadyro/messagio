var express = require("express");
var router = express.Router();
var Messagio = require("./api/messagio.route");
var Users = require("./api/users.route");
var Signin = require("./api/signin.route");

router.use('/messagio', Messagio);
router.use('/users', Users);
router.use('/signin', Signin);
module.exports = router;