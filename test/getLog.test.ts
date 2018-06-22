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


describe('/api/getLog', async () => {
    it('Returns expected output', async () => {
        let response = await SdtdApi.getLog(testServer);
        chai.expect(response.firstLine).to.be.a('number');
        chai.expect(response.firstLine).to.be.eq(0);
        chai.expect(response.lastLine).to.be.a('number');
        chai.expect(response.lastLine).to.be.eq(50);
        chai.expect(response.entries).to.be.a('array');
    });

    it('Cycles through logs when firstLine is given', async () => {
        let firstLine = 75
        let response = await SdtdApi.getLog(testServer, firstLine);
        chai.expect(response.firstLine).to.eq(firstLine);
    });
    it('Errors when incorrect server info is given', async () => {
        return chai.expect(SdtdApi.getLog(badTestServer)).to.be.rejectedWith(Error);
    });
});