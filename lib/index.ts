import { getStats } from './getStats'
import { getOnlinePlayers } from './getOnlinePlayers'
import { getAllowedCommands } from './getAllowedCommands'

export class SdtdApi {
    static getStats = getStats
    static getOnlinePlayers = getOnlinePlayers
    static getAllowedCommands = getAllowedCommands
}

module.exports = SdtdApi