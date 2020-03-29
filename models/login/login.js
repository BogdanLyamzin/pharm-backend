const {Schema, model} = require("mongoose");

const loginShema = new Schema({
    login: {
        type: String,
        required: [true, 'This field should not be empty'],

    },
    password: {
        type: String,
        min: 6,
        max: 50,
        required: [true, 'This field should not be empty']
    },
});

module.exports = model("Login", loginShema);