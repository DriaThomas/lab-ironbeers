const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '/public')));




hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static("public"));




app.get('/', (req, res, next) => {
  res.render('index');
});


app.get("/allBeers", (req, res, next) => {
  punkAPI.getBeers()
    .then(responseFromDB => {

      res.render("allBeers.hbs", { beers: responseFromDB });
    })
    .catch(error => console.log(error));
});



app.get("/random-beer", (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {

      const theBeer = beers[0];

      res.render("random-beer", theBeer);
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
