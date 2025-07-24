const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 100,
            unique: true
        },
        slug: {
            type: String,
            maxLength: 100,
            unique: true
        },
        shortDescription: {
            type: String
        },
        longDescription: {
            type: String,
        },
        originalPrice: {
            type: Number,
            default: 100
        },
        discountPercentage: {
            type: Number,
            default: 2
        },
        finalPrice: {
            type: Number,
            min: 50
        } ,
        categoryId: {
            type: mongoose.Schema.ObjectId,     // category model se product ki category id le rhe h
            ref: "Category"         // category wale db coll 
        },
        colors: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Color"
            }
        ],
        thumbnail: {
            type: String,
            default: null
        },
        images: [
            {
                type: String,
            }
        ],
        stock: {
            type: Boolean,
            default: true
        },
        topSelling: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const ProductModel = mongoose.model('Products' , ProductSchema);

module.exports = ProductModel;