/* eslint-env mocha */
/*
 * Shareable items between tests
 */
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as querystring from 'querystring';
import { RecordMode } from 'talkback/options';
import TalkbackServer from 'talkback/server';
import Tape from 'talkback/tape';
import { Req } from 'talkback/types';
import { URL } from 'url';

import { getBaseUrl, SdtdServer } from '../lib';

// talkback's typescript/import returns different stuff than the require, so disable the eslint alert for now
//eslint-disable-next-line @typescript-eslint/no-var-requires
const talkback = require('talkback');

class TestGlobals {
    testServer: SdtdServer;
    proxy: TalkbackServer;

    constructor() {
        this.testServer = {
            ip: "localhost",
            port: "5544",
            adminUser: 'fakeadminuser',
            adminToken: 'fakeadmintoken'
        };
        const host = getBaseUrl({
            ip: process.env.TESTIP || '7d2d.csmm.app',
            port: process.env.TESTPORT || '443',
            adminUser: '',
            adminToken: ''
        });
        this.proxy = talkback({
            host: host,
            record: RecordMode.NEW,
            port: 5544,
            path: `${__dirname}/tapes/`,
            silent: true,
            ignoreQueryParams: ['adminuser', 'admintoken'],
            tapeNameGenerator: (tapeNumber: number, tape: Tape): string => {
                const url = new URL(tape.req.url, host);
                const query = querystring.parse(url.search.substr(1));
                delete query.adminuser;
                delete query.admintoken;
                return url.pathname.replace(/\//g, '_') + '_' + querystring.stringify(query, '_', '_') + tapeNumber  + ".json5";
            },
            requestDecorator: function(req: Req) {
                const url = new URL(req.url, host);
                const query = querystring.parse(url.search.substr(1));
                query.adminuser = process.env.TESTADMINUSER || 'unknown';
                query.admintoken = process.env.TESTADMINTOKEN || 'unknown';
                url.search = '?' + querystring.stringify(query);
                req.url = url.toString().replace(host, '');
                return req;
            },
            tapeDecorator: function tapeDecorator(tape: Tape) {
                if (tape.req.headers['x-unit-test-comment'] === 'timeout') {
                    tape.meta.latency = 5000;
                }
                return tape;
              }
        });
    }

    setTestServer(testServer: SdtdServer): void {
        this.testServer = testServer;
    }
    getTestServer(): SdtdServer {
        return this.testServer;
    }
    setProxy(proxy: TalkbackServer): void {
        this.proxy = proxy;
    }
    getProxy(): TalkbackServer {
        return this.proxy;
    }
}

const testGlobals = new TestGlobals();
export default testGlobals;

require('dotenv').config();

chai.use(chaiAsPromised);

before(function(done) {
    testGlobals.getProxy().start(() => done());
});
after(function() {
    testGlobals.getProxy().close();
});
