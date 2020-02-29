const MenuItem = require('../../../models/menuItem');

module.exports = (app) => {
    app.get("/menus/:menuId/item/:id", async (req, res) => {

        try {
            const result = await MenuItem.findById(req.params.id);

            res.send({
                status: "Success",
                result: result,
            });
        } catch(err) {
            res.send({
                status: "Error",
                message: err,
            });
        }
    });
};
