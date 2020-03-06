const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    menuItemTitle: {
        type: String,
        required: true
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    },
    subMenu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        default: null
    },
    position: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
