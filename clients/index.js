const express = require("express");
const router = new express.Router();

const axios = require("axios");

const { Client } = require("../core/models/client");

router.post('/add-to-payroll', async (req, res) => {
    const { companyName, mobile, name } = req.body;
    
    const company = await Client.findOne({ companyName });

    if (company) {
        const response = await axios.post(`${req.protocol}://${req.headers.host}/api/client/enroll-employee`, {
            clientId: company.id,
            mobile: mobile,
            name: name
        });
        return res.send(response.data);
    }
    res.status(400).send('Something went wrong');
});

module.exports = router;