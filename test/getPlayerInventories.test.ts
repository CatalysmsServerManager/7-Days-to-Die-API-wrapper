'use strict';
import g from './_globals';
import * as chai from 'chai';
import { getPlayerInventories } from '../lib/index';

describe('/api/getPlayerInventories', async () => {
    it('Returns expected info', async () => {
        const response = await getPlayerInventories(g.getTestServer());
        chai.expect(response).to.be.a('array');
    });
});