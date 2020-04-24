'use strict';
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { SdtdServer } from '../lib/index'
let SdtdApi = require('../lib/index');

require('dotenv').config()

chai.use(chaiAsPromised)

let testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
}

describe('/api/getHostileLocation', async () => {
    it('Returns an array of hostile info', async () => {
        let response = await SdtdApi.getHostileLocation(testServer);
        chai.expect(response).to.be.an('array');
    });


    it('Contains expected information', async () => {
        let response = await SdtdApi.getHostileLocation(testServer);
        if (response.length > 0) {
            let animal = response[0];
            chai.expect(animal.id).to.be.a('number');
            chai.expect(animal.name).to.be.a('string');
            chai.expect(animal.position.x).to.be.a('number');
            chai.expect(animal.position.y).to.be.a('number');
            chai.expect(animal.position.z).to.be.a('number');
        }
    });
});