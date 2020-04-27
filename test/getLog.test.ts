'use strict';
import g from './_globals';
import * as chai from 'chai';
import { getWebUIUpdates, getLog } from '../lib/index';

describe('/api/getLog', async () => {
    it('Returns expected output', async () => {
        const response = await getLog(g.getTestServer());
        chai.expect(response.firstLine).to.be.a('number');
        chai.expect(response.lastLine).to.be.a('number');
        chai.expect(response.entries).to.be.a('array');
    });

    // Obsolete to test this in here
    // This is a test to see if allocs is working properly, we should assume it does
    xit('Cycles through logs when firstLine is given', async () => {
        const webUiUpdates = await getWebUIUpdates(g.getTestServer());
        const firstLine = webUiUpdates.newlogs - 75;
        const response = await getLog(g.getTestServer(), firstLine);
        chai.expect(response.firstLine).to.eq(firstLine);
    });

    xit('Supports the count parameter', async () => {
        const webUiUpdates = await getWebUIUpdates(g.getTestServer());
        const count = 100;
        const firstLine = webUiUpdates.newlogs - (count + 20);

        const response = await getLog(g.getTestServer(), firstLine, count);
        chai.expect(response.entries).to.have.lengthOf(count);
    });
});