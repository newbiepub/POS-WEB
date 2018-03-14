import express from 'express';
import got from "got";
import API from "../../constants/api";

const account = express.Router();
let production = process.env.NODE_ENV === "production";

/**
 * Get Current User
 * @param token
 * @param req
 * @returns {Promise.<void>}
 */
async function getCurrentUser(token, req) {
    try {
        let response = await got.post(`${process.env.API_URL}${API.ENDPOINT}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-AUTHENTICATION": token
            },
            body: JSON.stringify({query: `query getCurrentUser {
                  currentUser {
                    ...userProfile
                    ... on CurrentCompany {
                      email
                    }
                    ... on CurrentEmployee {
                      username
                      companyId
                    }
                  }
                }
                
                fragment userProfile on User {
                  _id
                  profile {
                    name
                    address
                    phoneNumber
                  }
                }`})
        });
        let { data } = JSON.parse(response.body);

        if(data.currentUser) {
            req.session.user = data.currentUser;
        }
    } catch (e) {
        throw e;
    }
}

account.post("/login", async (req, res, next) => {
    try {
        let {email, password} = req.body;
        if(!email && !password) {
            throw new Error("EMAIL_PASSWORD_REQUIRED");
        }
        let response = await got.post(`${process.env.API_URL}${API.ENDPOINT_LOGIN}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });
        response = JSON.parse(response.body); // Data - { token: "" }
        // Save auth token to session
        req.session.authToken = response.token;
        // Save User To Session
        await getCurrentUser(response.token, req);
        // Redirect to current route
        res.redirect("/");
    } catch (e) {
        res.status(500).json({error: {message: e.message}});
    }
});

export default account;