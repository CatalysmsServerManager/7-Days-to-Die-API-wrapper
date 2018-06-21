import { getStats } from './getStats'
import { getOnlinePlayers } from './getOnlinePlayers'
import { getAllowedCommands } from './getAllowedCommands'
import { SdtdServer } from "./sdtdServer"

export class SdtdApi {

    /**
    * @param {SdtdServer} SdtdServer SdtdServer interface
    */

    static getStats = getStats

    /**
    * @param {SdtdServer} SdtdServer SdtdServer interface
    */

    static getOnlinePlayers = getOnlinePlayers

    /**
    * @param {SdtdServer} SdtdServer SdtdServer interface
    * @returns { Object } with property 'commands' which is an array
    */

    static getAllowedCommands = getAllowedCommands
}

module.exports = SdtdApi