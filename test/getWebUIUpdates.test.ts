'use strict';
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { SdtdServer } from '../lib/index'
let SdtdApi = require('../lib/index.js');

require('dotenv').config()

chai.use(chaiAsPromised)

let testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
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
});