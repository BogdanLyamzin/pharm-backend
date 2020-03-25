const BlogPostModel = require('./test-shema');

exports.saveTest = (app) => {
    app.post( '/save-test-prod', async ( req, res ) => {
        const obj = {
            // content: req.body
            content: req.body
        }

        console.log(obj)

        try {
            const post = new BlogPostModel( obj );
            const result = await post.save();
            res.send( {
                status: "Success",
                message: 'Post added!',
                result
            } );

        } catch (err) {
            res.send( {
                status: "Error",
                message: err.message
            } );
        }
    });
};
