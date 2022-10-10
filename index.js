const TelegramApi = require('node-telegram-bot-api');
const token = '5763265262:AAHvCI7xnELZZbySMy9aZMJdT_H-218ae1Q';
const bot = new TelegramApi(token, {polling: true});
const chats = {}

const {gameOptions, againOptions} = require('./options');

async function startGame(chatId){
    await bot.sendMessage(chatId, "wanna play? random number");
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    return bot.sendMessage(chatId, '0...9 what a number', gameOptions)
}


const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'start'},
        {command: '/game', description: 'game'},
        {command: '/info', description: 'info'},
    ]);


    bot.onText( /ab+c/i, async (msg, match) => {


        const chatId = msg.chat.id;
        const resp = match[1]; // the captured "whatever"

        // send back the matched "whatever" to the chat
        return  bot.sendMessage(chatId, resp + " adwd");
    });


    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;

        if(text === "/start"){
            return bot.sendMessage(chatId, "bot started");
        }
        if(text === "/game"){
            return startGame(chatId)
        }
        if(text === "/info"){
            return bot.sendMessage(chatId, "was created 10 October 2022");
        } else {
            await bot.sendMessage(chatId, text);
            await bot.sendMessage(chatId, text);
            return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/5a7/cb3/5a7cb3d0-bca6-3459-a3f0-5745d95d54b7/10.webp')
        }



    });

    bot.on('callback_query', async msg =>{
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if(data == '/again'){
            return startGame(chatId)
        }
        await bot.sendMessage(chatId, 'you chose number ' + data);
        if(data == chats[chatId]){
            return bot.sendMessage(chatId, 'you win', againOptions);
        } else {
            return bot.sendMessage(chatId, 'you lose', againOptions);
        }
    })
}

start();