const mongoose = require('mongoose');

const Question = mongoose.model("Question");
const Answer = mongoose.model("Answer");


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

    getAllItems: function (req, res) {
        Question.find({}).populate('answers').exec(
            (err, items) => {
                if (err) { console.log(`controller. getAllAppts ERROR: ${err}`) }
                return res.json({username: req.session.user, items: items});
            }
        )
    },

    singleItem: function(req, res){
        let answers = [];
        Answer.find(
            {'_question': req.params.id},
            (_answers) => answers = _answers
        );
        answers = answers.sort((a, b) => a.votes - b.votes);
        console.log(`answers: ${answers}`);
        Question.findOne(
            {_id: req.params.id},
            (quest) => req.json({username: req.session.user, question: quest, answers: answers})
        );
    },

    addNewItem: function (req, res) {
        console.log(req.body);
        if (!req.session.user){
            console.log("ERROR: user error in addNewAppt")
            return res.redirect('/');
        }
        else {
            Question.create(
                {
                    question: req.body.question,
                    description: req.body.description,
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

    addNewAnswer: function (req, res) {
        Answer.create(
            {
                answer: req.body.answer,
                _question: req.params.id,
                answered_by: req.session.user
            },
            (err, newAnswer) => {
                if (newAnswer) {
                    return res.json({'ok':true})
                }
            }
        )
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