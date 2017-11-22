const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema(
    {
        item_name: {type: String, required: true, minlength: 2},
        description: {type: String, required: true, minlength: 8},
        quantity: {type: Number, default: 0},
        added_by: {type: String, required: true, minlength: 2, default: "anon"}
    },
    {
        timestamps: true
    }
)

mongoose.model('Item', ItemSchema)