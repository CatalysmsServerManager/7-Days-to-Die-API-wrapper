'use strict';
import './_globals';
import * as chai from 'chai';
import { getBaseUrl } from '../lib/index';

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