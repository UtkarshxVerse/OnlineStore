const express = require('express');
const CategoryController = require('../Controller/CategoryController');
const CategoryRouter = express.Router();
const fileUpload = require('express-fileupload');

CategoryRouter.post("/create", fileUpload({createParentPath : true}) ,CategoryController.create)
CategoryRouter.get("/:id?" , CategoryController.getData)
CategoryRouter.patch("/status/:id" , CategoryController.status)
CategoryRouter.delete("/delete/:id" , CategoryController.delete)
CategoryRouter.put("/update/:id", fileUpload({createParentPath : true}) , CategoryController.update)



module.exports = CategoryRouter;