const mongoose = require('mongoose');

const menuSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    prices:{
        type:Number,
        required:true,
    },
    taste:{
        type: String,
        enum:['sweet','spicy','sour'],
        required:true,
    },
    is_drink: {
        type: Boolean,
        default: false,
    }
})
const Menu = mongoose.model('Menu',menuSchema)
module.exports = Menu;