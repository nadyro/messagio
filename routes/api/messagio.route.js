var express = require("express");

var router = express.Router();
var MessagioController = require("../../controllers/messagio.controller");

router.get("/", MessagioController.getMessagio);
router.post("/", MessagioController.createMessagio);
router.put("/", MessagioController.updateMessagio);
router.delete("/", MessagioController.deleteMessagio);

module.exports = router;