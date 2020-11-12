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
    let msg = req.body.events[0].message.text;
    let typeOfCompany = msg.substr(0, 1);
    let billcode = str.substr(2, billcode.length).trim();

    if (typeOfCompany == "j") {
        reply(reply_token, await jandtGen(billcode), lineToken);
    }
    res.sendStatus(200);

})

app.listen(port)