'use strict';
import { expect } from 'chai'
import { SdtdServer } from '../lib/index';
let SdtdApi = require('../dist/lib/index.js');

require('dotenv').config()

let testServer: SdtdServer = {
    ip: process.env.TESTIP as String,
    port: process.env.TESTPORT as String,
    adminUser: process.env.TESTADMINUSER as String,
    adminToken: process.env.TESTADMINTOKEN as String
}

describe('/api/executeconsolecommand', async () => {
    it('Returns command, parameters and result', async () => {
        let response = await SdtdApi.executeConsoleCommand(testServer, "help");
        expect(response.command).to.be.a('string');
        expect(response.parameters).to.be.a('string');
    });

});