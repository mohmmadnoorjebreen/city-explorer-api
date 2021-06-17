const axios = require('axios');

require('dotenv').config();

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const moveModel = require('../models/Move.model');

const Cache = require('../helper/Cache.move');
const cacheObj = new Cache();

const moviesController = (req, res) => {
  const city = req.query.city;
  const requestKey = `${city}`;
  if (city) {


    if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey].timestamp < 43200000)) {

      res.json(cacheObj[requestKey]);

    } else {
      const moves = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`;

      axios.get(moves).then((response) => {

        const responseData = response.data.results.map(obj => new moveModel(obj));
       
        cacheObj[requestKey] = responseData;
        cacheObj[requestKey].timestamp = Date.now();
        res.json(responseData)
      }).catch(error => {
        res.send(error.massage)
      })
    }
  }




}



module.exports = moviesController;