const TelegramBot = require('node-telegram-bot-api');
const config = require('Config');

//utilidades
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const token = config.get('tokens.telegramBot');
//token.tokens.telegramBot
//console.log(token);

//se crea el bot
const bot = new TelegramBot(token, {polling: true});

// se envia cualquier mensaje"
bot.onText(/\/hola (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1]; // se captura cualquier cosa

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/love/, function onLoveText(msg) {
    const opts = {
      reply_to_message_id: msg.message_id,
      reply_markup: JSON.stringify({
        keyboard: [
          ['Si'],
          ['No']
        ]
      })
    };
    console.log(opts);
    bot.sendMessage(msg.chat.id, 'Tu me quieres?', opts);
});

//se ecuchanlos mensajes
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const opciones = {
    reply_markup: JSON.stringify({
        data:[
           msg 
        ]
      })
  }
  //monitoreo de datos del bot
  //console.log(opciones.reply_markup);
  
  // se imprimen las respuestas
  bot.sendMessage(chatId, 'su mensaje fue recivido \nsu ID de chat es: '+chatId);
  console.log("id de chat:"+chatId);
  console.log("nombre: "+msg.chat.first_name);
  console.log("mensaje id: "+msg.message_id);
  console.log("mensaje que se recibe del chat: "+msg.text);
});