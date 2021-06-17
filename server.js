const express = require('express') // require the express package
const app = express() // initialize your express app instance

const cors = require('cors');

app.use(cors()) // after you initialize your express app instance

require('dotenv').config();

const weatherController = require('./controller/weather.controller');
const indexController = require('./controller/index.controller');
const moviesController = require('./controller/movies.controller');

const PORT = process.env.PORT




app.get('/weather', weatherController );


app.get('/move',moviesController );


// a server endpoint 
app.get('/', indexController )
 
app.listen(PORT,()=> console.log(`listening ${PORT}`)) // kick start the express server to work

