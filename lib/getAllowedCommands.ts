import * as snekfetch from "snekfetch"
import {SdtdServer} from "./sdtdServer"

async function getAllowedCommands(server: SdtdServer) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getallowedcommands?adminuser=${server.adminUser}&admintoken=${server.adminToken}`);
    if (!response.ok) {
        throw new Error(`Failed to get allowed commands - ${response.statusText}`)
    } else {
        return response.body
    }
}

export { getAllowedCommands }