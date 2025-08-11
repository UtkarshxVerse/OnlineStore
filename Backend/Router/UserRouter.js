const express = require('express');
const UserController = require('../Controller/UserController');
const UserRouter = express.Router();

UserRouter.post("/register" , UserController.register)
UserRouter.post("/login" , UserController.login)

module.exports = UserRouter;