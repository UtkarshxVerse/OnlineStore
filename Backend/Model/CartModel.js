const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required: true
        },
        product_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'product',
            required: true
        },
        qty: {
            type: Number,
            default: 1,
            min: 1,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;