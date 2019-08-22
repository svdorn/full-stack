const mongoose = require("mongoose");
const config = require("../../config");
const chalk = require("chalk");
const success = chalk.cyan;
const error = chalk.red;

// options for db connection
const dbOptions = { useNewUrlParser: true };
// connect to mLab
mongoose.connect(config.database.uri, dbOptions);

var db = mongoose.connection;
db.on("connected", () => console.log(success("Connected to MongoDB.")));
db.on("error", e => console.log(error("MongoDB connection error: "), e));

module.exports = db;
