const express = require('express');
const AdminController = require('../Controller/AdminController');
const AdminRouter = express.Router();

AdminRouter.post("/login" , AdminController.login)

module.exports = AdminRouter;