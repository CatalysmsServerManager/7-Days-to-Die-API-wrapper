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