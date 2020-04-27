'use strict';
import g from './_globals';
import * as chai from 'chai';
import { getPlayersLocation } from '../lib/index';


describe('/api/getPlayersLocation', async () => {
    it('Returns an array', async () => {
        const response = await getPlayersLocation(g.getTestServer(), false);
        chai.expect(response).to.be.a('array');
    });
    it('Returns an array with data if offline is set to true', async () => {
        const response = await getPlayersLocation(g.getTestServer(), true);
        chai.expect(response).to.be.a('array');
        chai.expect(response).to.have.length.greaterThan(0);
        chai.expect(response[0].steamid).to.be.a("string");
        chai.expect(response[0].name).to.be.a("string");
        chai.expect(response[0].online).to.be.a("boolean");
    });
});