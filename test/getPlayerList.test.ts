'use strict';
import g from './_globals';
import * as chai from 'chai';
import { getPlayerList } from '../lib/index';

describe('/api/getPlayerList', async () => {
    it('Returns expected output', async () => {
        const response = await getPlayerList(g.getTestServer());
        chai.expect(response.total).to.be.a('number');
        chai.expect(response.totalUnfiltered).to.be.a('number');
        chai.expect(response.firstResult).to.be.a('number');
        chai.expect(response.players).to.be.a('array');
    });
    it('Limits response if rowsPerPage is given', async () => {
        const response = await getPlayerList(g.getTestServer(), 1);
        chai.expect(response.players).to.be.a('array');
        chai.expect(response.players).to.have.length(1);
    });
});