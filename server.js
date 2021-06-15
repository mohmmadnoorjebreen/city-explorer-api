const express = require('express') // require the express package
const app = express() // initialize your express app instance

const cors = require('cors');

app.use(cors()) // after you initialize your express app instance

require('dotenv').config();

const axios = require('axios');

const PORT = process.env.PORT

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

const Data = require('./data/weather.json');
const { response } = require('express');

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  if (lat && lon){
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
    axios.get(weatherBitUrl).then((response )=>{
      const responseData = response.data.data.map(obj => new weather(obj));
      res.json(responseData)
    }).catch(error =>{
      res.send(error.massage)
    })
  }
});

class weather {
  constructor(Data){
    this.description = Data.weather.description,
    this.date = Data.valid_date
  }
}

// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})
 
app.listen(PORT) // kick start the express server to work