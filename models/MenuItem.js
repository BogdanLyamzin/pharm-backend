const { Schema, model } = require('mongoose');

const { name, integerPosition } = require('../configs/validationRules');
const createValidate = require('../utils/createValidate');

const { integerPositionValid, nameValid } = createValidate(integerPosition, name);

const menuItemSchema = new Schema({
    menuItemTitle: {
        type: String,
        trim: true,
        required: [ true, name.required ],
        validate: nameValid
    },
    menuId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    },
    subMenu: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
        default: null
    },
    position: {
        type: Number,
        required: [ true, integerPosition.required ],
        validate: integerPositionValid
    }
});

module.exports = model('MenuItem', menuItemSchema);
