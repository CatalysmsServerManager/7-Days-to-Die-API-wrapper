'use strict';
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { SdtdServer } from '../lib/index'
let SdtdApi = require('../lib/index.js');

require('dotenv').config()

chai.use(chaiAsPromised)

let testServer: SdtdServer = {
    ip: process.env.TESTIP as String,
    port: process.env.TESTPORT as String,
    adminUser: process.env.TESTADMINUSER as String,
    adminToken: process.env.TESTADMINTOKEN as String
}
describe('/api/getPlayerInventory', async () => {
    it('Returns a playername, bag, belt and equipment', async () => {
        let response = await SdtdApi.getPlayerInventory(testServer, process.env.TESTPLAYER);
        chai.expect(response.playername).to.be.a('string');
        chai.expect(response.bag).to.be.a('array');
        chai.expect(response.belt).to.be.a('array');
    });
});