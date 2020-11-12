const expres = require('express');
const app = expres();
const reply = require('./reply');
const jandtGen = require('./message_generate/jandtGen');
const { lineToken, postToken } = require('./config.json');
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send("hello");
    res.sendStatus(200);
    res.end();
})
app.post('/webhook', async (req, res, next) => {
    let reply_token = req.body.events[0].replyToken;
    let msg = req.body.events[0].message.text;
    let typeOfCompany = msg.substr(0, 1);
    let billcode = msg.substr(2,billcode.length);
    
    if(typeOfCompany == "j"){
        reply(reply_token, await jandtGen(billcode), lineToken);
    }
    res.sendStatus(200);
   
})

app.listen(port)