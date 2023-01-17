const TelegramBot = require('node-telegram-bot-api');
const config = require('Config');

//utilidades
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//axios
const axios = require('axios');

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

//menu de opciones
// bot.onText(/\/opciones/, function onLoveText(msg) {
//     const opts = {
//       reply_to_message_id: msg.message_id,
//       reply_markup: JSON.stringify({
//         keyboard: [
//           ['fecha actual']
//         ]
//       })
//     };
//     //console.log(opts);
//     bot.sendMessage(msg.chat.id, 'fecha actual', opts);
// });


//se ecuchan los mensajes
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
  console.log(opciones.reply_markup);
  // se imprimen las respuestas
  //bot.sendMessage(chatId, 'su mensaje fue recivido \nsu ID de chat es: '+chatId);
  console.log("id de chat: "+chatId);
  console.log("nombre: "+msg.chat.first_name);
  console.log("mensaje id: "+msg.message_id);
  //validacion de opciones
  if(msg.text == "/fecha"){

    let now= new Date();
    console.log('La fecha actual es',now);
    console.log('UNIX time:',now.getTime());
    bot.sendMessage(chatId, "fecha actual: "+now);
    
    //bot.sendMessage(chatId, "la opcion es: "+msg.text);
  }
  if(msg.text=="/coin"){
    axios({
      method: 'get',
      url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    })
      .then(function (response) {
        const data = response.data;
        data.map((items) =>{
          console.log(items.id);
          const coins = items.symbol;
          const precio = items.high_24h;
          const img = items.image;
          bot.sendMessage(chatId,`
            moneda: ${coins} \nprecio: ${precio} \n${img}
          `);
        })
      });
  }
  if(msg.text=="/clima"){

    // axios({
    //   method: 'get',
    //   url: ''
    // })
    //   .then(function (response) {
    //     const data = response.data;
    //     data.map((items) =>{
    //       console.log(items.id);
    //       const coins = items.symbol;
    //       const precio = items.high_24h;
    //       const img = items.image;
    //       bot.sendMessage(chatId,`
    //         moneda: ${coins} \nprecio: ${precio} \n${img}
    //       `);
    //     })
    //   });
    bot.sendMessage(chatId, "no hay datos aun");
  }
});