import * as snekfetch from "snekfetch"
import * as responses from './responses'

export interface SdtdServer {
    ip: String,
    port: String,
    adminUser: String,
    adminToken: String
}

export class SdtdApi {

    static async getStats(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getstats`);
        return response.body as responses.StatsResponse
    }

    static async getOnlinePlayers(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayersonline?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
        return response.body as Array<responses.OnlinePlayerResponse>
    }

    static async getAllowedCommands(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getallowedcommands?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
        return response.body as responses.AllowedCommands
    }

    static async executeConsoleCommand(server: SdtdServer, command: String) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/executeconsolecommand?adminuser=${server.adminUser}&admintoken=${server.adminToken}&command=${command}`);
        return response.body as responses.CommandResponse
    }

    static async getAnimalsLocation(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getanimalslocation?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
        return response.body as Array<responses.entityLocation>
    }

    static async getHostileLocation(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/gethostilelocation?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
        return response.body as Array<responses.entityLocation>
    }

    static async getLandClaims(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getlandclaims?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
        return response.body as Array<responses.landClaimsResponse>
    }

    static async getPlayerInventory(server: SdtdServer, steamId: String) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayerinventory?adminuser=${server.adminUser}&admintoken=${server.adminToken}&steamId=${steamId}`);
        return response.body as Array<responses.InventoryResponse>
    }

    static async getPlayerList(server: SdtdServer, rowsPerPage: Number, page: Number) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayerlist?adminuser=${server.adminUser}&admintoken=${server.adminToken}&rowsperpage=${rowsPerPage}&page=${page}`);
        return response.body as Array<responses.getPlayerListResponse>
    }

    static async getPlayersLocation(server: SdtdServer, offline: Boolean) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayerslocation?adminuser=${server.adminUser}&admintoken=${server.adminToken}&offline=${offline}`);
        return response.body as Array<responses.PlayerLocation>
    }

    static async getServerInfo(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getserverinfo?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
        return response.body as responses.GetServerInfo
    }

    static async getWebUIUpdates(server: SdtdServer, latestLine: Number) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getwebuiupdates?adminuser=${server.adminUser}&admintoken=${server.adminToken}&latestLine=${latestLine}`);
        return response.body as responses.GetServerInfo
    }

    static async getLog(server: SdtdServer, firstLine: Number) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getlog?adminuser=${server.adminUser}&admintoken=${server.adminToken}&firstLine=${firstLine}`);
        return response.body as responses.GetLog
    }

}

module.exports = SdtdApi
