const fetch = require('node-fetch');

async function getStatus(billcode) {
    billcode = billcode.toString();
    return await fetch("https://vipapp.jtexpress.co.th/index.php/index/rpcser/index", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        },
        "referrer": "https://www.jtexpress.co.th/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "f=router_zs&p=%5B%7B%22method%22%3A%22track%2ForderTrack%22%2C%22data%22%3A%7B%22parameter%22%3A%7B%22billcode%22%3A%22" + billcode + "%22%2C%22lang%22%3A%22th%22%7D%7D%7D%5D",
        "method": "POST",
        "mode": "cors"
    })
        .then((response) => {
            return response.json().then((data) => {
                return data.data.data;

            }).catch((err) => {
                throw err;
            })
        });
}
async function test() {
    let x = await getStatus("623339712601");
    console.log(x);
}
// test()
module.exports = getStatus;