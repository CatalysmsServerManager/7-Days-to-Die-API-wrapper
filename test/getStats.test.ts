'use strict';
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { SdtdServer } from '../lib/index'
let SdtdApi = require('../lib/index.js');

require('dotenv').config()

chai.use(chaiAsPromised)

let testServer: SdtdServer = {
    ip: process.env.TESTIP as String,
    port: process.env.TESTPORT as String,
    adminUser: process.env.TESTADMINUSER as String,
    adminToken: process.env.TESTADMINTOKEN as String
}

let badTestServer: SdtdServer = {
    ip: "Not an IP address",
    port: process.env.TESTPORT as String,
    adminUser: process.env.TESTADMINUSER as String,
    adminToken: process.env.TESTADMINTOKEN as String
}

describe('/api/getstats', async () => {
    it('Returns players info', async () => {
        let response = await SdtdApi.getStats(testServer);
        chai.expect(response.players).to.be.a('number');
    });

    it('Returns animals info', async () => {
        let response = await SdtdApi.getStats(testServer);
        chai.expect(response.animals).to.be.a('number');
    });

    it('Returns hostiles info', async () => {
        let response = await SdtdApi.getStats(testServer);
        chai.expect(response.hostiles).to.be.a('number');
    });

    it('Returns game time info', async () => {
        let response = await SdtdApi.getStats(testServer);
        chai.expect(response.gametime.days).to.be.a('number');
        chai.expect(response.gametime.hours).to.be.a('number');
        chai.expect(response.gametime.minutes).to.be.a('number');
    });
    it('Errors when incorrect server info is given', async () => {
        return chai.expect(SdtdApi.getStats(badTestServer)).to.be.rejectedWith(Error);
    });
});