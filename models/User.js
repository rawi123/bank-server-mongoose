const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    passportID: {
        type: String,
        required: true,
        unique: true
    },
    cash: {
        type: Number,
        default: 0
    },
    credit: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
})



const user = mongoose.model("users", userSchema);
module.exports = user