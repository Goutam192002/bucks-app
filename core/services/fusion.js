const uuid = require("uuid");

async function createNewApplication({
    mobile,
    dob,
    salutation,
    firstName,
    lastName,
    gender,
    motherName
}) {
    return new Promise(resolve => {
        const requestId = uuid.v4();
        // TODO: Implement fusion application API here.
        setTimeout(() => {
            resolve({
                "applicationId": "88d24ca5-2f75-435d-9fed-b6bb0a662377",
                "spoolId": "12b66d97-c5c5-4a38-b896-b1790a6a6845",
                "ifiId": 140793,
                "requestId": requestId,
                "status": "DATA_CAPTURE_INITIATED",
                "sections": {
                    "AccountHolderDetails": {
                        "sectionId": "4d62f76d-9826-4b72-a7f5-c3c885e2f6b9",
                        "ifiId": 140793,
                        "spoolId": "12b66d97-c5c5-4a38-b896-b1790a6a6845",
                        "applicationId": "88d24ca5-2f75-435d-9fed-b6bb0a662377",
                        "name": "AccountHolderDetails",
                        "type": "CreateRealAccountHolder",
                        "details": {
                            "dob": dob,
                            "gender": gender,
                            "lastName": lastName,
                            "firstName": firstName,
                            "salutation": salutation,
                            "profilePicURL": "",
                            "individualType": "REAL",
                            "applicationType": "CREATE_ACCOUNT_HOLDER",
                            "mothersMaidenName": motherName
                        },
                        "createdAt": new Date().toDateString(),
                        "updatedAt": new Date().toDateString()
                    }
                },
                "vectors": [
                    {
                        "vectorId": "d8979db7-bc16-4934-9450-4c33a3991791",
                        "ifiId": 140793,
                        "spoolId": "12b66d97-c5c5-4a38-b896-b1790a6a6845",
                        "applicationId": "88d24ca5-2f75-435d-9fed-b6bb0a662377",
                        "type": "p",
                        "value": mobile,
                        "status": "ENABLED",
                        "attributes": {},
                        "createdAt": new Date().toDateString(),
                        "updatedAt": new Date().toDateString()
                    }
                ],
                "stages": [
                    {
                        "stageId": "2b7c5ecc-64dc-4985-93d8-b1dfb8788de5",
                        "ifiId": 140793,
                        "applicationId": "88d24ca5-2f75-435d-9fed-b6bb0a662377",
                        "spoolId": "12b66d97-c5c5-4a38-b896-b1790a6a6845",
                        "name": "ASSESSMENT",
                        "status": "NOT_INITIATED",
                        "details": {},
                        "result": {},
                        "createdAt": new Date().toDateString(),
                        "updatedAt": new Date().toDateString()
                    },
                    {
                        "stageId": "24691789-c586-49fc-9071-ef5c58066211",
                        "ifiId": 140793,
                        "applicationId": "88d24ca5-2f75-435d-9fed-b6bb0a662377",
                        "spoolId": "12b66d97-c5c5-4a38-b896-b1790a6a6845",
                        "name": "DATA_CAPTURE",
                        "status": "INITIATED",
                        "details": {},
                        "result": {
                            "validationFailed": [
                                {
                                    "code": "APPLICATION_SCHEMA_VALIDATION_FAILED",
                                    "type": "JsonSchemaValidator",
                                    "status": "FAILED",
                                    "message": "#: #: only 1 subschema matches out of 2",
                                    "attributes": {
                                        "errorMessages": [
                                            "#/sections: required key [Personal] not found",
                                            "#/sections: required key [Vectors] not found"
                                        ]
                                    }
                                }
                            ]
                        },
                        "createdAt": new Date().toDateString(),
                        "updatedAt": new Date().toDateString(),
                    },
                    {
                        "stageId": "3546099b-4d81-42d5-abea-05dfbadf50a2",
                        "ifiId": 140793,
                        "applicationId": "88d24ca5-2f75-435d-9fed-b6bb0a662377",
                        "spoolId": "12b66d97-c5c5-4a38-b896-b1790a6a6845",
                        "name": "ENRICHMENT",
                        "status": "NOT_INITIATED",
                        "details": {},
                        "result": {},
                        "createdAt": new Date().toDateString(),
                        "updatedAt": new Date().toDateString()
                    },
                    {
                        "stageId": "11f04481-6e07-4036-b549-69a1868abdfc",
                        "ifiId": 140793,
                        "applicationId": "88d24ca5-2f75-435d-9fed-b6bb0a662377",
                        "spoolId": "12b66d97-c5c5-4a38-b896-b1790a6a6845",
                        "name": "PROVISIONING",
                        "status": "NOT_INITIATED",
                        "details": {},
                        "result": {},
                        "createdAt": new Date().toDateString(),
                        "updatedAt": new Date().toDateString()
                    },
                    {
                        "stageId": "e6163594-0b26-4d96-a890-79231c7adcf4",
                        "ifiId": 140793,
                        "applicationId": "88d24ca5-2f75-435d-9fed-b6bb0a662377",
                        "spoolId": "12b66d97-c5c5-4a38-b896-b1790a6a6845",
                        "name": "REVIEW",
                        "status": "NOT_INITIATED",
                        "details": {},
                        "result": {},
                        "createdAt": new Date().toDateString(),
                        "updatedAt": new Date().toDateString()
                    }
                ],
                "tags": [
                    {
                        "type": "spool-id",
                        "value": "12b66d97-c5c5-4a38-b896-b1790a6a6845",
                        "attributes": {}
                    },
                    {
                        "type": "vbo-id",
                        "value": "26c28ca6-4202-464c-9806-b788989762d4",
                        "attributes": {}
                    }
                ],
                "createdAt": new Date().toDateString(),
                "updatedAt": new Date().toDateString()
            })
        }, 1000);
    });
}

module.exports = { createNewApplication };