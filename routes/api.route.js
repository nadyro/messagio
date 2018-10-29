var express = require("express");
var router = express.Router();
var Messagio = require("./api/messagio.route");

router.use('/messagio', Messagio);

module.exports = router;