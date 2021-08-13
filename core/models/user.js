const mongoose = require("mongoose");
const { Schema } = mongoose;

const expirySchema = new Schema({
    month: String,
    year: String
}, { _id: false });

const cardSchema = new Schema({
    cardNumber: String,
    expiry: expirySchema,
    network: String,
    cardStatus: String,
    cvv: String,
    cardHolderName: String,
}, { _id: false });

const userSchema = new Schema({
    name: String,
    mobile: String,
    role: String,
    applicationId: String,
    mobile_verified: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    },
    card: {
        type: cardSchema,
        default: {}
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