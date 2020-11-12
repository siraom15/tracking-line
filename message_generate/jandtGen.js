const getStatus = require('../api/jandt');


async function generate() {
    return await getStatus("623339712601").then((data) => {
        let details = data.details[0]

        let str = `สถานะ -> J&T Express เลข ${data.billcode} \n`;
        str += `สถานะ : ` + data.status + '\n'
        str += `สถานที่ : ${details.state} ${details.area} ${details.city} \n`
        str += `เวลา : ${details.accepttime}`
        return str;
    });
}

module.exports = generate;