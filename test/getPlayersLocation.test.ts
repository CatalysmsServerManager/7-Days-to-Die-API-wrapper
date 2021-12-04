'use strict';
import * as chai from 'chai';

import { getPlayersLocation } from '../lib';
import g from './_globals';


describe('/api/getPlayersLocation', async () => {
    it('Returns an array', async () => {
        const response = await getPlayersLocation(g.getTestServer(), false);
        chai.expect(response).to.be.a('array');
    });
    it('Returns an array with data if offline is set to true', async () => {
        const response = await getPlayersLocation(g.getTestServer(), true);
        chai.expect(response).to.be.a('array');
        chai.expect(response).to.have.length.greaterThan(0);

        for (const player of response) {
            chai.expect(player.steamid).to.be.a("string");
            chai.expect(player.steamid).to.not.contain('Steam_');
            chai.expect(player.userid).to.be.a("string");
            chai.expect(player.name).to.be.a("string");
            chai.expect(player.online).to.be.a("boolean");
        }
    });
});