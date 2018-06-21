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

describe('/api/getstats', async () => {
    it('Returns players info', async () => {
        let response = await SdtdApi.getStats(testServer);
        expect(response.players).to.be.a('number');
    });

    it('Returns animals info', async () => {
        let response = await SdtdApi.getStats(testServer);
        expect(response.animals).to.be.a('number');
    });

    it('Returns hostiles info', async () => {
        let response = await SdtdApi.getStats(testServer);
        expect(response.hostiles).to.be.a('number');
    });

    it('Returns game time info', async () => {
        let response = await SdtdApi.getStats(testServer);
        expect(response.gametime.days).to.be.a('number');
        expect(response.gametime.hours).to.be.a('number');
        expect(response.gametime.minutes).to.be.a('number');
    });
});