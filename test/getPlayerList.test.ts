'use strict';
import * as chai from 'chai';

import { getPlayerList } from '../lib';
import g from './_globals';

describe('/api/getPlayerList', async () => {
    it('Returns expected output', async () => {
        const response = await getPlayerList(g.getTestServer());
        chai.expect(response.total).to.be.a('number');
        chai.expect(response.totalUnfiltered).to.be.a('number');
        chai.expect(response.firstResult).to.be.a('number');
        chai.expect(response.players).to.be.a('array');
        chai.expect(response.players).to.have.lengthOf(response.total);
        chai.expect(response.players).to.have.lengthOf(1);

        for (const player of response.players) {
            chai.expect(player.name).to.be.a('string');
            chai.expect(player.steamid).to.be.a('string');
            chai.expect(player.steamid).to.not.contain('Steam_');
        }

    });
    it('Limits response if rowsPerPage is given', async () => {
        const response = await getPlayerList(g.getTestServer(), 1);
        chai.expect(response.players).to.be.a('array');
        chai.expect(response.players).to.have.length(1);
    });
});