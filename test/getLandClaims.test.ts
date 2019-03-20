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

describe('/api/getLandClaims', async () => {
    it('Returns an array of animal info', async () => {
        let response = await SdtdApi.getLandClaims(testServer);
        chai.expect(response.claimowners).to.be.a('array');
        chai.expect(response.claimsize).to.be.a('number');
    });
});