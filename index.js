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

var content = fs.readFileSync("content.txt");
console.log("lbg info : \n"+ content);
console.log("\n info is loaded \n");

bot.on('message', function (msg) {
    var chatId=msg.from.id;
    bot.sendMessage(chatId, msg.Text);
});