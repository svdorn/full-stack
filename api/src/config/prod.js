const creds = require("../../../credentials");

module.exports = {
    database: {
        uri: `mongodb://${creds.dbUsername}:${
            creds.dbPassword
        }@ds141159-a0.mlab.com:41159,ds141159-a1.mlab.com:41159/moonshot?replicaSet=rs-ds141159`
    }
};
