var express = require('express');
var router = express.Router();
var UsersController = require('../../controllers/users.controller');

router.get("/", UsersController.getUsers);
router.post("/", UsersController.createUsers);
router.put("/", UsersController.updateUsers);

module.exports = router;