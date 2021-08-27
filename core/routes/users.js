const express = require("express");
const router = new express.Router();
const { ObjectId } = require("mongoose").Types;

const fusionService = require("../services/fusion");

const { User } = require("../models/user");
const { Transaction } = require("../models/transaction");
const { Employee, Client } = require("../models/client");

router.post('/submit-kyc', async (req, res) => {
    const userId = req.body.userId || req.user.id;
    // Creates new application
    const application = await fusionService.createNewApplication(req.body);
    // Issues account and card
    const bundle = await fusionService.issueBundle({
      accountHolderID: application.individualID,
      name: `Bucks_GigWorker_${req.body.firstName}`,
      phone: `+91${req.body.mobile}`
    });
    // Fetches resource details for the payment instrument (card here)
    const resourceDetails = await fusionService.fetchResourceDetails(bundle.paymentInstruments[0].resourceID);
    // Update relavent info for future use
    const user = await User.findByIdAndUpdate(userId, {
        applicationID: application.applicationID,
        individualID: application.individualID,
        name: req.body.firstName,
        cardID: resourceDetails.formFactors[0].formFactorID,
        accountID: bundle.accounts[0].accountID,
        bundleID: bundle.accounts[0].bundleID
    }, { new: true, });
    res.send(user);
});

router.post('/summary', async (req, res) => {
    const userId = req.body.userId || req.user.id;

    const incomes = await User.aggregate([
      {
        '$match': {
          '_id': new ObjectId(userId)
        }
      }, {
        '$lookup': {
          'from': 'employees', 
          'localField': '_id', 
          'foreignField': 'userId', 
          'as': 'source'
        }
      }, {
        '$unwind': '$source'
      }, {
        '$lookup': {
          'from': 'disbursals', 
          'localField': 'source._id', 
          'foreignField': 'employeeId', 
          'as': 'history'
        }
      }, {
        '$unwind': '$history'
      }, {
        '$group': {
          '_id': '$history.clientId', 
          'income': {
            '$sum': '$history.amount'
          }
        }
      }, {
        '$lookup': {
          'from': 'clients', 
          'localField': '_id', 
          'foreignField': '_id', 
          'as': 'client'
        }
      }, {
        '$replaceWith': {
          'income': '$income', 
          'client': {
            '$mergeObjects': [
              {
                '$arrayElemAt': [
                  '$client', 0
                ]
              }
            ]
          }
        }
      }
    ]);

    const user = await User.findById(userId);

    res.send({
        balance: user.balance,
        incomes
    });
});

router.post('/transactions', async (req, res) => {
  const userId = req.body.userId || req.user.id;

  const transactions = await Transaction.find({ userId, type: "debit" });
  
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

router.post('/card-details', async (req, res) => {
  const userId = req.body.userId || req.user.id;

  const { cardID } = await User.findById(userId);
  const card = await fusionService.fetchCardDetails(cardID);
  
  res.send(card);
})
module.exports = router;