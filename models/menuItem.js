const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    itemTitle: {
        type: String,
        required: true
    },
    id: {
        type: mongoose.ObjectId,
        unique: true
    },
    menuId: {
        type: mongoose.ObjectId,
        ref: 'MenuModel'
    },
    itemIndex: {
        type: Number
    }
});

module.exports = {
    menuItemSchema: menuItemSchema,
    menuItemModel: mongoose.model('MenuItemModel', menuItemSchema)
};
