const config = require("../src/config");
const db = require("../src/utils/db");

// erases all the data from the databse
async function dropDBs() {
    // ensure we are connected to the test database
    if (config.environment !== "test") throw new Error("CANNOT DROP DB FROM NON-TEST ENVIRONMENT");

    await db.dropDatabase();
}

// create database objects
async function loadFixtures(...fixtures) {
    let promises = [];
    // go through each type of object that should be created
    fixtures.forEach(fixture => {
        // get the file that has all the objects that will be created
        const fixtureInfo = require(`./fixtures/${fixture.type}`);
        // get the model that will be used (Businesses, Users, etc)
        const Model = require(`../src/models/${fixtureInfo.model}`);
        // create each of the wanted objects
        fixture.objects.forEach(objName => {
            const objectToCreate = fixtureInfo[objName];
            if (objectToCreate) promises.push(Model.create(objectToCreate));
            else throw new Error(`Invalid fixture name "${objName}" for type "${fixture.type}"`);
        });
    });
    // wait for all the objects to be created
    await Promise.all(promises);
}

module.exports = {
    dropDBs,
    loadFixtures
};
