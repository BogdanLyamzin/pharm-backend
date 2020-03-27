const BlogPostModel = require('./test-shema');

exports.getTest = (app) => {
    app.get( '/get-test-prod/:id', async ( req, res ) => {
        const id = req.params.id;

        try {
            const result = await BlogPostModel.findById(id).exec();
            res.send( {
                status: "Success",
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
