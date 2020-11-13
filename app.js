const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const unirest = require('unirest');
const fetch = require('node-fetch');
const { json } = require('body-parser');
const port = process.env.PORT || 4000;

const reply = require('./reply');

const jandtGen = require('./message_generate/jandtGen');
const postGen = require('./message_generate/postGen');
const shopeeGen = require('./message_generate/shopeeGen');

const { lineToken, postToken } = require('./config.json');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("hello");
    res.sendStatus(200);
    res.end();
})
app.post('/webhook', async (req, res, next) => {
    let reply_token = req.body.events[0].replyToken;
    let msg = req.body.events[0].message.text.trim();
    let typeOfCompany = msg.substr(0, 1);
    let billcode = msg.substr(2, msg.length).trim();

    if (typeOfCompany == "j" && billcode.length > 0) {
        reply(reply_token, await jandtGen(billcode), lineToken);
    }
    else if (typeOfCompany == "p" && billcode.length > 0) {
        reply(reply_token, await postGen(billcode), lineToken);
    }
    else if (typeOfCompany == "s" && billcode.length > 0) {
        reply(reply_token, await shopeeGen(billcode), lineToken);
    }
    else {
        let str = `วิธีใช้ \n`;
        str += `พิมพ์ประเภทบริษัทขนส่ง ตามด้วย เลขพัสดุ \n\n`;
        str += `ประเภทบริษัทขนส่ง \np = ไปรษณีย์ \nj = J&T Express\ns = Shoppee Express \n\n`;
        str += `ตัวอย่างเช่น p EF582568151TH คือการค้นหาเลขพัสดุ EF582568151TH ของไปรษณีย์`;

        reply(reply_token, str, lineToken);

    }
    res.sendStatus(200);

})

app.listen(port)