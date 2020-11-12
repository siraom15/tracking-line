const { lineToken, postToken, kerryToken } = require('../config.json');

const fetch = require('node-fetch');
const unirest = require('unirest');

async function getToken() {
    let token = await unirest
        .post('https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token')
        .headers({
            'Content-Type': 'application/json',
            'Authorization': "Token " + postToken
        })
        .send()
        .then((res) => {
            return res.body.token;
        });
    return token;
}
async function getStatus(billcode) {
    billcode = billcode.toString();
    let token = "Token " + await getToken();
    let data = await unirest
        .post('https://trackapi.thailandpost.co.th/post/api/v1/track')
        .headers(
            {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            })
        .send(
            {
                "status": "all",
                "language": "TH",
                "barcode": [
                    billcode
                ]
            })
        .then((response) => {
            // console.log(response.body);
            return response.body
        })
    // console.log(Object.keys(data.response.items)[0]);
    let last_data = data.response.items[billcode].pop();
    return last_data

}
async function test() {
    let x = await getStatus("EF582568151TH");
    console.log(x);
}

// test()
module.exports = getStatus;
