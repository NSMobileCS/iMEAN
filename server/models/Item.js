const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
    {
        question: {type: String, required: true, minlength: 10},
        description: {type: String, default: ''},
        // answers: [{type: String}]
    },
    {
        timestamps: true
    }
)

const AnswerSchema = new mongoose.Schema(
    {
        answer: {type: String, required: true, minlength: 5},
        votes: {type: Number, default: 0},
        answered_by: {type: String, required: true},
        _question: {type: String}
    }
)

mongoose.model('Answer', AnswerSchema);
mongoose.model('Question', QuestionSchema)