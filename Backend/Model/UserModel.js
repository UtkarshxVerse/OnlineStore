const mongoose = require('mongoose');

const ShippingAddressSchema = new mongoose.Schema(
    {
        addressLine1: {type: String, required: true},
        addressLine2: {type: String, required: false},
        city: {type: String, required: true},
        contact: {type: String, required: true},
        state: {type: String, required: true}, 
        pinCode: {type: String, required: true},
        country: {type: String, required: true}
    },
    {
        _id: false, // Disable automatic _id field for subdocuments
    }
);

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: [true, "Email is required "],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"]
        },
        shipping_address: {
            type: [ShippingAddressSchema],
            default: []
        }
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;