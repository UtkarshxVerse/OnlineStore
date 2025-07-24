const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        slug: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim:  true
        },
        hexcode: {
            type: String,
            required: true
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

const ColorModel = mongoose.model('Color' , ColorSchema);

module.exports = ColorModel;

