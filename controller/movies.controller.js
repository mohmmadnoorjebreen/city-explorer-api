const axios = require('axios');

require('dotenv').config();

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const moveModel = require('../models/Move.model');

const moviesController = (req, res) => {
    const city = req.query.city;
  if (city) {
    const moves = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`;
   
      axios.get(moves).then((response )=>{
       
        const responseData = response.data.results.map(obj => new moveModel(obj));     
       
       
        
        res.json(responseData)
      }).catch(error =>{
        res.send(error.massage)
      })
  }
      
    
  }



module.exports = moviesController;