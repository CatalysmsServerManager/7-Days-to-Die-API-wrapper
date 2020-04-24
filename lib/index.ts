import {stringify,ParsedUrlQueryInput} from "querystring";
import fetch, { RequestInit } from "node-fetch"
import * as responses from './responses'

export interface SdtdServer {
    ip: string,
    port: string,
    forceHttps?: boolean,
    adminUser: string,
    adminToken: string
}

export function getBaseUrl(server: SdtdServer): string {
    let scheme = "http";
    if (server.forceHttps === true) {
        scheme = "https"
    } else if (server.forceHttps === false) {
        scheme = "http"
    } else if (parseInt(server.port) === 443) {
        scheme = "https"
    }
    return `${scheme}://${server.ip}:${server.port}`;
}

async function fetchJson(server: SdtdServer, url: string, qs: ParsedUrlQueryInput, fetchOpts?: RequestInit) {
    const uri = getBaseUrl(server) + url + '?' + stringify(qs);;
    return await fetch(uri, fetchOpts).then(res => res.json())
}

export async function getStats(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/getstats`, { adminuser: server.adminUser,admintoken: server.adminToken}, fetchOpts)
    return response as responses.StatsResponse
}

export async function getOnlinePlayers(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/getplayersonline`, { adminuser: server.adminUser,admintoken: server.adminToken}, fetchOpts)
    return response as Array<responses.OnlinePlayerResponse>
}

export async function getAllowedCommands(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/getallowedcommands`, { adminuser: server.adminUser,admintoken: server.adminToken}, fetchOpts)
    return response as responses.AllowedCommands
}

export async function executeConsoleCommand(server: SdtdServer, command: string, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/executeconsolecommand`, { adminuser: server.adminUser,admintoken: server.adminToken, command: command }, fetchOpts)
    return response as responses.CommandResponse
}

export async function getAnimalsLocation(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/getanimalslocation`, { adminuser: server.adminUser,admintoken: server.adminToken}, fetchOpts)
    return response as Array<responses.entityLocation>
}

export async function getHostileLocation(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/gethostilelocation`, { adminuser: server.adminUser,admintoken: server.adminToken}, fetchOpts)
    return response as Array<responses.entityLocation>
}

export async function getLandClaims(server: SdtdServer, steamId?: string, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/getlandclaims`, { adminuser: server.adminUser,admintoken: server.adminToken}, fetchOpts)
    return response as Array<responses.landClaimsResponse>
}

export async function getPlayerInventory(server: SdtdServer, steamId: string, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/getplayerinventory`, { adminuser: server.adminUser,admintoken: server.adminToken, steamid: steamId}, fetchOpts)
    return response as Array<responses.InventoryResponse>
}

export async function getPlayerInventories(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/getplayerinventories`, { adminuser: server.adminUser,admintoken: server.adminToken}, fetchOpts)
    return response as responses.GetLog
}

export async function getPlayerList(server: SdtdServer, rowsPerPage: number, page: number, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/getplayerlist`, { adminuser: server.adminUser,admintoken: server.adminToken, rowsperpage: rowsPerPage, page: page}, fetchOpts)
    return response as Array<responses.getPlayerListResponse>
}

export async function getPlayersLocation(server: SdtdServer, offline: boolean, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/getplayerslocation`, { adminuser: server.adminUser,admintoken: server.adminToken, offline: offline}, fetchOpts)
    return response as Array<responses.PlayerLocation>
}

export async function getServerInfo(server: SdtdServer, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/getserverinfo`, { adminuser: server.adminUser,admintoken: server.adminToken}, fetchOpts)
    return response as responses.GetServerInfo
}

export async function getWebUIUpdates(server: SdtdServer, latestLine: number, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/getwebuiupdates`, { adminuser: server.adminUser,admintoken: server.adminToken, latestLine: latestLine}, fetchOpts)
    return response as responses.GetWebUIUpdatesResponse
}

export async function getLog(server: SdtdServer, firstLine: number, count: number = 50, fetchOpts?: RequestInit) {
    const response = await fetchJson(server, `/api/getlog`, { adminuser: server.adminUser,admintoken: server.adminToken, firstLine: firstLine, count: count }, fetchOpts)
    return response as Array<responses.InventoryResponse>
}