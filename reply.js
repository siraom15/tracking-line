const request = require('request')

function reply(reply_token, msg, line_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {' + line_token + '}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

module.exports = reply;