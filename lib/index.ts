interface SdtdServer {
    ip: string,
    port: number,
    adminUser: string,
    adminToken: string
}


class SdtdApi {
    static getStats = require('./getStats.js');
    static getOnlinePlayers = require('./getOnlinePlayers.js');
}

module.exports = SdtdApi