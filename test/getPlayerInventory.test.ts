'use strict';
import * as chai from 'chai';

import { getPlayerInventory } from '../lib';
import g from './_globals';

describe('/api/getPlayerInventory', async () => {
    it('Returns a playername, bag, belt and equipment', async () => {
        const response = await getPlayerInventory(g.getTestServer(), process.env.TESTPLAYER as string);
        chai.expect(response.playername).to.be.a('string');
        chai.expect(response.steamid).to.be.a('string');
        chai.expect(response.steamid).to.not.contain('Steam_');
        chai.expect(response.bag).to.be.a('array');
        chai.expect(response.belt).to.be.a('array');
    });
});