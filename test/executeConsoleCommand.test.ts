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

let badTestServer: SdtdServer = {
    ip: "Not an IP address",
    port: process.env.TESTPORT as String,
    adminUser: process.env.TESTADMINUSER as String,
    adminToken: process.env.TESTADMINTOKEN as String
}
describe('/api/executeconsolecommand', async () => {
    it('Returns command, parameters and result', async () => {
        let response = await SdtdApi.executeConsoleCommand(testServer, "help");
        chai.expect(response.command).to.be.a('string');
        chai.expect(response.parameters).to.be.a('string');
    });

    it('Executes a command correctly', async () => {
        let response = await SdtdApi.executeConsoleCommand(testServer, "help");
        chai.expect(response.command).to.eq('help')
        chai.expect(response.parameters).to.eq('');
        chai.expect(response.result).to.include("*** Generic Console Help ***")
    });

    it('Errors when incorrect server info is given', async () => {
        return chai.expect(SdtdApi.executeConsoleCommand(badTestServer)).to.be.rejectedWith(Error);
    });
});