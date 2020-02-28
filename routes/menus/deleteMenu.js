const MenuModel = require('../../models/menu');

module.exports = (app) => {
    app.delete('/menus/:id', async (req, res) => {

        try {
            const result = await MenuModel.findByIdAndDelete(req.params.id);

            res.send({
                status: "Success",
                result: result,
            });
        } catch (err) {
            res.send({
                status: "Error",
                message: err,
            });
        }
    });
};
