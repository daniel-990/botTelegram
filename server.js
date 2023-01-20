const TelegramBot = require('node-telegram-bot-api');
const config = require('config');

//utilidades
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//axios
const axios = require('axios');

//const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const token = config.get('tokens.telegramBot');
const usuario1 = 2032844097;
const usuario2 = 177279577;

const app = express();
const port = process.env.PORT || config.get('puertos.puerto1');

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

//se inicia la app
app.get("/", (req, res) => {
  res.send("Hola mundo!!!");
});

  //se ecuchan los mensajes se prende el bot
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
    
    //datos de retorno
    console.log("id de chat: "+chatId);
    console.log("nombre: "+msg.chat.first_name);
    console.log("mensaje id: "+msg.message_id);
    console.log("mensaje: "+msg.text);
    //validacion de opciones
  
    //custom chats usuario Less
    if(chatId === usuario1 && msg.text == "Hola"){
      bot.sendMessage(chatId,`Hola ${msg.chat.first_name} soy un Bot de pruebas, si ingresas /coin te dare el dato de las monedas digitales y precio actual, si ingresas /fecha te doy la fecha actual y \ncreo que ya nos conociamos de antes, esta nota es para ti, te la deja un tal @xorroPerro quieres saber cual es la nota? si, no`);
    }
    if(chatId === usuario1 && msg.text == "si"){
      bot.sendMessage(chatId,`Imaginar lo imposible, tratar de merecer un corazon inquieto, alternar el instante entre escritos de Bukowski, cervezas y un beso con el sabor a la mujer amada`);
      console.log("entro en la condicion del si");
      console.log("mensaje2: "+msg.text);
    }
    if(chatId === usuario1 && msg.text == "no"){
      bot.sendMessage(chatId,`Bueno igual no fue la nota pero para re-escuchar un poco en la mañana \nesta cancion que te deja mi creador: https://www.youtube.com/watch?v=p6E24jdWR-s&ab_channel=enlaterraza`);
    }

    if(chatId === usuario2 && msg.text == "/alertas"){
      
      const contador = () =>{

        let fechaActual1 = new Date();
        let fechaActual2 = new Date();
        let fechaActual3 = new Date();

        var horas = fechaActual1.getHours();
        var minutos = fechaActual2.getMinutes();
        var segundos = fechaActual3.getSeconds();
        //----
        var horasStr = horas.toString();
        var minutosStr = minutos.toString();
        var segundosStr = segundos.toString();

        var horalTotal = horasStr+":"+minutosStr+":"+segundosStr;

        console.log(horalTotal);

        if(horalTotal == "14:18:0"){
          alert("hola "+horalTotal);
        }

      }
      setInterval(contador, 1000);
    }


    //custom chats
    if(chatId != usuario1){
      bot.sendMessage(chatId,`Hola ${msg.chat.first_name} este es un Bot de pruebas, \ningresa /coin, para saber el tipo de monedas digitales o \n/fecha, para saber la fecha actual`);
    }
  
  
    if(msg.text == "/fecha"){
      let now= new Date();
      console.log('La fecha actual es',now);
      console.log('UNIX time:',now.getTime());
      bot.sendMessage(chatId, "fecha actual: "+now);
      
      //bot.sendMessage(chatId, "la opcion es: "+msg.text);
    }
    if(msg.text == "/coin"){
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
      bot.sendMessage(chatId, "aun en construccion");
    }
  });

app.listen(port, () => {
  console.log(`esta corriendo por el puerto http://localhost:${port}`);
});

