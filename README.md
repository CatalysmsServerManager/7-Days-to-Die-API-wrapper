[![Build Status](https://travis-ci.org/CatalysmsServerManager/7-Days-to-Die-API-wrapper.svg?branch=master)](https://travis-ci.org/CatalysmsServerManager/7-Days-to-Die-API-wrapper)
[![Coverage Status](https://coveralls.io/repos/github/CatalysmsServerManager/7-Days-to-Die-API-wrapper/badge.svg?branch=master)](https://coveralls.io/github/CatalysmsServerManager/7-Days-to-Die-API-wrapper?branch=master)
[![Docs](https://img.shields.io/badge/Docs--green.svg)](https://catalysmsservermanager.github.io/7-Days-to-Die-API-wrapper)

# 7 Days to die API wrapper

A simple wrapper around the web API from Alloc's fixes mod.

 ## Requirements

  - A 7 Days to Die server running Alloc's Fixes

The port required for this module is the same as the dynamic map page. For more info, see the documentation of the mod itself
https://7dtd.illy.bz/wiki/Ports

 ## Example usage

 Install with npm
 `npm i 7daystodie-api-wrapper`

 ```js
const SdtdApi = require('7daystodie-api-wrapper');

const sdtdServer = {
    ip: "192.168.0.1",
    port: "8084",
    adminUser: "admin",
    adminToken: "secret"
}

foo();

async function foo() {
    let stats = await SdtdApi.getStats(sdtdServer);
    console.log(`The current ingame time is ${stats.gametime.days} days, ${stats.gametime.hours} hours and ${stats.gametime.minutes} minutes.`)
}
 ```