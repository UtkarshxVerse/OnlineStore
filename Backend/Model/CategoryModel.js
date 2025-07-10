const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    slug : {
        type: String,
        required: true,
        unique: true
    },
    status : {
        type : Boolean,
        default: null
    },
    // image : {
    //     type: String,
    //     required: true
    // }   
},
{
    timestamps: true   // Automatically manage createdAt and updatedAt timimgs of user in db
}
)

const categoryModel = mongoose.model("Category" , CategorySchema);

module.exports = categoryModel;