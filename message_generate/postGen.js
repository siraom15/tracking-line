const getStatus = require('../api/post');

async function generate(billcode) {
    return await getStatus(billcode).then((data) => {
        let str = "";
        try {
            str = `สถานะ -> ไปรษณีย์ เลข ${billcode} \n`;
            str += `สถานะ : ` + data.status_description + '\n'
            str += `คำอธิบาย : ${data.delivery_description} \n`
            str += `สถานที่ : ${data.location}`
            str += `เวลา : ${data.status_date}`
            return str;
        } catch (err) {
            console.log(err);
            return `ไม่พบหมายเลขนี้`;
        }
    });
}

// async function test() {
//     let x = await generate("EF582568151TH");
//     console.log(x);
// }
// test()
module.exports = generate;