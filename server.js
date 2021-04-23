'use strict';

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const weather = require('./modules/weather.js');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
