import TelegramBot from 'node-telegram-bot-api'

const token =process.env.TOKEN;
const port = process.env.PORT || 443;
const host = process.env.HOST;
const externalUrl = process.env.MYURL;
let bot = new TelegramBot(token, {webHook: {port: port, host: host}});

bot.setWebHook(externalUrl + ':443/bot' + token);

bot.on('message', msg=> {
    const {chat: {id}}=msg;
    bot.sendMessage(id, 'Pong');
});

bot.onText(/\/help (.+)/, (msg, [source, match])=> {
    const {chat: {id}}=msg;
    bot.sendMessage(id, match);
});