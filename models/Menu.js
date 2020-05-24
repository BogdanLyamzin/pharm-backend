const { Schema, model } = require('mongoose');

const { name } = require('../configs/validationRules');
const createValidate = require('../utils/createValidate');

const { nameValid } = createValidate(name);

const menuSchema = new Schema({
    menuTitle: {
        type: String,
        trim: true,
        required: [ true, name.required ],
        validate: nameValid
    }
});

module.exports = model('Menu', menuSchema);
