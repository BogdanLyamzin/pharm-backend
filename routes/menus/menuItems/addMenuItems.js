const MenuItem = require('../../../models/menuItem');

module.exports = (app) => {
    app.post('/menus/:menuId/item/:id', async (req, res) => {

        const menuItem = new MenuItem.menuItemModel({
            menuItemTitle: req.body.menuItemTitle,
            id: req.body.id,
            menuId: req.body.menuId
        });

        try {
            const result = await menuItem.save();

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
