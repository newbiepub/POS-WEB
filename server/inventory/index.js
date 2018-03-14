import express from 'express';
import got from "got";
import API from "../../constants/api";

const inventory = express();

/**
 * Send Import Product To API Server
 * @param data
 * @param token - JWT token for api authentication
 * @returns {Promise.<string>}
 */
async function sendImportProductToAPI(data = [], token) {
    try {
        if(data.length) {
            let { body = "" } = await got.post(`${process.env.API_URL}${API.IMPORT_COMPANY_INVENTORY}`, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-AUTHENTICATION": token
                },
                body: JSON.stringify({data})
            });
            return body;
        }
    } catch (e) {
        throw e;
    }
}

inventory.post(`/import`, async (req, res, next) => {
    try {
        let { data = [] } = req.body;
        // function sendImportProductToAPI(data: array, token: string)
        let response = await sendImportProductToAPI(data, req.session.authToken);
    } catch (e) {
        res.status(500).json({errors: [{message: e.message}]});
    }
});

export default inventory;