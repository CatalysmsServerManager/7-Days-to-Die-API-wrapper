'use strict';
import g from './_globals';
import * as chai from 'chai';
import { getHostileLocation } from '../lib/index';

describe('/api/getHostileLocation', async () => {
    it('Returns an array of hostile info', async () => {
        const response = await getHostileLocation(g.getTestServer());
        chai.expect(response).to.be.an('array');
    });


    it('Contains expected information', async () => {
        const response = await getHostileLocation(g.getTestServer());
        if (response.length > 0) {
            const animal = response[0];
            chai.expect(animal.id).to.be.a('number');
            chai.expect(animal.name).to.be.a('string');
            chai.expect(animal.position.x).to.be.a('number');
            chai.expect(animal.position.y).to.be.a('number');
            chai.expect(animal.position.z).to.be.a('number');
        }
    });
});