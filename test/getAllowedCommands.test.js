'use strict';
let expect = require('chai').expect;
let SdtdApi = require('../dist/index.js');
require('dotenv').config()

let testServer = {
    ip: process.env.TESTIP,
    port: process.env.TESTPORT,
    adminUser: process.env.TESTADMINUSER,
    adminToken: process.env.TESTADMINTOKEN
}

describe('/api/getAllowedCommands', async () => {
    it('Returns an array', async () => {
        let response = await SdtdApi.getAllowedCommands(testServer);
        expect(response.commands).to.be.a('array');
    });

});