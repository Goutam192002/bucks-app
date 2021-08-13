const express = require("express");

const { User } = require("../models/user");
const { Employee, Disbursal, Client } = require("../models/client");
const { Transaction } = require("../models/transaction");

const router = new express.Router();

router.post('/enroll-employee', async (req, res) => {
    const { clientId, mobile, name } = req.body;

    let user;
    user = await User.findOne({ mobile });
    if (!user) {
        user = new User({ mobile, role: 'employee', name });
        await user.save();
    }
    const employee = await Employee({
        clientId,
        userId: user.id,
        active: true
    });
    await employee.save();
    res.send(employee);
});

router.post('/disburse', async (req, res) => {
    const disbursal = new Disbursal(req.body);
    await disbursal.save();

    const employee = await Employee.findById(req.body.employeeId);
    const client = await Client.findById(req.body.clientId);

    const txn = new Transaction({
        type: "credit",
        userId: employee.userId,
        amount: req.body.amount,
        meta_thumbnail: `/assets/${client.companyName}.png`,
        meta_description: client.companyName
    });
    await txn.save();

    const user = await User.findById(employee.userId);
    user.balance = txn.type === "credit" ? parseInt(user.balance) + parseInt(req.body.amount) : parseInt(user.balance) - parseInt(req.body.amount);
    await user.save();
    
    res.send(disbursal);
});

module.exports = router;