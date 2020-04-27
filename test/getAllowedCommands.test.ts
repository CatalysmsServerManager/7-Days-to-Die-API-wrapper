'use strict';
import g from './_globals';
import * as chai from 'chai';
import { getAllowedCommands } from '../lib/index';

describe('/api/getAllowedCommands', async () => {
    it('Returns an array', async () => {
        const response = await getAllowedCommands(g.getTestServer());
        chai.expect(response.commands).to.be.a('array');
    });
});