const express = require('express');
const Twitter = require('twitter');
const axios = require('axios');
require('dotenv/config');


const nodeHtmlToImage = require('node-html-to-image');
const fs = require('fs');
const path = require('path');
const { formattedDay, formattedMonth, formattedMinutes } = require('./dataFormat');
const htmltext = require('./htmltext');
const musics = require('./musics');

const app = express();
app.use(express.json());

const client = new Twitter({
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

let lastValue = 0;

async function intervalFunc() {
  const agora = new Date();
  const horario = agora.getHours();

  const checkHour = schedule.indexOf(horario);
  const checkDone = done.indexOf(horario);

  const dolar = await api.get();
  const { ask } = dolar.data[0];

  if (lastValue == 0) {
    lastValue = ask;
  }
  console.log(`${lastValue} => ⏰${horario}:${agora.getMinutes()}`);

  if (checkHour >= 0
    && checkDone < 0
    && agora.getMinutes() === 0
    && lastValue !== ask
  ) {
    lastValue = ask;
    console.log(lastValue);

    let parsedFifty = ask * 50;

    parsedFifty = parsedFifty.toFixed(0);

    const song = getRandomArbitrary(0, musics.length).toFixed(0);

    let askFormated = (ask * 1).toFixed(3);
    askFormated = ask.replace('.', ',');

    const nowDate = `${formattedDay(agora.getDate())}/${formattedMonth(agora.getMonth())}/${agora.getFullYear()}`;
    const hourNow = `${agora.getHours()}:${formattedMinutes(agora.getMinutes())}`;

    await nodeHtmlToImage({
      output: './image.png',
      html: htmltext(parsedFifty),
    }).then(() => console.log('The image was created successfully!'));

    const message = `.\n📆 ${nowDate} - ⏰ ${hourNow} \n.\n💰 Cotação do Dolar agora: R$${askFormated} \n.`;

    console.log(message);

    // Load your image
    const filePath = path.resolve(__dirname, '..', 'image.png');
    const imagePath = fs.readFileSync(filePath);

    // Make post request on media endpoint. Pass file data as media parameter
    await client.post('media/upload', { media: imagePath }, async (error, media, response) => {
      if (!error) {
        // If successful, a media object will be returned.
        // console.log(media);
        console.log('Upload de imagem feita com sucesso!');
        // Lets tweet it
        const status = {
          status: message,
          media_ids: media.media_id_string, // Pass the media id string
        };

        await client.post('statuses/update', status, (error, tweet, response) => {
          if (!error) {
            console.log('tweet feito com sucesso!');
          }
        });
      }
    });
  }
}

setInterval(intervalFunc, 60000);

app.listen(3333);
