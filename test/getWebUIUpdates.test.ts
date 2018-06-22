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

describe('/api/getWebUIUpdates', async () => {
    it('Returns expected output', async () => {
        let response = await SdtdApi.getWebUIUpdates(testServer);
        chai.expect(response.gametime.days).to.be.a('number');
        chai.expect(response.gametime.hours).to.be.a('number');
        chai.expect(response.gametime.minutes).to.be.a('number');

        chai.expect(response.players).to.be.a('number');
        chai.expect(response.hostiles).to.be.a('number');
        chai.expect(response.animals).to.be.a('number');
        chai.expect(response.newlogs).to.be.a('number');
    });
    it('Limits newlogs response if latestLine is given', async () => {
        let logsOffset = 75
        let firstResponse = await SdtdApi.getWebUIUpdates(testServer);
        let newlogs = firstResponse.newlogs;

        let secondResponse = await SdtdApi.getWebUIUpdates(testServer, newlogs - logsOffset);

        chai.expect(secondResponse.newlogs).to.eq(logsOffset);
    });
    it('Errors when incorrect server info is given', async () => {
        return chai.expect(SdtdApi.getWebUIUpdates(badTestServer)).to.be.rejectedWith(Error);
    });
});