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

describe('/api/getLandClaims', async () => {
    it('Returns an array of animal info', async () => {
        let response = await SdtdApi.getLandClaims(testServer);
        expect(response.claimowners).to.be.a('array');
        expect(response.claimsize).to.be.a('number');
    });

});