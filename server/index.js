import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import compression from 'compression';
import minify from 'express-minify';
import helmet from 'helmet';
import csurf from 'csurf';
import http from 'http';
import path from 'path';
import MemoryStore from 'memorystore';
import url from 'url';
import next from 'next';
import faker from "faker";
import account from './account';

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const memoryStore = MemoryStore(session);

app.prepare().then(() => {
    // Express
    let  server = express();

    //Query string
    server.use((req, res, next) => {
        req.query = url.parse(req.url, true);
        next();
    });

    // Body parser
    server.use(bodyParser.urlencoded({extended: false, limit: '5mb'}));
    server.use(bodyParser.json({limit: '5mb'}));

    // Enable Cookie
    server.use(cookieParser());

    //Helmet and CSRF protection
    server.use(helmet());
    server.use(csurf({cookie: true}));

    // Minification
    server.use(compression());
    server.use(minify());

    // Session
    let sess = {
        name: "APPLICATION-SESSION-ID",
        secret: faker.random.uuid(),
        resave: false,
        store: new memoryStore({
            checkPeriod: 86400000 // prune expired entries every 24h
        }),
        saveUninitialized: false,
        cookie: {
            domain: process.env.DOMAIN_NAME || "localhost",
            maxAge: (1000 * 60 * 30) // Expire in 30 minutes
        }
    };

    // Set session for production
    // if(!dev) {
    //     server.set('trust proxy', 1); // trust first proxy
    //     Object.assign(sess.cookie, {
    //         secure: true,
    //         httpOnly: true
    //     })
    // }
    server.use(session(sess), (req, res, next) => {
        if(!!req.session.user && !!req.session.authToken) {

        }
        next();
    });

    //Serve static
    server.use('/static', express.static(path.join(__dirname, '../', 'static')));

    /**
     * Router
     */
    // Account
    server.use("/account", account);
    // Inventory
    server.use("/inventory", (req, res, next) => {
        if(!req.session.user) {
            return res.redirect("/");
        }
        next();
    });
    // Route Handler
    server.get("*", (req, res, next) => {
        return app.render(req, res, req.url, {csrfToken: req.csrfToken()});
    });

    server = http.createServer(server);
    server.listen(process.env.PORT || 3000, () => {
        console.log(`🙌 👏 YOUR SERVER RUNNING AT PORT: ${process.env.PORT || 3000}`)
    })
}).catch(e => {
    console.log('Error - ', e.message);
});