'use strict';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { executeConsoleCommand, SdtdServer } from '../lib/index';
import { fail } from 'assert';

require('dotenv').config();

chai.use(chaiAsPromised);

const testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
};

describe('/api/executeconsolecommand', async () => {
    it('Returns command, parameters and result', async () => {
        const response = await executeConsoleCommand(testServer, "help");
        chai.expect(response.command).to.be.a('string');
        chai.expect(response.parameters).to.be.a('string');
    });

    it('Executes a command correctly', async () => {
        const response = await executeConsoleCommand(testServer, "help");
        chai.expect(response.command).to.eq('help');
        chai.expect(response.parameters).to.eq('');
        chai.expect(response.result).to.include("*** Generic Console Help ***");
    });
    it('Executes a an unknown command - foobar', async () => {
        try {
            await executeConsoleCommand(testServer, "foobar");
            fail('should have failed');
        } catch (e) {
            chai.expect(e).to.be.a('error');
        }
    });
});