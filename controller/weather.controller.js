const axios = require('axios');

require('dotenv').config();

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

const weather = require('../models/Weather.model');


const weatherController = (req, res) => {
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
  }



module.exports = weatherController;
