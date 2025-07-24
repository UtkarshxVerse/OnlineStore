const express = require('express');
const ProductController = require('../Controller/ProductController');
const ProductRouter = express.Router();
const fileUpload = require('express-fileupload');

ProductRouter.post("/create" , fileUpload({createParentPath : true}), ProductController.create);
ProductRouter.get("/:id?" , ProductController.getData)
ProductRouter.patch("/status/:id" , ProductController.status)
ProductRouter.delete("/delete/:id" , ProductController.delete)
ProductRouter.put("/update/:id", fileUpload({createParentPath : true}) , ProductController.update)
ProductRouter.patch("/multiple-images/:id" , fileUpload({createParentPath : true}), ProductController.multiple);


module.exports = ProductRouter;