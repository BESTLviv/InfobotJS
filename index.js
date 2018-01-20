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
var content = fs.readFileSync("data.json")
content = JSON.parse(content)

var token = process.env.TG_TOKEN;
var port = process.env.PORT || 443;
var host = process.env.HOST;
var externalUrl = process.env.MYURL;
var bot = new TelegramBot(token, {webHook:{port:process.env.PORT}});


bot.setWebHook(externalUrl +':443/bot' +token);
console.log('Webhook has been set.')

//var content = fs.readFileSync("data.json");
console.log("lbg info : \n"+ content[1]);
console.log("\n info is loaded, len = "+ content.length+ " 1 obj len: "+content[1].length+ "/n");


bot.onText(/\/help (.+)/, function (msg, match) {
    var info="no user found\n"
    var search = match.toString().toLowerCase()
    for (i=0; i<content.length; i++) {
        var objinfo = (content[i][0]+content[i][1]).toString().toLowerCase()
        console.log("search: " +search+ "; objinfo: " +objinfo+"\n")
        if (objinfo.indexOf(search) === -1) {
            continue;
        }
        info = content[i][1] + "'s phone: +38" + content[i][5] + "\n"
    }
    var chatId=msg.from.id;
    bot.sendMessage(chatId, info);
});