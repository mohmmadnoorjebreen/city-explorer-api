const axios = require('axios');

require('dotenv').config();

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

const weather = require('../models/Weather.model');

const Cache = require('../helper/Cache.weather');
const cacheObj = new Cache();
const weatherController = (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const requestKey = `${lat}-${lon}`;
  if (lat && lon) {

    if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey].timestamp < 43200000)) {
      res.json(cacheObj[requestKey]);
    } else {
      
      const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
      axios.get(weatherBitUrl).then((response) => {
        const responseData = response.data.data.map(obj => new weather(obj));
        cacheObj[requestKey] = responseData;
        cacheObj[requestKey].timestamp = Date.now();
        res.json(responseData)
      }).catch(error => {
        res.send(error.massage)
      })
    }
  }

}


module.exports = weatherController;
