const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false
    },
    content: {
        type: String,
        unique: false

    }
})

const Inputs = mongoose.model('inputs', userSchema);

module.exports = Inputs;

