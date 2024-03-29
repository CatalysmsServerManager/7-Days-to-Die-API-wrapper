import fetch, { RequestInit } from 'node-fetch';
import { stringify } from 'qs';
import { ParsedUrlQueryInput } from 'querystring';

import { handleSteamId } from './handleSteamId';
import * as responses from './responses';

export interface SdtdServer {
    ip: string,
    port: string,
    forceHttps?: boolean,
    adminUser: string,
    adminToken: string
}

export function getBaseUrl(server: SdtdServer): string {
    let scheme = "http";
    let needsPort = true;
    if (server.forceHttps === true) {
        scheme = "https";
    } else if (server.forceHttps === false) {
        scheme = "http";
    } else if (parseInt(server.port) === 443) {
        needsPort = false;
        scheme = "https";
    } else if (parseInt(server.port) === 80) {
        needsPort = false;
        scheme = "http";
    }
    return needsPort ? `${scheme}://${server.ip}:${server.port}` : `${scheme}://${server.ip}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type json = any;

async function fetchJson(server: SdtdServer, url: string, qs: ParsedUrlQueryInput, fetchOpts?: RequestInit): Promise<json> {
    const uri = getBaseUrl(server) + url + '?' + stringify(qs, { skipNulls: true });

    const timeout = fetchOpts?.timeout ?? 3000;
    const headers: Record<string, string> = {};

    if (qs.adminuser) {
        headers["X-SDTD-API-TOKENNAME"] = qs.adminuser.toString();
    }

    if (qs.admintoken) {
        headers["X-SDTD-API-SECRET"] = qs.admintoken.toString();
    }

    return fetch(uri, { ...fetchOpts, timeout, headers })
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(handleSteamId);
            } else {
                return response.text();
            }
        });
}

export async function getStats(server: SdtdServer, fetchOpts?: RequestInit): Promise<responses.StatsResponse> {
    return fetchJson(server, `/api/getstats`, { adminuser: server.adminUser, admintoken: server.adminToken }, fetchOpts);
}

export async function getOnlinePlayers(server: SdtdServer, fetchOpts?: RequestInit): Promise<Array<responses.OnlinePlayerResponse>> {
    return fetchJson(server, `/api/getplayersonline`, { adminuser: server.adminUser, admintoken: server.adminToken }, fetchOpts);
}

export async function getAllowedCommands(server: SdtdServer, fetchOpts?: RequestInit): Promise<responses.AllowedCommands> {
    return fetchJson(server, `/api/getallowedcommands`, { adminuser: server.adminUser, admintoken: server.adminToken }, fetchOpts);
}

export async function executeConsoleCommand(server: SdtdServer, command: string, fetchOpts?: RequestInit): Promise<responses.CommandResponse> {
    return fetchJson(server, `/api/executeconsolecommand`, { adminuser: server.adminUser, admintoken: server.adminToken, command: command }, fetchOpts);
}

export async function getAnimalsLocation(server: SdtdServer, fetchOpts?: RequestInit): Promise<Array<responses.EntityLocation>> {
    return fetchJson(server, `/api/getanimalslocation`, { adminuser: server.adminUser, admintoken: server.adminToken }, fetchOpts);
}

export async function getHostileLocation(server: SdtdServer, fetchOpts?: RequestInit): Promise<Array<responses.EntityLocation>> {
    return fetchJson(server, `/api/gethostilelocation`, { adminuser: server.adminUser, admintoken: server.adminToken }, fetchOpts);
}

export async function getLandClaims(server: SdtdServer, steamId?: string, fetchOpts?: RequestInit): Promise<responses.LandClaimsResponse> {
    return fetchJson(server, `/api/getlandclaims`, { adminuser: server.adminUser, admintoken: server.adminToken, steamid: steamId }, fetchOpts);
}

export async function getPlayerInventory(server: SdtdServer, steamId: string, fetchOpts?: RequestInit): Promise<responses.InventoryResponse> {
    if (/^\d{17}$/.test(steamId)) {
        return fetchJson(server, `/api/getplayerinventory`, { adminuser: server.adminUser, admintoken: server.adminToken, steamid: steamId, userid: `Steam_${steamId}` }, fetchOpts);
    } else {
        return fetchJson(server, `/api/getplayerinventory`, { adminuser: server.adminUser, admintoken: server.adminToken, userid: steamId }, fetchOpts);
    }
}

export async function getPlayerInventories(server: SdtdServer, fetchOpts?: RequestInit): Promise<Array<responses.InventoryResponse>> {
    return fetchJson(server, `/api/getplayerinventories`, { adminuser: server.adminUser, admintoken: server.adminToken }, fetchOpts);
}

export async function getPlayerList(server: SdtdServer, rowsPerPage?: number, page?: number, fetchOpts?: RequestInit): Promise<responses.PlayerListResponse> {
    return fetchJson(server, `/api/getplayerlist`, { adminuser: server.adminUser, admintoken: server.adminToken, rowsperpage: rowsPerPage, page: page }, fetchOpts);
}

export async function getPlayersLocation(server: SdtdServer, offline: boolean, fetchOpts?: RequestInit): Promise<Array<responses.PlayerLocation>> {
    return fetchJson(server, `/api/getplayerslocation`, { adminuser: server.adminUser, admintoken: server.adminToken, offline: offline }, fetchOpts);
}

export async function getServerInfo(server: SdtdServer, fetchOpts?: RequestInit): Promise<responses.GetServerInfo> {
    return fetchJson(server, `/api/getserverinfo`, { adminuser: server.adminUser, admintoken: server.adminToken }, fetchOpts);
}

export async function getWebUIUpdates(server: SdtdServer, latestLine?: number, fetchOpts?: RequestInit): Promise<responses.GetWebUIUpdatesResponse> {
    return fetchJson(server, `/api/getwebuiupdates`, { adminuser: server.adminUser, admintoken: server.adminToken, latestLine: latestLine }, fetchOpts);
}

export async function getLog(server: SdtdServer, firstLine?: number, count: number = 50, fetchOpts?: RequestInit): Promise<responses.GetLog> {
    return fetchJson(server, `/api/getlog`, { adminuser: server.adminUser, admintoken: server.adminToken, firstLine: firstLine, count: count }, fetchOpts);
}
