'use strict';
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { getBaseUrl, SdtdServer } from '../lib/index'

chai.use(chaiAsPromised)

let testServer: SdtdServer = {
    ip: process.env.TESTIP as string,
    port: process.env.TESTPORT as string,
    adminUser: process.env.TESTADMINUSER as string,
    adminToken: process.env.TESTADMINTOKEN as string
}

describe('getBaseUrl', async () => {
    it('standard returns http', async () => {
        chai.expect(
            getBaseUrl({ ip: '192.168.1.1', port: '5432', adminUser: 'foo', adminToken: 'bar' })
        ).to.eql('http://192.168.1.1:5432');
    });
    it('standard but port 443 returns https', async () => {
        chai.expect(
            getBaseUrl({ ip: '192.168.1.1', port: '443', adminUser: 'foo', adminToken: 'bar' })
        ).to.eql('https://192.168.1.1:443');
    });
    it('forced true returns https', async () => {
        chai.expect(
            getBaseUrl({ ip: '192.168.1.1', port: '5432', adminUser: 'foo', adminToken: 'bar', forceHttps: true })
        ).to.eql('https://192.168.1.1:5432');
    });
    it('forced false returns http', async () => {
        chai.expect(
            getBaseUrl({ ip: '192.168.1.1', port: '5432', adminUser: 'foo', adminToken: 'bar', forceHttps: false })
        ).to.eql('http://192.168.1.1:5432');
    });
});