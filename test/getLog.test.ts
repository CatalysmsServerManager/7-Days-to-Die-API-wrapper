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

describe('/api/getLog', async () => {
    it('Returns expected output', async () => {
        let response = await SdtdApi.getLog(testServer);
        expect(response.firstLine).to.be.a('number');
        expect(response.firstLine).to.be.eq(0);
        expect(response.lastLine).to.be.a('number');
        expect(response.lastLine).to.be.eq(50);
        expect(response.entries).to.be.a('array');
    });

    it('Cycles through logs when firstLine is given', async () => {
        let firstLine = 75
        let response = await SdtdApi.getLog(testServer, firstLine);
        expect(response.firstLine).to.eq(firstLine);
    });
});