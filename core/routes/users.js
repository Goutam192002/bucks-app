const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();

const fusionService = require("../services/fusion");

const { User } = require("../models/user");
const { Transaction } = require("../models/transaction");
const { Employee, Client } = require("../models/client");

router.post('/submit-kyc', async (req, res) => {
    const userId = req.body.userId || req.user.id;
    const application = await fusionService.createNewApplication(req.body);
    // Add mock card details
    const user = await User.findByIdAndUpdate(userId, {
        applicationId: application.applicationId,
        name: req.body.firstName,
        card: {
            cardNumber: '4242 4242 4242 4242',
            expiry: {
                month: '12',
                year: '25'
            },
            cvv: '255',
            network: 'VISA',
            cardHolderName: req.body.firstName
        }
    }, { new: true, });
    res.send(user);
});

router.post('/summary', async (req, res) => {
    const userId = req.body.userId || req.user.id;

    const [income, expense] = await Transaction.aggregate([
        {
          '$match': {
            "userId": new mongoose.Types.ObjectId(userId)
          }
        }, {
          '$group': {
            '_id': '$type', 
            'amount': {
              '$sum': '$amount'
            }
          }
        }
    ]);

    const user = await User.findById(userId);

    res.send({
        balance: user.balance,
        income: income ? income.amount : 0,
        expense: expense ? expense.amount : 0,
    });
});

router.post('/transactions', async (req, res) => {
  const userId = req.body.userId || req.user.id;

  const transactions = await Transaction.find({ userId });
  
  res.send(transactions);
});

router.post('/linked-accounts', async (req, res) => {
  const userId = req.body.userId || req.user.id;

  const employees = await Employee.find({ userId }).populate({
    path: 'clientId',
    model: Client
  });

  res.send(employees);
});
module.exports = router;