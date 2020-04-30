const express = require('express');
const twitter = require('twitter');
const axios = require('axios');
require('dotenv/config');

const musics = require('./musics');

const app = express();
app.use(express.json());

const client = new twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,

});

const api = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/USD-BRL/1',
});


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const schedule = new Array(10, 11, 12, 13, 14, 15, 16, 17, 18);
const done = new Array();

async function intervalFunc() {
  const agora = new Date();
  const horario = agora.getHours();

  const checkHour = schedule.indexOf(horario);
  const checkDone = done.indexOf(horario);

  if (checkHour >= 0 && checkDone < 0 && agora.getMinutes() == 0) {
    const dolar = await api.get();

    const { ask } = dolar.data[0];

    let parsedFifty = ask * 50;

    const real = ask;

    parsedFifty = parsedFifty.toFixed(0);

    const song = getRandomArbitrary(0, musics.length).toFixed(0);

    let askFormated = (ask * 1).toFixed(3);
    askFormated = ask.replace('.', ',');

    hourNow = `${agora.getHours()}:0${agora.getMinutes()}`;

    const message = `⏰ ${hourNow} \n.\n💰 Cotação do Dolar agora: R$${askFormated} \n. \n🎵 ${parsedFifty} CENTAVOS - ${musics[song].translate} \n.
  ${musics[song].link}`;

    await client.post('statuses/update', { status: message }, (error, tweet, response) => {
      if (error) { console.log(error); }

      console.log(`⌚${agora.getHours()}:${agora.getMinutes()} `);
      console.log(message);
    });
  }
}

setInterval(intervalFunc, 60000);


app.listen(3333);
