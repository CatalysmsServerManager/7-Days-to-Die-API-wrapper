'use strict';
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import * as SdtdApi from '../lib/index'

require('dotenv').config()

chai.use(chaiAsPromised)

const testServer: SdtdApi.SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
}

describe('/api/getPlayersLocation', async () => {
    it('Returns an array', async () => {
        const response = await SdtdApi.getPlayersLocation(testServer, false);
        chai.expect(response).to.be.a('array');
    });
    it('Returns an array with data if offline is set to true', async () => {
        const response = await SdtdApi.getPlayersLocation(testServer, true);
        chai.expect(response).to.be.a('array');
        chai.expect(response).to.have.length.greaterThan(0);
        chai.expect(response[0].steamid).to.be.a("string");
        chai.expect(response[0].name).to.be.a("string");
        chai.expect(response[0].online).to.be.a("boolean");
    });
});