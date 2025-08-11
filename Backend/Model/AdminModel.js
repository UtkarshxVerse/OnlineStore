const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required : true
    },
    admin_type: {
        type: String,
        required: true,
        enum: [ 0 , 1 , 2] ,   // 0 --> 'superAdmin' 1 --> 'Admin'  2 --> 'subAdmin'
        default: 1
    }
}, {
    timestamps: true
});

const AdminModel = mongoose.model('Admin' , adminSchema);
module.exports = AdminModel;