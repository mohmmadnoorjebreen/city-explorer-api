const express = require('express') // require the express package
const app = express() // initialize your express app instance

const cors = require('cors');

app.use(cors()) // after you initialize your express app instance

require('dotenv').config();

const PORT = process.env.PORT

const Data = require('./data/weather.json');
const { response } = require('express');

app.get('/weather', (req, res) => {
  const responseData = Data.data.map(obj => new weather(obj));
    res.json(responseData)
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