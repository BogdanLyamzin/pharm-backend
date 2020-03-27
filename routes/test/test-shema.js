const {Schema, model} = require("mongoose");

const BlogPost = new Schema({
    content: {
        title: { type: String, intl: true },
        body: { type: String, intl: true }
    }
}, {
    toJSON: {
        virtuals: true,
    }
});

module.exports = model('Post', BlogPost);

