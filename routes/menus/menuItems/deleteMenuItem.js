const MenuItem = require('../../../models/menuItem');

module.exports = (app) => {
    app.delete('/menus/:menuId/item/:id', async (req, res) => {

        try {
            const result = await MenuItem.findByIdAndDelete(req.params.id);

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
