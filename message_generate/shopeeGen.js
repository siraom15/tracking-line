const getStatus = require('../api/shopee');

async function generate(billcode) {
    return await getStatus(billcode).then((data) => {
        let str = "";
        try {
            str = `สถานะ -> Shopee Express \nเลข ${billcode} \n`;
            str += `สถานะ : ${data.current_status} \n`;
            str += `คำอธิบาย : ${data.tracking_list[0].message} \n`
            // str += `เวลา : ${data.status_date}`
            return str;
        } catch (err) {
            console.log(err);
            return `ไม่พบหมายเลขนี้`;
        }
    });
}

// async function test() {
//     let x = await generate("TH00948111887B");
//     console.log(x);
// }
// test()
module.exports = generate;