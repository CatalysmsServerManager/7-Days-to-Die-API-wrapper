'use strict';
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { getLandClaims, SdtdServer } from '../lib/index'

require('dotenv').config()

chai.use(chaiAsPromised)

const testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
}

describe('/api/getLandClaims', async () => {
    it('Returns an array of animal info', async () => {
        const response = await getLandClaims(testServer);
        chai.expect(response.claimowners).to.be.a('array');
        chai.expect(response.claimsize).to.be.a('number');
    });
});