const configNames = {
    development: "dev",
    production: "prod",
    test: "test"
};
const environment = process.env.NODE_ENV || "development";
const configName = configNames[environment];

const environmentIndependentConfig = {};

const config = require(`./${configName}`);
console.log(`Loading environment: ${environment}`);
module.exports = { ...config, ...environmentIndependentConfig, environment };
