const express = require('express');
const ColorController = require('../Controller/ColorController');
const ColorRouter = express.Router();

ColorRouter.post("/create" ,ColorController.create)
ColorRouter.get("/:id?" , ColorController.getData)
ColorRouter.patch("/status/:id" , ColorController.status)
ColorRouter.delete("/delete/:id" , ColorController.delete)
ColorRouter.put("/update/:id" , ColorController.update)



module.exports = ColorRouter;