'use strict';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { getOnlinePlayers, SdtdServer } from '../lib/index';

require('dotenv').config();

chai.use(chaiAsPromised);

const testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
};

describe('/api/getOnlinePlayers', async () => {
    it('Returns an array of player info', async () => {
        const response = await getOnlinePlayers(testServer);
        chai.expect(response).to.be.an('array');
    });

    it('Contains identifying information for players', async () => {
        const response = await getOnlinePlayers(testServer);

        if (response.length > 0) {
            const playerStats = response[0];

            chai.expect(playerStats.steamid).to.be.a('string').and.to.be.not.empty;
            chai.expect(playerStats.name).to.be.a('string').and.to.be.not.empty;
            chai.expect(playerStats.entityid).to.be.a('number').and.to.be.not.equal(0);
        }
    });

    it('Contains location data', async () => {
        const response = await getOnlinePlayers(testServer);

        if (response.length > 0) {
            const playerStats = response[0];

            chai.expect(playerStats.position.x).to.be.a('number');
            chai.expect(playerStats.position.y).to.be.a('number');
            chai.expect(playerStats.position.z).to.be.a('number');
        }
    });

    it('Contains kills deaths score experience and level data', async () => {
        const response = await getOnlinePlayers(testServer);

        if (response.length > 0) {
            const playerStats = response[0];

            chai.expect(playerStats.experience).to.be.a('number');
            chai.expect(playerStats.level).to.be.a('number');
            chai.expect(playerStats.health).to.be.a('number');
            chai.expect(playerStats.stamina).to.be.a('number');
            chai.expect(playerStats.zombiekills).to.be.a('number');
            chai.expect(playerStats.playerkills).to.be.a('number');
            chai.expect(playerStats.playerdeaths).to.be.a('number');
            chai.expect(playerStats.score).to.be.a('number');
        }
    });
});