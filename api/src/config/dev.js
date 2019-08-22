const creds = require("../../../credentials");

module.exports = {
    database: {
        uri: `mongodb://${creds.dbDevUsername}:${
            creds.dbDevPassword
        }@ds125146.mlab.com:25146/testmoonshot`
    }
};
