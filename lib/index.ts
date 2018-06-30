import * as snekfetch from "snekfetch"
import * as responses from './responses'

export interface SdtdServer {
    ip: String,
    port: String,
    adminUser: String,
    adminToken: String
}

export async function getStats(server: SdtdServer) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getstats`);
    return response.body as responses.StatsResponse
}

export async function getOnlinePlayers(server: SdtdServer) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayersonline?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
    return response.body as Array<responses.OnlinePlayerResponse>
}

export async function getAllowedCommands(server: SdtdServer) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getallowedcommands?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
    return response.body as responses.AllowedCommands
}

export async function executeConsoleCommand(server: SdtdServer, command: String) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/executeconsolecommand?adminuser=${server.adminUser}&admintoken=${server.adminToken}&command=${command}`);
    return response.body as responses.CommandResponse
}

export async function getAnimalsLocation(server: SdtdServer) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getanimalslocation?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
    return response.body as Array<responses.entityLocation>
}

export async function getHostileLocation(server: SdtdServer) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/gethostilelocation?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
    return response.body as Array<responses.entityLocation>
}

export async function getLandClaims(server: SdtdServer) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getlandclaims?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
    return response.body as Array<responses.landClaimsResponse>
}

export async function getPlayerInventory(server: SdtdServer, steamId: String) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayerinventory?adminuser=${server.adminUser}&admintoken=${server.adminToken}&steamId=${steamId}`);
    return response.body as Array<responses.InventoryResponse>
}

export async function getPlayerInventories(server: SdtdServer) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayerinventories?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
    return response.body as responses.GetLog
}

export async function getPlayerList(server: SdtdServer, rowsPerPage: Number, page: Number) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayerlist?adminuser=${server.adminUser}&admintoken=${server.adminToken}&rowsperpage=${rowsPerPage}&page=${page}`);
    return response.body as Array<responses.getPlayerListResponse>
}

export async function getPlayersLocation(server: SdtdServer, offline: Boolean) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayerslocation?adminuser=${server.adminUser}&admintoken=${server.adminToken}&offline=${offline}`);
    return response.body as Array<responses.PlayerLocation>
}

export async function getServerInfo(server: SdtdServer) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getserverinfo?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
    return response.body as responses.GetServerInfo
}

export async function getWebUIUpdates(server: SdtdServer, latestLine: Number) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getwebuiupdates?adminuser=${server.adminUser}&admintoken=${server.adminToken}&latestLine=${latestLine}`);
    return response.body as responses.GetServerInfo
}

export async function getLog(server: SdtdServer, firstLine: Number) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getlog?adminuser=${server.adminUser}&admintoken=${server.adminToken}&firstLine=${firstLine}`);
    return response.body as Array<responses.InventoryResponse>
}
