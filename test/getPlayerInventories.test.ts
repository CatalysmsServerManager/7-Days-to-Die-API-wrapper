'use strict';
import * as chai from 'chai';

import { getPlayerInventories } from '../lib';
import g from './_globals';

describe('/api/getPlayerInventories', async () => {
    it('Returns expected info', async () => {
        const response = await getPlayerInventories(g.getTestServer());
        chai.expect(response).to.be.a('array');
        chai.expect(response).to.have.length(1);

        for (const player of response) {
            chai.expect(player.playername).to.be.a('string');
            chai.expect(player.steamid).to.be.a('string');
            chai.expect(player.steamid).to.not.contain('Steam_');
            chai.expect(player.bag).to.be.a('array');
            chai.expect(player.belt).to.be.a('array');
        }


    });
});