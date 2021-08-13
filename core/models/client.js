const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
    companyName: String,
    companyLogo: String,
});

const employeeSchema = new Schema({
    clientId:  {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'clients'
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    active: {
        type: Boolean,
        default: false
    }
});

const disbursalSchema = new Schema({
    employeeId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "employees"
    },
    amount: Number,
    clientId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "clients"
    }
}, {
    timestamps: {
        createdAt: "timestamp"
    }
});

module.exports = {
    Disbursal: mongoose.model('Disbursal', disbursalSchema),
    Client: mongoose.model('Client', clientSchema),
    Employee: mongoose.model('Employee', employeeSchema),
}