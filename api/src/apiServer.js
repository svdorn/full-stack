const express = require("express");
// const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const credentials = require("../../credentials");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const prerenderNode = require("prerender-node");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");

var api = express();

// make sure headers are set securely
api.use(helmet());
api.use(helmet.hidePoweredBy({ setTo: "NotYoBeeswax" }));

if (process.env.NODE_ENV !== "test") {
    api.use(logger("dev"));
}

api.use(fileUpload());
api.use(bodyParser.json({ limit: "1mb" }));
api.use(bodyParser.urlencoded({ extended: false }));

var prerender = prerenderNode.set("prerenderToken", "LYjJ7i8UHyhooHVMA3bB");
prerender.crawlerUserAgents.push("googlebot");
prerender.crawlerUserAgents.push("bingbot");
prerender.crawlerUserAgents.push("yandex");
api.use(prerender);

// trust the first proxy encountered because we run through a proxy
api.set("trust proxy", 1);

// set up the database by requiring it
const db = require("./utils/db");

const { devMode } = require("./utils/general");

// set up the session
const sevenDaysInSeconds = 7 * 24 * 60 * 60;
api.use(
    session({
        secret: credentials.secretString,
        resave: true, // saves session even if un-modified
        saveUninitialized: true, // saves a session if it is new but not modified
        unset: "destroy", // delete the session when set to null or req.session.destroy() used
        rolling: true, // resets maxAge on session when user uses site again
        proxy: true, // must be true since we are using a reverse proxy
        cookie: {
            maxAge: 1000 * sevenDaysInSeconds, // 7 days in milliseconds
            secure: !devMode, // only make the cookie if accessing via https
            httpOnly: true, // cookie can only be sent over http(s), not client js
            domain: process.env.SITE_NAME, // moonshotinsights.io or frizzkitten.com or localhost:8081
            path: "/" // only allow access to cookie if it's on the right domain and path
        },
        store: new MongoStore({ mongooseConnection: db, ttl: sevenDaysInSeconds })
    })
);

const compression = require("compression");
api.use(compression());

// make self activating functions/cron jobs run
require("./cron/runner");

// set up all the api endpoints
fs.readdirSync(path.join(__dirname, "routes")).forEach(fileName => {
    require(`./routes/${fileName}`)(api);
});

api.listen(3001, error => {
    if (error) return console.log(error);
});

module.exports = api;
