/*
in json:
1 - last name
2 - first name
3 - vkontakte
4 - facebook
5 - b-day
6 - phone
7 - email
8 - status
9 - member since
10 - angel

*/

var TelegramBot = require( 'node-telegram-bot-api');
var fs = require("fs");

var token = process.env.TG_TOKEN;
var port = process.env.PORT || 443;
var host = process.env.HOST;
var externalUrl = process.env.MYURL;
var bot = new TelegramBot(token, {webHook:{port:process.env.PORT}});


bot.setWebHook(externalUrl +':443/bot' +token);
console.log('Webhook has been set.')

var content = fs.readFileSync("data.json");
console.log("lbg info : \n"+ content[1]);
console.log("\n info is loaded, len = "+ content.length+ " 1 obj len: "+content[1].length+ "/n");


bot.onText(/\/get/, function (msg) {
    var info="no user found\n"
    for (i=0; i<content.length; i++) {
        if (content[i].includes(msg.text.ToString()) === true) {
            info = content[i][2] + "'s phone: +380" + content[i][6] + "\n"
        }
    }
    var chatId=msg.from.id;
    bot.sendMessage(chatId, msg.text.ToString());
});