const express = require('express');
const CartController = require('../Controller/CartController');
const CartRouter = express.Router();

CartRouter.post("/move-to-db" , CartController.moveToDb)

module.exports = CartRouter;