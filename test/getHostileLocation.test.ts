'use strict';
import { expect } from 'chai'
import { SdtdServer } from '../lib/index';
let SdtdApi = require('../lib/index.js');

require('dotenv').config()

let testServer: SdtdServer = {
    ip: process.env.TESTIP as String,
    port: process.env.TESTPORT as String,
    adminUser: process.env.TESTADMINUSER as String,
    adminToken: process.env.TESTADMINTOKEN as String
}

describe('/api/getHostileLocation', async () => {
    it('Returns an array of hostile info', async () => {
        let response = await SdtdApi.getHostileLocation(testServer);
        expect(response).to.be.an('array');
    });


    it('Contains expected information', async () => {
        let response = await SdtdApi.getHostileLocation(testServer);
        if (response.length > 0) {
            let animal = response[0];
            expect(animal.id).to.be.a('number');
            expect(animal.name).to.be.a('string');
            expect(animal.position.x).to.be.a('number');
            expect(animal.position.y).to.be.a('number');
            expect(animal.position.z).to.be.a('number');
        }
    });

});