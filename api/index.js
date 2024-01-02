var express = require("express");
var router = express.Router();


router.get("/:date?", function (req, res) {
  //guardo en una variable los datos que vienen por la solicitud http
  const dateParam = req.params.date;

  //primero verifico si me pasaron algo o no

  if (!dateParam) {
    //si no se proporciona nada entonces muestro la fecha de hoy en el formato pedido
    const currentTime = new Date();

    const unixTime = currentTime.getTime();
    const utcTime = currentTime.toUTCString();

    res.json({ unix: unixTime, utc: utcTime });
  } else {
    //ahora verifico si es una fecha en el formato pedido "año-mes-dia"
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; //el patron lo pueden buscar de internet
    const isValidFormat = datePattern.test(dateParam);

    if (isValidFormat) {
      //si es verdadero entonces entregaremos el unixTime y el utcTime de esta fecha

      const userDate = new Date(dateParam);

      //verifico si la fecha es valida
      if (isNaN(userDate.getTime())) {
        res.json({ error: "Invalid Date" });
      } else {
        //si es valida entonces entrego la fecha:

        const unixTime = userDate.getTime();
        const utcTime = userDate.toUTCString();

        res.json({ unix: unixTime, utc: utcTime });
      }
    } else {
      //ahora tenemos que ver el tema del unix time, cuando nos dan los milisegundos
      //verifica que sea un numero valido
      const unixTimestamp = parseInt(dateParam, 10);

      if (isNaN(unixTimestamp)) {
        //por si llegan a ser letras o algo no numerico
        res.json({ error: "Invalid Date" });
      } else {
        const userDate = new Date(unixTimestamp);

        const unixTime = userDate.getTime();
        const utcTime = userDate.toUTCString();

        res.json({ unix: unixTime, utc: utcTime });
      }
    }
  }
});

// your first API endpoint...
router.get("/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});


module.exports = router;