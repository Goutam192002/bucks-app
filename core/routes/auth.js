const express = require("express");
const router = new express.Router();

const { User } = require("../models/user");

router.post('/', async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).send({
            mobile: 'Missing field'
        });
    }

    let user;
    let next = '/onboarding/verify';
    let logged = false;

    user = await User.findOne({ mobile });
    if (user) {
        logged = true;
        if (user.mobile_verified && !user.applicationID) {
            next = '/onboarding/submit-kyc';            
        } else if (user.mobile_verified && user.applicationID) {
            next = '/';
        }
    } else {
        user = new User({ mobile, role: 'employee' });
        await user.save();
    }
    res.send({
        mobile,
        userId: user.id,
        user,
        next,
        logged
    });
});

router.post('/verify', async (req, res, next) => {
    const { mobile, code } = req.body;

    if (code === "454545") {
        const user = await User.findOneAndUpdate({ mobile }, {
            mobile_verified: true,
            active: true,
        }, { new: true });
        let next = '/';
        if (!user.applicationID) {
            next = '/onboarding/submit-kyc';
        }
        return res.send({
            user,
            next,
            logged: true
        });
    } 
    res.status(400).send({
        error: true,
        message: 'Invalid OTP entered. Please try again.',
        logged: false
    })
});

router.post('/next', async (req, res) => {
    const userId = req.body.userId || req.user.id;

    const user = await User.findById(userId);

    let next = '/onboarding/submit-kyc';

    if (user.applicationID) {
        next = '/';
    }

    res.send({ next });
});

module.exports = router;
