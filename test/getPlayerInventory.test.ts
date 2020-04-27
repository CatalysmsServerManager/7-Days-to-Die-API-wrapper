'use strict';
import g from './_globals';
import * as chai from 'chai';
import { getPlayerInventory } from '../lib/index';

describe('/api/getPlayerInventory', async () => {
    it('Returns a playername, bag, belt and equipment', async () => {
        const response = await getPlayerInventory(g.getTestServer(), process.env.TESTPLAYER as string);
        chai.expect(response.playername).to.be.a('string');
        chai.expect(response.bag).to.be.a('array');
        chai.expect(response.belt).to.be.a('array');
    });
});