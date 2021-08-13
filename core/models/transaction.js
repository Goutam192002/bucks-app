const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
    type: String, // "credit", "debit",
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users"
    },
    amount: Number,
    meta_thumbnail: String,
    meta_description: String,
}, {
    timestamps: {
        createdAt: "timestamp"
    }
});

module.exports = {
    Transaction: mongoose.model("Transaction", transactionSchema),
};