const mongoose = require('mongoose');

const Item = mongoose.model("Item");


module.exports = {

    login: function(req, res) {
        console.log(req.body);
        req.session.user = req.body.username;
        return res.json({"username": req.session.user});
    },

    logout: function(req, res){
        console.log(`called logout req.body:   ${req.body}`);
        req.session = null;
        return res.status(200).json({"status":"OK"});
    },

    checkLogin: function(req, res){
        if (req.session.user){
            return res.json(req.session.user);
        }
    },

    getAllItems: function (req, res) {
        Item.find(
            {},
            (err, items) => {
                if (err) { console.log(`controller. getAllAppts ERROR: ${err}`) }
                return res.json({username: req.session.user, items: items});
            }
        )
    },

    singleItem: function(req, res){
        Item.findOne(
            {_id: req.params.id},
            (err, item) => {
                if (err) {
                    console.log(`ERROR: controller singleItem ${err}`);
                }
                return res.json({username: req.session.user, items: items});
            }
        )
    },

    addNewItem: function (req, res) {
        console.log(req.body);
        if (!req.session.user){
            console.log("ERROR: user error in addNewAppt")
            return res.redirect('/');
        }
        else {
            Item.create(
                {
                    item_name: req.body.item_name,
                    description: req.body.description,
                    added_by: req.body.added_by,
                    quantity: req.body.quantity
                },
                (err, newAppt) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json(err);
                    }
                    else {
                        return res.json({'ok':true});
                    }
                }
            )
        }
    },

    deleteItem: function (req, res) {
        Item.remove(
            {_id: req.params.id, added_by: req.session.user},
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