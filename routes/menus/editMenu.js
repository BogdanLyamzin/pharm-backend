const MenuModel = require('../../models/menu');

module.exports = (app) => {
    app.put('/menus/:id', async (req, res) => {

        try {
            const result = await MenuModel.findByIdAndUpdate(req.params.id, req.body);

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
