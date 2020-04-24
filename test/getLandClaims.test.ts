'use strict';
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { SdtdServer } from '../lib/index'
let SdtdApi = require('../lib/index');

require('dotenv').config()

chai.use(chaiAsPromised)

let testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
}

describe('/api/getLandClaims', async () => {
    it('Returns an array of animal info', async () => {
        let response = await SdtdApi.getLandClaims(testServer);
        chai.expect(response.claimowners).to.be.a('array');
        chai.expect(response.claimsize).to.be.a('number');
    });
});