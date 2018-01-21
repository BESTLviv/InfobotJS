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


bot.onText(/\/get (.+)/, function (msg, match) {
    var info="no user found\n"
    var search = match[1].toLowerCase()
    for (i=1; i<content.length; i++) {
        var objinfo = (content[i][0]+content[i][1]).toString().toLowerCase()
        console.log("search: " +search+ "; objinfo: " +objinfo+"\n")
        if (objinfo.indexOf(search) === -1) {
            continue;
        }
        var phones = (content[i][5]).split(/\r\n/);
        for (var phone in phones) {
            info = content[i][1] + "'s phone: +38" + phones[phone] + "\n"
            var chatId=msg.chat.id;
            bot.sendMessage(chatId, info);
        }

    }
});

bot.on("inline_query", function (query) {
    var res = []
    var matchpos = 0
    var info="no user found\n"
    console.log(query)
    var search = query.query.toString().toLowerCase()
    for (i=1; i<content.length; i++) {
        var objinfo = (content[i][0]+content[i][1]).toString().toLowerCase()
        console.log("search: " +search+ "; objinfo: " +objinfo+"\n")
        matchpos = objinfo.indexOf(search, matchpos)
        if ( matchpos=== -1) {
            matchpos=0
            continue;
        }
       var phones = (content[i][5]).split(/\r\n/);
        for (var phone in phones) {

            var key = 1+ 1000*phone
            //info = content[i][1] + "'s phone: +38" + phones[phone] + "\n"
            res.push({
                type: "article",
                id: key,
                title: content[i][0] + " " + content[i][1],
                input_message_content: {
                    phone_number: "+38" + phones[phone],
                    first_name: content[i][1],
                    last_name: content[i][0],
                }
            })
        }

    }
    console.log(res)
bot.answerInlineQuery(query.id, res)
});