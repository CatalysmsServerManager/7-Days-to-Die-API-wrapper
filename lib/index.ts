import * as snekfetch from "snekfetch"

export interface SdtdServer {
    ip: string,
    port: number,
    adminUser: string,
    adminToken: string
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
            return response.body
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
            return response.body
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
            return response.body
        }
    }
}

module.exports = SdtdApi