const appointments = require("../controllers/appointments");

module.exports = function (app) {
    app.post("/login", appointments.login);
    app.get("/login", appointments.checkLogin);
    app.get("/logout", appointments.logout);

    app.get("/appointments", appointments.getAllAppointments);
    app.post("/addnew", appointments.addNewAppt);
    app.post("/appointments/destroy/:id", appointments.deleteAppt);

}
