const MenuItem = require('../../../models/menuItem');

module.exports = (app) => {
    app.put('/menus/:menuId/item/:id', async (req, res) => {

        try {
            const result = await MenuItem.findByIdAndUpdate(req.params.id, req.body);

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
