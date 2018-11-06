var express = require("express");
var router = express.Router();
var Messagio = require("./api/messagio.route");
var Users = require("./api/users.route");

router.use('/messagio', Messagio);
router.use('/users', Users);
module.exports = router;