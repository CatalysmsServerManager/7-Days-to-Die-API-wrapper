import * as snekfetch from "snekfetch"
import {SdtdServer} from "./sdtdServer"

async function getOnlinePlayers(server: SdtdServer) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getplayersonline?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);

    if (!response.ok) {
        throw new Error(`Failed to get online players - ${response.statusText}`)
    } else {
        return response.body
    }
}

export { getOnlinePlayers }