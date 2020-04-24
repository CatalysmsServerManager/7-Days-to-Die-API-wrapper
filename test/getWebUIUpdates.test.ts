'use strict';
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { getWebUIUpdates, SdtdServer } from '../lib/index'

require('dotenv').config()

chai.use(chaiAsPromised)

const testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
}

describe('/api/getWebUIUpdates', async () => {
    it('Returns expected output', async () => {
        const response = await getWebUIUpdates(testServer);
        chai.expect(response.gametime.days).to.be.a('number');
        chai.expect(response.gametime.hours).to.be.a('number');
        chai.expect(response.gametime.minutes).to.be.a('number');

        chai.expect(response.players).to.be.a('number');
        chai.expect(response.hostiles).to.be.a('number');
        chai.expect(response.animals).to.be.a('number');
        chai.expect(response.newlogs).to.be.a('number');
    });
    it('Limits newlogs response if latestLine is given', async () => {
        const logsOffset = 75
        const firstResponse = await getWebUIUpdates(testServer);
        const newlogs = firstResponse.newlogs;

        const secondResponse = await getWebUIUpdates(testServer, newlogs - logsOffset);

        chai.expect(secondResponse.newlogs).to.eq(logsOffset);
    });
});