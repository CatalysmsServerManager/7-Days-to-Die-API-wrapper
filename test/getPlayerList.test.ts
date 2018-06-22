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

describe('/api/getPlayerList', async () => {
    it('Returns command, parameters and result', async () => {
        let response = await SdtdApi.getPlayerList(testServer);
        expect(response.total).to.be.a('number');
        expect(response.totalUnfiltered).to.be.a('number');
        expect(response.firstResult).to.be.a('number');
        expect(response.players).to.be.a('array');
    });
    it('Limits response if rowsPerPage is given', async () => {
        let response = await SdtdApi.getPlayerList(testServer, 1);
        expect(response.players).to.be.a('array');
        expect(response.players).to.have.length(1);
    });
});