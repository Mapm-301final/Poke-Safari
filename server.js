'use strict';

//Express
const express = require('express');
const app = express();

//cors
const cors = require('cors');
app.use(cors());

//superagent
const superagent = require('superagent');
require('dotenv').config();


const pg = require('pg');

//=================Postgres Database===============
// const pg = require('pg');
// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();
// client.on('error', err=> console.error(err));

//setting up ejs
app.set('view engine', 'ejs');
app.use(express.static('./public/../'));

app.use(express.urlencoded({extended:true}));

//PORT
const PORT = process.env.PORT || 3000;

//tells our server to start listening on the port
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//method-override
// const methodOverride = require('method-overrride');

//initial index page
app.get('/', (request, response)=>{
  response.render('pages/index');
});

//error handle
// app.get('*', (request, response)=>{
//   response.render('pages/error');
// });

// POKEMON API CALLS


// WEATHER API CALLS


app.get('/weather', (request, response) => {
  const lat = 47.618333199999995;
  const long = -122.3513311;
  const url = `https://api.weather.gov/points/${lat},${long}`;
  console.log(url);
  return superagent.get(url).set({'User-Agent': 'ua'})
    .then(res => {
      console.log(res);
      const url = res.body.properties.forecastGridData;
      return superagent.get(url);
    }).then(res => {
      response.send(new Weather(res.body.properties));
    }).catch(console.error);
});

function Weather(data){
  this.elevation = data.elevation.value;
  this.temperature = data.temperature.values[0].value;
  this.weather = data.weather.values[1].value[0].weather;
}
