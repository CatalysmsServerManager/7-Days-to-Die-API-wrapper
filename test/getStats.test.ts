"use strict";
import * as chai from 'chai';
import { expect } from 'chai';

import { getStats } from '../lib';
import g from './_globals';

describe("/api/getstats", async () => {
    it("Returns expected info", async () => {
        const response = await getStats(g.getTestServer());
        chai.expect(response.players).to.be.a("number");
        chai.expect(response.animals).to.be.a("number");
        chai.expect(response.hostiles).to.be.a("number");
        chai.expect(response.gametime.days).to.be.a("number");
        chai.expect(response.gametime.hours).to.be.a("number");
        chai.expect(response.gametime.minutes).to.be.a("number");
    });

    xit("Accepts extra options", async () => {
        // If 7d2d server runs on same machine as you are running tests, this 1 ms timeout is sometimes not enough.
        await chai
            .expect(getStats(g.getTestServer(), { timeout: 1 }))
            .to.be.rejectedWith(Error);
    });

    xit("Errors when request timeouts", async function () {
        this.timeout(10000);
        await expect(getStats(g.getTestServer(), { headers: { 'X-UNIT-TEST-COMMENT': 'timeout' } })).to.eventually.be.rejectedWith('network timeout at');
    });
});
