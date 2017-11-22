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
        Question.find(
            {},
            (err, items) => {
                if (err) { console.log(`controller. getAllAppts ERROR: ${err}`) }
                console.log(items);
                let quests = [];
                for (let quest of items){
                    Answer.find(
                        {_question: quest._id},
                        (err, qs) => {
                            if (qs && qs.length > 0){
                                quest['_nAnswers'] = qs.length;
                            }
                            else {
                                quest['_nAnswers'] = 0;
                            }
                        }
                    );
                    quests.push(quest);
                }
                return res.json({username: req.session.user, items: quests});
            }
        )
    },

    singleItem: function(req, res){
        let answers = [];
        let paramID = req.params.id;
        Answer.find(
            {'_question': paramID},
            (err, _answers) => {
                console.log(`_answers: ${_answers}`);
                answers = _answers;
            }
        );
        if (answers){
            answers = answers.sort((a, b) => b.votes - a.votes);
        }
        console.log(`answers: ${answers}`);
        Question.findOne(
            {_id: paramID},
            (err, quest) => {
                return res.json(
                    {
                        'username': req.session.user,
                        'q': quest,
                        'answers': answers
                    }
                )
            }
        );
    },

    addNewItem: function (req, res) {
        console.log(req.body);
        if (!req.session.user){
            console.log("ERROR: user error in addNewItem")
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

    upVote(req, res){
        Answer.findOne(
            { _id: req.params.id },
            (err, answ) => {
                if (err) {
                    console.log(`UPVOTE ERROR! err... #${err}`);
                }
                answ.votes += 1;
                answ.save();
                return res.json({'ok':true});
            }
        )
    },

    addNewAnswer: function (req, res) {
        Answer.create(
            {
                answer: req.body.answer,
                _question: req.params.id,
                answered_by: req.session.user,
                votes: 0
            },
            (err, ans) => {
                if (err) {
                    console.log(`ADD NEW ANSWER ERROR!! error... ${err}`);
                }
                return res.json({OK: true});
            }
        );
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