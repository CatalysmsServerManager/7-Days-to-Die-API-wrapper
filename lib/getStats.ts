import * as snekfetch from "snekfetch"
import { SdtdServer } from "./sdtdServer"



async function getStats(server: SdtdServer) {
    let response = await snekfetch.get(`http://${server.ip}:${server.port}/api/getstats`);

    if (!response.ok) {
        throw new Error(`Failed to get stats - ${response.statusText}`)
    } else {
        return response.body
    }
}

export { getStats }