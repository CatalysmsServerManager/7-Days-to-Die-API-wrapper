import * as snekfetch from "snekfetch"

export interface SdtdServer {
    ip: String,
    port: String,
    adminUser: String,
    adminToken: String
}

export interface GameTime {
    days: Number,
    hours: Number,
    minutes: Number
}

export interface StatsResponse {
    gametime : GameTime,
    players: Number,
    hostiles: Number,
    animals: Number 
}

export interface CommandResponse {
    command: String,
    parameters: String,
    result: String
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
            return response.body as StatsResponse
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


    static async executeConsoleCommand(server: SdtdServer, command: String) {
        let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/executeconsolecommand?adminuser=${server.adminUser}&admintoken=${server.adminToken}&command=${command}`);
        if (!response.ok) {
            throw new Error(`Failed to execute command - ${response.statusText}`)
        } else {
            return response.body as CommandResponse
        }
    }
}


module.exports = SdtdApi

