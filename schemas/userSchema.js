const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    }
});

module.exports = userSchema;