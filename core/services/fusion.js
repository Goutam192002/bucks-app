const axios = require("axios");

const config = {
    headers: {
        "X-Zeta-AuthToken": "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidGFnIjoiTUIwd1AzQXhsWWpmeHo0bTQ4RU9yQSIsImFsZyI6IkExMjhHQ01LVyIsIml2IjoiX0ljd214aFNhdWt5bFZ0TiJ9.c0y79FRGliAmw8ALI1Ees45DoZt1CZd9DibDNcIDlkc.lwiwhEgVDsgyDIrvrWLtLw.-txkzZOS258czw9cAAyxQXp5gPvHuQDqhYzrVfdJ4D2LniDxC_YDMcal-y3p8PcqMa25LiNFh61L3UnliGRmodCJnsItpDCsurp5Tb9MfnsnhtiKrT20k-SoYTS7MxwJ9xA2fvIGujIkKIEfgaFGK0eftGSH-AYCFMHtSdcnyE1cA-UUluJHVMSllZQ6sP6J7oOoCt_UNkub8RumzlP_byG69IjfUeC9h0hq0ZpRhBswmGYFHzI5wEmqO-ocv0o7QsIWq49BWPCT0gtTNuaKDD3sMdOGPoDg3UM_yO6L4ch18cejIq9S_NDHbPmT0wvZaeVha-9hq7VbsfR0dtjquAcgpGciBS08h_Th5yG7dipMntq4J0iu8IfVQeXtFEEXbPW58VPAmOn4gGHmwaoR1A.gEHfqMLopDWLtOpjDLv34g" 
    },
};

async function createNewApplication({
    mobile,
    dob,
    firstName,
    gender,
    pan,
    motherName
}) {
    const response = await axios.post("https://fusion.preprod.zeta.in/api/v1/ifi/140793/applications/newIndividual", {
        "ifiID": "140793",
        "applicationType": "CREATE_ACCOUNT_HOLDER",
        "individualType": "REAL",
        "firstName": firstName,
        "dob": dob,
        "gender": gender,
        "mothersMaidenName": motherName,
        "kycDetails": {
            "kycStatus": "MINIMAL",
            "kycStatusPostExpiry": "KYC_EXPIRED",
            "kycAttributes": {},
            "authData": {
                "PAN": pan
            },
            "authType": "PAN"
        },
        "vectors": [
            {
                "type": "p",
                "value": `+91${mobile}`,
                "isVerified": true
            }
        ]
    }, config);
    return response.data;
}

async function issueBundle({ accountHolderID, name, phoneNumber }) {
    const response = await axios.post("https://fusion.preprod.zeta.in/api/v1/ifi/140793/bundles/d548722a-1aae-45a4-8e5c-6fadcb730b13/issueBundle", {
        accountHolderID,
        name,
        phoneNumber
    }, config);
    return response.data;
}

async function fetchAccountHolderInfo(individualID) {
    const response = await axios.get(`https://fusion.preprod.zeta.in/api/v1/ifi/140793/accountHolders/${individualID}/`, config);
    return response.data;
}

async function fetchResourceDetails(resourceID) {
    const response = await axios.get(`https://fusion.preprod.zeta.in/api/v1/ifi/140793/resources/${resourceID}`, config);
    return response.data
}

async function fetchCardDetails(formFactorID) {
    console.log(formFactorID);
    const response = await axios.get(`https://fusion.preprod.zeta.in/api/v1/ifi/140793/cards/${formFactorID}`, config);
    return response.data;
}

module.exports = { 
    createNewApplication, 
    issueBundle, 
    fetchAccountHolderInfo,
    fetchResourceDetails,
    fetchCardDetails
};