const {Schema, model} = require("mongoose");

const loginShema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 6,
        max: 50,
        required: true
    },
});

module.exports = model("Login", loginShema);