const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    mobile: String,
    role: String,
    applicationID: String,
    individualID: String,
    cardID: String,
    accountID: String,
    bundleID: String,
    mobile_verified: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    },
    balance: {
        type: Number,
        default: 0,
    }
});

userSchema.index({ mobile: 1, role: 1 });

module.exports = {
    User: mongoose.model('User', userSchema)
};