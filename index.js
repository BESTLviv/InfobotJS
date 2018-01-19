var TelegramBot = require( 'node-telegram-bot-api');

var token = process.env.TG_TOKEN;
var port = process.env.PORT || 443;
var host = process.env.HOST;
var externalUrl = process.env.MYURL;
var bot = new TelegramBot(token);

bot.setWebHook(externalUrl +'bot' +token);

bot.on('message', function (msg) {
    var chatId=msg.chat.id;
    bot.sendMessage(chatId, 'Pong');
});