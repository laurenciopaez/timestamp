// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const path = require('path');
const port = process.env.PORT || 3030
const compression = require('compression')
const helmet = require('helmet')

app.use(helmet());
app.use(compression());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public", {maxAge: 31557600000}));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "index.html"));
  });

var apiRoutes = require("./api");
app.use("/api", apiRoutes)

  // listen for requests :)
var listener = app.listen(port, function () {
    console.log("Your app is listening on port " + listener.address().port);
  });
  