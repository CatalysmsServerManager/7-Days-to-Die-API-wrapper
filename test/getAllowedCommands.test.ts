'use strict';
import { expect } from 'chai'
import { SdtdServer } from '../lib/index'
let SdtdApi = require('../dist/lib/index.js');
require('dotenv').config()

let testServer: SdtdServer = {
    ip: process.env.TESTIP as String,
    port: process.env.TESTPORT as String,
    adminUser: process.env.TESTADMINUSER as String,
    adminToken: process.env.TESTADMINTOKEN as String
}

describe('/api/getAllowedCommands', async () => {
    it('Returns an array', async () => {
        let response = await SdtdApi.getAllowedCommands(testServer);
        expect(response.commands).to.be.a('array');
    });

});