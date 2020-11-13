const getStatus = require('../api/jandt');


async function generate(billcode) {
    return await getStatus(billcode).then((data) => {
        let details = data.details[0];
        let str = "";
        try {
            str = `สถานะ -> J&T Express เลข ${data.billcode} \n`;
            str += `สถานะ : ` + data.status + '\n'
            str += `สถานที่ : ${details.state} ${details.area} ${details.city} \n`
            str += `เวลา : ${details.accepttime}`
            return str;
        } catch (err) {
            console.log(err);
            return `ไม่พบหมายเลขนี้`;
        }
    });
}

// async function test() {
//     let x = await getStatus("623339712601");
//     console.log(x);
// }
// test()
module.exports = generate;