'use strict';
import g from './_globals';
import * as chai from 'chai';
import { getLandClaims } from '../lib/index';

describe('/api/getLandClaims', async () => {
    it('Returns an array of animal info', async () => {
        const response = await getLandClaims(g.getTestServer());
        chai.expect(response.claimowners).to.be.a('array');
        chai.expect(response.claimsize).to.be.a('number');
    });
});