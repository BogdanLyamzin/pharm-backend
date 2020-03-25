const {Schema, model} = require("mongoose");
const mongooseIntl = require('mongoose-intl');
const mongoose = require('mongoose')

const BlogPost = new Schema({
    content: {
        title: { type: String, intl: true },
        body: { type: String, intl: true }
    }
});

// const BlogPost = new Schema({
//     title: { type: String, intl: true },
//     body: { type: String, intl: true }
// });


// var BlogPost = new Schema({
//     content: {
//         title: { type: String, intl: true },
//         body: { type: String, intl: true }
//     }
// }, {
//         virtuals: true,
//
// });

const createMultilangShema = (shema) => {
    // for (let key of shema.content)
}

BlogPost.plugin(mongooseIntl, { languages: ['ua', 'ru', 'en'], defaultLanguage: `ua` });

module.exports = model('Post', BlogPost);
// module.exports = model('Post', createMultilangShema(BlogPost));
