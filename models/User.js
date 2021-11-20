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

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.__v
    delete userObject._id
    return userObject
}


const user = mongoose.model("users", userSchema);
module.exports = user