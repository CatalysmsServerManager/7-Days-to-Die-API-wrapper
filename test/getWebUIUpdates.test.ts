'use strict';
import g from './_globals';
import * as chai from 'chai';
import { getWebUIUpdates } from '../lib/index';

describe('/api/getWebUIUpdates', async () => {
    it('Returns expected output', async () => {
        const response = await getWebUIUpdates(g.getTestServer());
        chai.expect(response.gametime.days).to.be.a('number');
        chai.expect(response.gametime.hours).to.be.a('number');
        chai.expect(response.gametime.minutes).to.be.a('number');

        chai.expect(response.players).to.be.a('number');
        chai.expect(response.hostiles).to.be.a('number');
        chai.expect(response.animals).to.be.a('number');
        chai.expect(response.newlogs).to.be.a('number');
    });
    it('Limits newlogs response if latestLine is given', async () => {
        const logsOffset = 75;
        const firstResponse = await getWebUIUpdates(g.getTestServer());
        const newlogs = firstResponse.newlogs;

        const secondResponse = await getWebUIUpdates(g.getTestServer(), newlogs - logsOffset);

        chai.expect(secondResponse.newlogs).to.eq(logsOffset);
    });
});