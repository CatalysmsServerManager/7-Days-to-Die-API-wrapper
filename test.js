let testClass = require("./dist/index.js");

let sdtd = new testClass();


test();


async function test() {
    let response = await sdtd.getStats({
        ip: "164.132.206.98",
        port: 26924,
        adminUser: "bot",
        adminToken: "419000c5-39b7-45ee-85ae-5b57feee5431"
    })

    console.log(response)

}