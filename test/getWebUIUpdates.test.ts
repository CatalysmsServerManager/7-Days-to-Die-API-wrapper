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

describe('/api/getWebUIUpdates', async () => {
    it('Returns expected output', async () => {
        let response = await SdtdApi.getWebUIUpdates(testServer);
        expect(response.gametime.days).to.be.a('number');
        expect(response.gametime.hours).to.be.a('number');
        expect(response.gametime.minutes).to.be.a('number');

        expect(response.players).to.be.a('number');
        expect(response.hostiles).to.be.a('number');
        expect(response.animals).to.be.a('number');
        expect(response.newlogs).to.be.a('number');
    });
    it('Limits newlogs response if latestLine is given', async () => {
        let logsOffset = 75
        let firstResponse = await SdtdApi.getWebUIUpdates(testServer);
        let newlogs = firstResponse.newlogs;

        let secondResponse = await SdtdApi.getWebUIUpdates(testServer, newlogs - logsOffset);

        expect(secondResponse.newlogs).to.eq(logsOffset);
    });
});