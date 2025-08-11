require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CategoryRouter = require('./Router/CategoryRouter');
const ColorRouter = require('./Router/ColorRouter');
const ProductRouter = require('./Router/ProductRouter');
const AdminRouter = require('./Router/AdminRouter');
const UserRouter = require('./Router/UserRouter');
const CartRouter = require('./Router/CartRouter');
const server = express();

server.use(cors());
server.use(express.json());
server.use("/category" , CategoryRouter);
server.use("/color" , ColorRouter);
server.use("/product", ProductRouter);
server.use("/admin" , AdminRouter);
server.use("/user", UserRouter);
server.use("/cart", CartRouter);
server.use(express.static("./Public"));         //server ka access de rhe h iss folder ko to open and view img of this folder

mongoose.connect(process.env.MONGODB, { dbname: "iShopz" }).then(
    () => {
        server.listen(5000, () => {
            console.log('Server is running on port 5000');
        })
        console.log("Connected to MongoDB :)");
    }
).catch(
    (err) => {
        console.log("Error connecting to MongoDB:", err);
    }
);

