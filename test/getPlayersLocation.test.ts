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

describe('/api/getPlayersLocation', async () => {
    it('Returns an array', async () => {
        let response = await SdtdApi.getPlayersLocation(testServer);
        chai.expect(response).to.be.a('array');
    });
    it('Returns an array with data if offline is set to true', async () => {
        let response = await SdtdApi.getPlayersLocation(testServer, true);
        chai.expect(response).to.be.a('array');
        chai.expect(response).to.have.length.greaterThan(1);
        chai.expect(response[0].steamid).to.be.a("string");
        chai.expect(response[0].name).to.be.a("string");
        chai.expect(response[0].online).to.be.a("boolean");
    });
    it('Errors when incorrect server info is given', async () => {
        return chai.expect(SdtdApi.getPlayersLocation(badTestServer)).to.be.rejectedWith(Error);
    });
});