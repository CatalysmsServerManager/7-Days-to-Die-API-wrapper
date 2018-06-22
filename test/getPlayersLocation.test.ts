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

describe('/api/getPlayersLocation', async () => {
    it('Returns an array', async () => {
        let response = await SdtdApi.getPlayersLocation(testServer);
        expect(response).to.be.a('array');
    });
    it('Returns an array with data if offline is set to true', async () => {
        let response = await SdtdApi.getPlayersLocation(testServer, true);
        expect(response).to.be.a('array');
        expect(response).to.have.length.greaterThan(1);
        expect(response[0].steamid).to.be.a("string");
        expect(response[0].name).to.be.a("string");
        expect(response[0].online).to.be.a("boolean");
    });
});