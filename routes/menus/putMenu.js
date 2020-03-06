const Menu = require('../../models/menu');

module.exports = (app) => {
    app.put('/menus/:id', async (req, res) => {

        try {
            const result = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });

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
