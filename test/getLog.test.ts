'use strict';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { getWebUIUpdates, getLog, SdtdServer } from '../lib/index';

require('dotenv').config();

chai.use(chaiAsPromised);

const testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
};

describe('/api/getLog', async () => {
    it('Returns expected output', async () => {
        const response = await getLog(testServer);
        chai.expect(response.firstLine).to.be.a('number');
        chai.expect(response.lastLine).to.be.a('number');
        chai.expect(response.entries).to.be.a('array');
    });

    // Obsolete to test this in here
    // This is a test to see if allocs is working properly, we should assume it does
    xit('Cycles through logs when firstLine is given', async () => {
        const webUiUpdates = await getWebUIUpdates(testServer);
        const firstLine = webUiUpdates.newlogs - 75;
        const response = await getLog(testServer, firstLine);
        chai.expect(response.firstLine).to.eq(firstLine);
    });

    xit('Supports the count parameter', async () => {
        const webUiUpdates = await getWebUIUpdates(testServer);
        const count = 100;
        const firstLine = webUiUpdates.newlogs - (count + 20);

        const response = await getLog(testServer, firstLine, count);
        chai.expect(response.entries).to.have.lengthOf(count);
    });
});