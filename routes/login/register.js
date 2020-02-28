module.exports = (app)=> {
    app.get("/register", (req, res)=> {
        res.send("You need to register");
    });
}