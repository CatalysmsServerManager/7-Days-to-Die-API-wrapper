import * as snekfetch from "snekfetch"

interface SdtdServer {
    ip: string,
    port: number,
    adminUser: string,
    adminToken: string
}

async function getOnlinePlayers(server: SdtdServer) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayersonline?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);

    if (response.statusCode !== 200) {
        throw new Error(`Failed to get stats - ${response.statusCode}`)
    } else {
        return response.body
    }
}

module.exports = getOnlinePlayers