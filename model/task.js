const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: String,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'customers'
    }
},
    {
        timestamps: true
    })
const task = mongoose.model('task', taskSchema)
module.exports = task