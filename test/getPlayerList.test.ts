'use strict';
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { getPlayerList, SdtdServer } from '../lib/index'

require('dotenv').config()

chai.use(chaiAsPromised)

const testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
}
describe('/api/getPlayerList', async () => {
    it('Returns expected output', async () => {
        const response = await getPlayerList(testServer);
        chai.expect(response.total).to.be.a('number');
        chai.expect(response.totalUnfiltered).to.be.a('number');
        chai.expect(response.firstResult).to.be.a('number');
        chai.expect(response.players).to.be.a('array');
    });
    it('Limits response if rowsPerPage is given', async () => {
        const response = await getPlayerList(testServer, 1);
        chai.expect(response.players).to.be.a('array');
        chai.expect(response.players).to.have.length(1);
    });
});