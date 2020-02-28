const mongoose = require('mongoose');

const MenuItem = require('./menuItem.js');

const menuSchema = new mongoose.Schema({
    menuTitle: {
        type: String,
        required: true,
    },
    children: [
        MenuItem.menuItemSchema
    ],
    id: {
        type: mongoose.ObjectId,
        unique: true
    },
    menuIndex: {
        type: Number
    }
});

module.exports = mongoose.model('MenuModel', menuSchema);
