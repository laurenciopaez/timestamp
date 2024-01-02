// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;

  if (!dateParam) {
    //si no se proporciona una fecha entonces te muestra la fecha actual
    const currentDate = new Date();
    const unixTime = currentDate.getTime();
    const utcTime = currentDate.toUTCString();

    res.json( { unix: unixTime, utc: utcTime});
  } else {
    //si se proporciona una fecha entonces te devuelve la fecha que pasaste en unix y en utc
    const userDate = new Date(dateParam);

    //verifico si es valida
    if (isNaN(userDate.getTime())) {
      res.json( {error: "Fecha invalida"})
    } else {
      const unixTime = userDate.getTime();
      const utcTime = userDate.toUTCString();

      res.json ( { unix: unixTime, utc: utcTime});
    }

  }

  res.send(dateParam)
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
