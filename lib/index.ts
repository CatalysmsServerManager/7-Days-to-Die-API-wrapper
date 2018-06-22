import * as snekfetch from "snekfetch"
import * as responses from './responses'

export interface SdtdServer {
    ip: String,
    port: String,
    adminUser: String,
    adminToken: String
}


export class SdtdApi {

    /**
    * @param {SdtdServer} SdtdServer SdtdServer interface
    */

    static async getStats(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getstats`);

        if (!response.ok) {
            throw new Error(`Failed to get stats - ${response.statusText}`)
        } else {
            return response.body as responses.StatsResponse
        }
    }

    /**
    * @param {SdtdServer} SdtdServer SdtdServer interface
    */

    static async getOnlinePlayers(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayersonline?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);

        if (!response.ok) {
            throw new Error(`Failed to get online players - ${response.statusText}`)
        } else {
            return response.body as Array<responses.OnlinePlayerResponse>
        }
    }

    /**
    * @param {SdtdServer} SdtdServer SdtdServer interface
    * @returns { Object } with property 'commands' which is an array
    */

    static async getAllowedCommands(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getallowedcommands?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
        if (!response.ok) {
            throw new Error(`Failed to get allowed commands - ${response.statusText}`)
        } else {
            return response.body as responses.AllowedCommands
        }
    }

    static async executeConsoleCommand(server: SdtdServer, command: String) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/executeconsolecommand?adminuser=${server.adminUser}&admintoken=${server.adminToken}&command=${command}`);
        if (!response.ok) {
            throw new Error(`Failed to execute command - ${response.statusText}`)
        } else {
            return response.body as responses.CommandResponse
        }
    }

    static async getAnimalsLocation(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getanimalslocation?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
        if (!response.ok) {
            throw new Error(`Failed to get animals location - ${response.statusText}`)
        } else {
            return response.body as Array<responses.entityLocation>
        }
    }

    static async getHostileLocation(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/gethostilelocation?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
        if (!response.ok) {
            throw new Error(`Failed to get hostiles location - ${response.statusText}`)
        } else {
            return response.body as Array<responses.entityLocation>
        }
    }

    static async getLandClaims(server: SdtdServer) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getlandclaims?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
        if (!response.ok) {
            throw new Error(`Failed to get land claims - ${response.statusText}`)
        } else {
            return response.body as Array<responses.landClaimsResponse>
        }
    }

    static async getPlayerInventory(server: SdtdServer, steamId: String) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayerinventory?adminuser=${server.adminUser}&admintoken=${server.adminToken}&steamId=${steamId}`);
        if (!response.ok) {
            throw new Error(`Failed to get player inventory - ${response.statusText}`)
        } else {
            return response.body as Array<responses.InventoryResponse>
        }
    }

    static async getPlayerList(server: SdtdServer, rowsPerPage: Number, page: Number) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayerlist?adminuser=${server.adminUser}&admintoken=${server.adminToken}&rowsperpage=${rowsPerPage}&page=${page}`);
        if (!response.ok) {
            throw new Error(`Failed to get player list - ${response.statusText}`)
        } else {
            return response.body as Array<responses.getPlayerListResponse>
        }
    }

    static async getPlayersLocation(server: SdtdServer, offline : Boolean) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayerslocation?adminuser=${server.adminUser}&admintoken=${server.adminToken}&offline=${offline}`);
        if (!response.ok) {
            throw new Error(`Failed to get players location - ${response.statusText}`)
        } else {
            return response.body as Array<responses.PlayerLocation>
        }
    }

}

module.exports = SdtdApi
