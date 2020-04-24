'use strict';
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { getStats, SdtdServer } from '../lib/index'

require('dotenv').config()

chai.use(chaiAsPromised)

const testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
}

describe('/api/getstats', async () => {
    it('Returns expected info', async () => {
        const response = await getStats(testServer);
        chai.expect(response.players).to.be.a('number');
        chai.expect(response.animals).to.be.a('number');
        chai.expect(response.hostiles).to.be.a('number');
        chai.expect(response.gametime.days).to.be.a('number');
        chai.expect(response.gametime.hours).to.be.a('number');
        chai.expect(response.gametime.minutes).to.be.a('number');
    });

    it('Accepts extra options', async () => {
        // If 7d2d server runs on same machine as you are running tests, this 1 ms timeout is sometimes not enough.
        await chai.expect(getStats(testServer, { timeout: 1 })).to.be.rejectedWith(Error)
    });
});