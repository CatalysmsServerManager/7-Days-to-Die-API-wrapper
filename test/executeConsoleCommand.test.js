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

describe('/api/executeconsolecommand', async () => {
    it('Returns command, parameters and result', async () => {
        let response = await SdtdApi.executeConsoleCommand(testServer, "help");
        expect(response.command).to.be.a('string');
        expect(response.parameters).to.be.a('string');
    });

});