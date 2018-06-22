# 7 Days to die API wrapper

[![Build Status](https://travis-ci.org/CatalysmsServerManager/7-Days-to-Die-API-wrapper.svg?branch=master)](https://travis-ci.org/CatalysmsServerManager/7-Days-to-Die-API-wrapper)

A simple wrapper around the web API from Alloc's fixes mod.

 - [Docs](https://catalysmsservermanager.github.io/7-Days-to-Die-API-wrapper)



 ## Example usage

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