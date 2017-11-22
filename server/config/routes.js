const controller  = require("../controllers/controller");

module.exports = function (app) {
    app.post("/login", controller.login);
    app.post("/logout", controller.logout);

    app.get("/items", controller.getAllItems);
    app.post("/items/new", controller.addNewItem);
    app.get("/items/:id", controller.singleItem);
    app.post("/items/destroy/:id", controller.deleteItem);
    app.get("/vote/:id", controller.upVote);
    app.post("/items/:id", controller.addNewAnswer);
}
