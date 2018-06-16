let getStats = require('./src/getStats');

interface SdtdServer {
    ip: string,
    port: number,
    adminUser: string,
    adminToken: string
}

class SdtdApi {
    static getStats = require('./src/getStats');
}

module.exports = SdtdApi