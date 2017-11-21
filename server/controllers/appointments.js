const mongoose = require('mongoose');

const Appointment = mongoose.model("Appointment");


module.exports = {

    login: function(req, res) {
        console.log(req.body);
        req.session.user = req.body.username;
        return res.json({"user": req.session.user});
    },

    logout: function(req, res){
        req.session = null;
        return res.status(200).json({"status":"OK"});
    },

    checkLogin: function(req, res){
        if (req.session.user){
            let data = JSON.stringify({user: req.session.user});
            console.log(data);
            return res.json(data);
        }
    },

    getAllAppointments: function (req, res) {
        Appointment.find(
            {},
            (err, appts) => {
                if (err) { console.log(`server .appointments. getAllAppts ERROR: ${err}`) }
                return res.json(appts);
            }
        )
    },


    addNewAppt: function (req, res) {
        console.log(req.body);
        if (!req.session.user){
            return res.redirect('/');
        }
        else {
            Appointment.create({
                patient_name: req.session.user,
                complaint: req.body.complaint,
                date: req.body.date
            },
            (err, newAppt) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
                else {
                    return res.sendStatus(200);
                }
            })
        }
    },

    deleteAppt: function (req, res) {
        Appointment.remove(
            {_id: req.params.id, patient_name: req.session.user},
            (err) => {
                if (err) {
                    console.log('SERVER DELETE APPT ERROR', err);
                    return res.sendStatus(400);
                }
                return res.sendStatus(200);
            }
        );
    }

}