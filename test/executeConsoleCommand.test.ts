'use strict';
import g from './_globals';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { executeConsoleCommand } from '../lib/index';
import { fail } from 'assert';

require('dotenv').config();

chai.use(chaiAsPromised);

describe('/api/executeconsolecommand', async () => {
    it('Returns command, parameters and result', async () => {
        const response = await executeConsoleCommand(g.getTestServer(), "help");
        chai.expect(response.command).to.be.a('string');
        chai.expect(response.parameters).to.be.a('string');
    });

    it('Executes a command correctly', async () => {
        const response = await executeConsoleCommand(g.getTestServer(), "help");
        chai.expect(response.command).to.eq('help');
        chai.expect(response.parameters).to.eq('');
        chai.expect(response.result).to.include("*** Generic Console Help ***");
    });
    it('Executes a an unknown command - foobar', async () => {
        try {
            await executeConsoleCommand(g.getTestServer(), "foobar");
            fail('should have failed');
        } catch (e) {
            chai.expect(e).to.be.a('error');
        }
    });
});