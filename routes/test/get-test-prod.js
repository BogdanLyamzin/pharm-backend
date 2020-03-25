const BlogPostModel = require('./test-shema');

exports.getTest = (app) => {
    app.get( '/get-test-prod/:id', async ( req, res ) => {
        const id = req.params.id;

        try {
            const result = await BlogPostModel.findById(id).exec();
            const content = {};
            const obj = result.content;
            console.log(obj);
            // console.log(result)
            // for ( let [key, value] of  Object.entries(obj)) {
            //     console.log(`${key} : ${value}`)
            //     Object.assign(content, {key: value});
            // }
            Object.assign(content, result.content);
            delete content["$init"];
            res.send( {
                status: "Success",
                content
            } );

        } catch (err) {
            res.send( {
                status: "Error",
                message: err.message
            } );
        }
    });
};
