const unirest = require('unirest');

async function getStatus(billcode) {
    billcode = billcode.toString();
    let data = await unirest
        .get(`https://spx.co.th/api/v2/fleet_order/tracking/search?sls_tracking_number=${billcode}`)
        .headers(
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': 'fms_language=th'

            })
        .send()
        .then((response) => {
            return response.body
        })
    // console.log(Object.keys(data.response.items)[0]);

    return data.data

}
// async function test() {
//     let x = await getStatus("TH00948111887B");
//     console.log(x);
// }

// test()
module.exports = getStatus;
