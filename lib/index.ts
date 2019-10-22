import fetch, { RequestInit } from "node-fetch"
import * as responses from './responses'

export interface SdtdServer {
    ip: String,
    port: String,
    adminUser: String,
    adminToken: String
}

async function fetchJson(url : string, fetchOpts?: RequestInit) {
    const uri = encodeURI(url);
    return await fetch(uri, fetchOpts).then(res => res.json())
}

export async function getStats(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/getstats?adminuser=${server.adminUser}&admintoken=${server.adminToken}`, fetchOpts)
    return response as responses.StatsResponse
}

export async function getOnlinePlayers(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/getplayersonline?adminuser=${server.adminUser}&admintoken=${server.adminToken}`, fetchOpts)
    return response as Array<responses.OnlinePlayerResponse>
}

export async function getAllowedCommands(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/getallowedcommands?adminuser=${server.adminUser}&admintoken=${server.adminToken}`, fetchOpts)
    return response as responses.AllowedCommands
}

export async function executeConsoleCommand(server: SdtdServer, command: String, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/executeconsolecommand?adminuser=${server.adminUser}&admintoken=${server.adminToken}&command=${command}`, fetchOpts)
    return response as responses.CommandResponse
}

export async function getAnimalsLocation(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/getanimalslocation?adminuser=${server.adminUser}&admintoken=${server.adminToken}`, fetchOpts)
    return response as Array<responses.entityLocation>
}

export async function getHostileLocation(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/gethostilelocation?adminuser=${server.adminUser}&admintoken=${server.adminToken}`, fetchOpts)
    return response as Array<responses.entityLocation>
}

export async function getLandClaims(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/getlandclaims?adminuser=${server.adminUser}&admintoken=${server.adminToken}`, fetchOpts)
    return response as Array<responses.landClaimsResponse>
}

export async function getPlayerInventory(server: SdtdServer, steamId: String, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/getplayerinventory?adminuser=${server.adminUser}&admintoken=${server.adminToken}&steamId=${steamId}`, fetchOpts)
    return response as Array<responses.InventoryResponse>
}

export async function getPlayerInventories(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/getplayerinventories?adminuser=${server.adminUser}&admintoken=${server.adminToken}`, fetchOpts)
    return response as responses.GetLog
}

export async function getPlayerList(server: SdtdServer, rowsPerPage: Number, page: Number, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/getplayerlist?adminuser=${server.adminUser}&admintoken=${server.adminToken}&rowsperpage=${rowsPerPage}&page=${page}`, fetchOpts)
    return response as Array<responses.getPlayerListResponse>
}

export async function getPlayersLocation(server: SdtdServer, offline: Boolean, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/getplayerslocation?adminuser=${server.adminUser}&admintoken=${server.adminToken}&offline=${offline}`, fetchOpts)
    return response as Array<responses.PlayerLocation>
}

export async function getServerInfo(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/getserverinfo?adminuser=${server.adminUser}&admintoken=${server.adminToken}`, fetchOpts)
    return response as responses.GetServerInfo
}

export async function getWebUIUpdates(server: SdtdServer, latestLine: Number, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/getwebuiupdates?adminuser=${server.adminUser}&admintoken=${server.adminToken}&latestLine=${latestLine}`, fetchOpts)
    return response as responses.GetWebUIUpdatesResponse
}

export async function getLog(server: SdtdServer, firstLine: Number, count: Number = 50, fetchOpts?: RequestInit) {
    const response = await fetchJson(`http://${server.ip}:${server.port}/api/getlog?adminuser=${server.adminUser}&admintoken=${server.adminToken}&firstLine=${firstLine}&count=${count}`, fetchOpts)
    return response as Array<responses.InventoryResponse>
}
