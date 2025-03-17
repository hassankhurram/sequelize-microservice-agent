
import Database from "./database/database.js";
await Database.connect();
import functions from "@google-cloud/functions-framework";
import Util from "./utils.js";
import requestHandler from "./requestHandler.js";

functions.http("bridge", async (req, res) => {
    try {

        const { body } = req;

        let isValid = Util.validateInvokeSchema(body);
        if (isValid.status) {

            const actionResponse = await requestHandler(body);

            res.status(200).json({
                status: true,
                response: actionResponse
            });
        }
        else {
            const errorMessages = isValid.error.map(error => {
                return error.message;
            });
            console.log("errorMessages", errorMessages)
            res.status(401).json({
                status: false,
                response: errorMessages
            });
        }


    } catch (error) {
        console.log({error})
        res.status(500).json({
            status: false,
            response: error
        });
    }
});


