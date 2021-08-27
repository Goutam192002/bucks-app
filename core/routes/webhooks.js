const express = require("express");
const router = new express.Router();

const { User } = require('../models/user');

const fusionService = require('../services/fusion');

router.post("/zeta_payment_requested", async (req, res) => {
    const paymentID = req.body.payment.id;
    const amount = req.body.payment.value.amount;
    const paymentRequestID = req.body.payment.paymentRequest.paymentRequestID;
    const accountID = req.body.payment.payer.targetURI.replace('account://', '');
    const resourceID = req.body.payment.payer.resourceID;

    res.send(true);
    const accountInfo = await fusionService.fetchAccountBalance(accountID);
    if (accountInfo.balance < amount) {
        console.log('finding user')
        const user = await User.findOne({ accountID }); // Add condition
        if (user.balance < amount) {
            console.log('failing payment');
            await fusionService.resumePayment({
                resourceID,
                paymentID,
                paymentRequestId: paymentRequestID,
                response: 'FAIL'
            })
        } else {
            console.log('transferring amount')
            const transaction = await fusionService.transfer({
                amount: amount,
                creditAccountID: accountID
            });
            console.log('resuming payment')
            const paymentResponse = await fusionService.resumePayment({
                resourceID,
                paymentID,
                paymentRequestId: paymentRequestID,
                response: 'PASS_THROUGH'
            })
        }
    } else {
        console.log("sufficient balance, resuming payment");
        await fusionService.resumePayment({
            resourceID,
            paymentID,
            paymentRequestId: paymentRequestID,
            response: 'PASS_THROUGH'
        })
    }
});

module.exports = router;