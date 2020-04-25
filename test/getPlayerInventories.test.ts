'use strict';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { getPlayerInventories, SdtdServer } from '../lib/index';

require('dotenv').config();

chai.use(chaiAsPromised);

const testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
};

describe('/api/getPlayerInventories', async () => {
    it('Returns expected info', async () => {
        const response = await getPlayerInventories(testServer);
        chai.expect(response).to.be.a('array');
    });
});