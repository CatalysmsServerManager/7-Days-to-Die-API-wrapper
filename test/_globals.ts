/* eslint-env mocha */
/*
 * Shareable items between tests
 */
import { URL } from 'url';
import * as querystring from 'querystring';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import TalkbackServer from 'talkback/server';
import { RecordMode } from 'talkback/options';
import Tape from 'talkback/tape';
import { Req } from 'talkback/types';
import { SdtdServer } from '../lib/index';

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
        const host = `http://${process.env.TESTIP || '78.46.203.193'}:${process.env.TESTPORT || '8082'}`;
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
                return url.pathname.replace(/\//g, '_') + '_' + querystring.stringify(query, '_', '_')  + ".json5";
            },
            requestDecorator: function(req: Req) {
                const url = new URL(req.url, host);
                const query = querystring.parse(url.search.substr(1));
                query.adminuser = process.env.TESTADMINUSER || 'unknown';
                query.admintoken = process.env.TESTADMINTOKEN || 'unknown';
                url.search = '?' + querystring.stringify(query);
                req.url = url.toString().replace(host, '');
                return req;
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
