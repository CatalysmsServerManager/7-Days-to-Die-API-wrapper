'use strict';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { getAllowedCommands, SdtdServer } from '../lib/index';

require('dotenv').config();

chai.use(chaiAsPromised);

const testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
};

describe('/api/getAllowedCommands', async () => {
    it('Returns an array', async () => {
        const response = await getAllowedCommands(testServer);
        chai.expect(response.commands).to.be.a('array');
    });
});