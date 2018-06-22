'use strict';
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { SdtdServer } from '../lib/index'
let SdtdApi = require('../lib/index.js');

require('dotenv').config()

chai.use(chaiAsPromised)

let testServer: SdtdServer = {
    ip: process.env.TESTIP as String,
    port: process.env.TESTPORT as String,
    adminUser: process.env.TESTADMINUSER as String,
    adminToken: process.env.TESTADMINTOKEN as String
}

let badTestServer: SdtdServer = {
    ip: "Not an IP address",
    port: process.env.TESTPORT as String,
    adminUser: process.env.TESTADMINUSER as String,
    adminToken: process.env.TESTADMINTOKEN as String
}

describe('/api/getAnimalsLocation', async () => {
    it('Returns an array of animal info', async () => {
        let response = await SdtdApi.getAnimalsLocation(testServer);
        chai.expect(response).to.be.an('array');
    });


    it('Contains expected information', async () => {
        let response = await SdtdApi.getAnimalsLocation(testServer);
        if (response.length > 0) {
            let animal = response[0];
            chai.expect(animal.id).to.be.a('number');
            chai.expect(animal.name).to.be.a('string');
            chai.expect(animal.position.x).to.be.a('number');
            chai.expect(animal.position.y).to.be.a('number');
            chai.expect(animal.position.z).to.be.a('number');
        }
    });
    it('Errors when incorrect server info is given', async () => {
        return chai.expect(SdtdApi.getAnimalsLocation(badTestServer)).to.be.rejectedWith(Error);
    });

});