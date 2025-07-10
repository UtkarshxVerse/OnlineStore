const express = require('express');
const CategoryController = require('../Controller/CategoryController');
const CategoryRouter = express.Router();

CategoryRouter.post("/create" ,CategoryController.create)
CategoryRouter.get("/:id?" , CategoryController.getData)
CategoryRouter.patch("/status/:id" , CategoryController.status)
CategoryRouter.delete("/delete/:id" , CategoryController.delete)



module.exports = CategoryRouter;